"""
scripts/check_version_sync.py

Run this before every build (pyinstaller + Inno Setup). It has one job:
fail loudly if core/version.py's __version__ and installer.iss's
MyAppVersion don't match exactly.

Why this exists: the app's displayed version, the update-check
comparison, and the installer's own version metadata all ultimately
come from these two separately-edited files. Nothing enforces that a
bump to one gets mirrored to the other -- if they drift, you can end
up shipping a "new" release that still reports its old version number
and endlessly nags users to update to the version they're already on.

Usage:
    python scripts/check_version_sync.py
Exits with status 1 and a clear message if they don't match, 0 if
they're in sync.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _read_version_py() -> str:
    text = (ROOT / "core" / "version.py").read_text(encoding="utf-8")
    match = re.search(r'__version__\s*=\s*"([^"]+)"', text)
    if not match:
        print("Couldn't find __version__ in core/version.py", file=sys.stderr)
        sys.exit(1)
    return match.group(1)


def _read_installer_iss() -> str:
    text = (ROOT / "installer.iss").read_text(encoding="utf-8")
    match = re.search(r'#define MyAppVersion "([^"]+)"', text)
    if not match:
        print("Couldn't find MyAppVersion in installer.iss", file=sys.stderr)
        sys.exit(1)
    return match.group(1)


def main() -> int:
    py_version = _read_version_py()
    iss_version = _read_installer_iss()

    if py_version != iss_version:
        print(
            f"VERSION MISMATCH:\n"
            f"  core/version.py    __version__   = {py_version!r}\n"
            f"  installer.iss      MyAppVersion  = {iss_version!r}\n\n"
            f"These must match before you build. Update whichever one is "
            f"stale, then run this check again.",
            file=sys.stderr,
        )
        return 1

    print(f"OK -- both files agree: {py_version}")
    return 0


if __name__ == "__main__":
    sys.exit(main())