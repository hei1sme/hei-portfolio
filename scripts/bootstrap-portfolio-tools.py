"""Install a verified, repo-local npm for environments that only provide Node.

No application dependencies or global configuration are changed.
"""
import base64
import hashlib
import io
from pathlib import Path
import tarfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / ".codex" / "tooling" / "npm"
URL = "https://registry.npmjs.org/npm/-/npm-11.6.2.tgz"
SHA512 = "7iKzNfy8lWYs3zq4oFPa8EXZz5xt9gQNKJZau3B1ErLBb6bF7sBJ00x09485DOvRT2l5Gerbl3VlZNT57MxJVA=="


def write_windows_shims():
    shim_dir = DEST.parent / "bin"
    shim_dir.mkdir(parents=True, exist_ok=True)
    for command in ("npm", "npx"):
        (shim_dir / f"{command}.cmd").write_text(
            '@echo off\nnode "%~dp0..\\npm\\bin\\' + command + '-cli.js" %*\n',
            encoding="utf-8",
        )


def main():
    if (DEST / "bin" / "npx-cli.js").is_file():
        write_windows_shims()
        print("Repo-local npm already installed.")
        return
    with urllib.request.urlopen(URL, timeout=60) as response:
        data = response.read()
    actual = base64.b64encode(hashlib.sha512(data).digest()).decode()
    if actual != SHA512:
        raise RuntimeError("npm archive integrity mismatch")
    DEST.mkdir(parents=True, exist_ok=True)
    with tarfile.open(fileobj=io.BytesIO(data), mode="r:gz") as archive:
        for member in archive.getmembers():
            parts = Path(member.name).parts
            if not parts or parts[0] != "package":
                raise RuntimeError("Unexpected archive path")
            target = DEST.joinpath(*parts[1:]).resolve()
            if not target.is_relative_to(DEST.resolve()):
                raise RuntimeError("Archive path escapes destination")
            if member.isdir():
                target.mkdir(parents=True, exist_ok=True)
            elif member.isfile():
                target.parent.mkdir(parents=True, exist_ok=True)
                with archive.extractfile(member) as source:
                    target.write_bytes(source.read())
            else:
                raise RuntimeError("Unsupported archive member")
    write_windows_shims()
    print("Installed verified npm 11.6.2 into .codex/tooling/npm")


if __name__ == "__main__":
    main()
