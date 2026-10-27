"""Build digital/print editions of the private CV sources; publish with an explicit flag."""
import argparse
import hashlib
import io
import os
from pathlib import Path
import shutil
import subprocess
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[1]
VERSION = "0.17.0"
URL = ("https://github.com/tectonic-typesetting/tectonic/releases/download/"
       f"tectonic%40{VERSION}/tectonic-{VERSION}-x86_64-pc-windows-msvc.zip")
SHA256 = "f61ce51f0b0ade1015b7de7ef368541c5424e9756ecbd0d7af97d6d48030845f"


def compiler():
    installed = shutil.which("tectonic")
    if installed:
        return installed
    target = ROOT / ".codex/tooling/tectonic/tectonic.exe"
    if target.is_file():
        return str(target)
    if os.name != "nt":
        raise SystemExit("Install Tectonic, then run this command again.")
    with urllib.request.urlopen(URL, timeout=60) as response:
        archive = response.read()
    if hashlib.sha256(archive).hexdigest() != SHA256:
        raise SystemExit("Tectonic archive checksum mismatch.")
    with zipfile.ZipFile(io.BytesIO(archive)) as bundle:
        entry = next(name for name in bundle.namelist() if name.endswith("tectonic.exe"))
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(bundle.read(entry))
    return str(target)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--publish", action="store_true", help="Also replace the website PDF after review.")
    parser.add_argument("--variant", choices=["research", "industry", "all"], default="all")
    parser.add_argument("--edition", choices=["digital", "print", "all"], default="all")
    args = parser.parse_args()
    variants = {
        "research": ("resume_havard_ver", "HungLNG_Resume"),
        "industry": ("resume_ai_ml", "HungLNG_Resume_AI_ML"),
    }
    selected = variants if args.variant == "all" else {args.variant: variants[args.variant]}
    for source_name, _ in selected.values():
        source = ROOT / f"docs/cv/{source_name}.tex"
        if not source.is_file():
            raise SystemExit(f"Missing private CV source: {source}")
    build = ROOT / "docs/cv/build"
    build.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / "docs/cv/cv-style.tex", build / "cv-style.tex")
    (ROOT / "output/pdf").mkdir(parents=True, exist_ok=True)
    environment = dict(os.environ, TECTONIC_CACHE_DIR=str(ROOT / ".codex/tooling/tectonic-cache"))
    executable = compiler()
    editions = ["digital", "print"] if args.edition == "all" else [args.edition]
    exports = []
    for source_name, export_name in selected.values():
        for edition in editions:
            source = ROOT / f"docs/cv/{source_name}.tex"
            suffix = "_Print" if edition == "print" else ""
            job_name = source_name
            if edition == "print":
                job_name += "_print"
                content = source.read_text(encoding="utf-8")
                source = build / f"{job_name}.tex"
                source.write_text("\\def\\PrintEdition{1}\n" + content, encoding="utf-8")
            export = ROOT / f"output/pdf/{export_name}{suffix}.pdf"
            subprocess.run([executable, "--untrusted", "--keep-logs", "--outdir", str(build), str(source)],
                           cwd=ROOT, env=environment, check=True)
            shutil.copy2(build / f"{job_name}.pdf", export)
            exports.append(export)
            print(f"Built {export}")
    if args.publish:
        for export in exports:
            destination = ROOT / "public" / export.name
            shutil.copy2(export, destination)
            print(f"Updated {destination}")


if __name__ == "__main__":
    main()
