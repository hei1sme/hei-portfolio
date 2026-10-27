"""Build the owner's private LaTeX CV; publish only with an explicit flag."""
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
    args = parser.parse_args()
    source = ROOT / "docs/cv/resume_havard_ver.tex"
    if not source.is_file():
        raise SystemExit("Import the private CV source to docs/cv/resume_havard_ver.tex first.")
    build = ROOT / "docs/cv/build"
    export = ROOT / "output/pdf/HungLNG_Resume.pdf"
    build.mkdir(parents=True, exist_ok=True)
    export.parent.mkdir(parents=True, exist_ok=True)
    environment = dict(os.environ, TECTONIC_CACHE_DIR=str(ROOT / ".codex/tooling/tectonic-cache"))
    subprocess.run([compiler(), "--untrusted", "--keep-logs", "--outdir", str(build), str(source)],
                   cwd=ROOT, env=environment, check=True)
    shutil.copy2(build / "resume_havard_ver.pdf", export)
    print(f"Built {export}")
    if args.publish:
        destination = ROOT / "public/HungLNG_Resume.pdf"
        shutil.copy2(export, destination)
        print(f"Updated {destination}")


if __name__ == "__main__":
    main()
