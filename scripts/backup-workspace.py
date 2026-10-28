"""Create and verify a portable PRIVATE archive, including ignored owner material.

No dependency caches, browser profiles, account credentials or machine configuration are copied.
Root .env files, if present, are included as private project material.
The destination must be outside this checkout. The ZIP is not encrypted.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PRIVATE_DIRS = ("docs", "cv-inbox", ".taste-skill")


def sha(data):
    return hashlib.sha256(data).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--destination", required=True, type=Path)
    args = parser.parse_args()
    destination = args.destination.resolve()
    if destination == ROOT or ROOT in destination.parents:
        raise SystemExit("Choose a backup destination outside this checkout.")
    if destination.exists():
        raise SystemExit("Destination already exists; choose a new archive name.")
    destination.parent.mkdir(parents=True, exist_ok=True)
    tracked = subprocess.check_output(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"], cwd=ROOT
    ).decode("utf-8").split("\0")
    sources = {ROOT / name for name in tracked if name and (ROOT / name).is_file()}
    for name in PRIVATE_DIRS:
        for parent, directories, files in os.walk(ROOT / name, followlinks=False):
            # Never traverse a Windows junction or symlink into another workspace.
            directories[:] = [d for d in directories if not (Path(parent) / d).is_symlink()
                               and not getattr(Path(parent) / d, "is_junction", lambda: False)()]
            sources.update(Path(parent) / file for file in files if not (Path(parent) / file).is_symlink())
    sources.update(p for p in ROOT.glob(".env*") if p.is_file())
    manifest = {"commit": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT).decode().strip(),
                "private": True, "files": {}}
    instructions = """PRIVATE PORTFOLIO BACKUP

This archive contains unpublished papers, certificates, CV originals and a private
workspace photograph. Do not upload it to a public repository. It is NOT encrypted.
Copy it to your own storage before returning the borrowed computer.

Restore on another computer:
1. Extract into a new directory (do not overwrite an existing checkout).
2. Run: git clone --no-checkout hei-portfolio.bundle hei-portfolio
3. Copy the CONTENTS of repo/ over the cloned hei-portfolio/ directory, including
   hidden files. This overlay includes the working tree at backup time and the
   ignored private docs/, cv-inbox/ and .taste-skill/ directories.
4. Run: git -C hei-portfolio reset --mixed HEAD
   This restores the index without overwriting the copied files. Uncommitted
   changes/deletions are preserved; staging state is not preserved.
   Set the public remote if needed:
   git -C hei-portfolio remote set-url origin https://github.com/hei1sme/hei-portfolio.git
5. Install Node 22 LTS, run npm ci, then npm run build and npm run dev.
6. CV instructions: cv/README.md (older snapshots: README.md and docs/cv/README.md).

manifest.json records SHA-256 for every payload file. The .sha256 sidecar verifies
the whole ZIP. The Git bundle contains all local refs/tags and their history.
Reinstall dependencies/tooling; node_modules, .next*, browser profiles, screenshots,
tool caches and OS/account credentials are deliberately excluded.
"""
    with tempfile.TemporaryDirectory(dir=destination.parent) as temporary:
        bundle = Path(temporary) / "hei-portfolio.bundle"
        subprocess.run(["git", "bundle", "create", str(bundle), "--all"], cwd=ROOT, check=True)
        subprocess.run(["git", "bundle", "verify", str(bundle)], cwd=ROOT, check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        with zipfile.ZipFile(destination, "x", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
            def add(name, data):
                archive.writestr(name, data)
                manifest["files"][name] = {"bytes": len(data), "sha256": sha(data)}
            add("RESTORE.txt", instructions.encode("utf-8"))
            add("hei-portfolio.bundle", bundle.read_bytes())
            for source in sorted(sources):
                add("repo/" + source.relative_to(ROOT).as_posix(), source.read_bytes())
            archive.writestr("manifest.json", json.dumps(manifest, indent=2, ensure_ascii=False).encode("utf-8"))
    with zipfile.ZipFile(destination) as archive:
        assert archive.testzip() is None, "ZIP CRC verification failed"
        for name, info in manifest["files"].items():
            assert sha(archive.read(name)) == info["sha256"], f"Checksum mismatch: {name}"
    checksum = hashlib.sha256()
    with destination.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            checksum.update(chunk)
    digest = checksum.hexdigest()
    destination.with_suffix(destination.suffix + ".sha256").write_text(
        digest + "  " + destination.name + "\n", encoding="utf-8"
    )
    print(json.dumps({"archive": str(destination), "bytes": destination.stat().st_size,
                      "verified_files": len(manifest["files"]), "sha256": digest}, indent=2))


if __name__ == "__main__":
    main()
