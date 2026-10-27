"""Check PDF text with two independent readers; this is not an ATS certification."""
import argparse
import json
from pathlib import Path
import re
import sys
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
LOCAL_TOOLS = ROOT / ".codex/tooling/pdf-python"
if LOCAL_TOOLS.is_dir():
    sys.path.insert(0, str(LOCAL_TOOLS))

try:
    from pypdf import PdfReader
    import pymupdf
except ImportError as error:
    raise SystemExit("Install pypdf and PyMuPDF in local review tooling first; see README.md.") from error

VARIANTS = {"HungLNG_Resume": 2, "HungLNG_Resume_AI_ML": 1}
KEYWORDS = [
    "Le Nguyen Gia Hung", "heiontheway@gmail.com", "+84 394 262 651",
    "github.com/hei1sme", "linkedin.com/in/le-nguyen-gia-hung",
    "PyTorch", "TensorFlow/Keras", "Scikit-learn", "OpenCV",
    "WavLM + Compact Conformer", "BERT/RoBERTa", "Education",
    "0.7470", "0.9545", "35.9%", "33.09%", "15.28%", "8.62",
]


def normalize(text):
    # Keep internal spaces: joining 'PyT orch' would conceal the original bug.
    return re.sub(r"\s+", " ", unicodedata.normalize("NFKC", text)).strip()


def check(path, expected_pages):
    reader = PdfReader(path)
    assert not reader.is_encrypted, f"{path.name}: encrypted PDF"
    assert len(reader.pages) == expected_pages, f"{path.name}: unexpected page count"
    for page in reader.pages:
        assert abs(float(page.mediabox.width) - 595.276) < 0.02, "Expected A4 width"
        assert abs(float(page.mediabox.height) - 841.89) < 0.02, "Expected A4 height"
    texts = {
        "pypdf_plain": normalize(" ".join(p.extract_text() for p in reader.pages)),
        "pypdf_layout": normalize(" ".join(p.extract_text(extraction_mode="layout") for p in reader.pages)),
    }
    with pymupdf.open(path) as document:
        texts["pymupdf"] = normalize(" ".join(page.get_text("text") for page in document))
        assert not any(page.get_images() for page in document), "Unexpected raster image"
    for mode, text in texts.items():
        missing = [word for word in KEYWORDS if word not in text]
        assert not missing, f"{path.name} / {mode}: missing or split words: {missing}"
        assert "\ufffd" not in text, f"{path.name} / {mode}: invalid Unicode"
        assert re.search(r"1\s*/\s*" + str(expected_pages) + r"\b", text), "Missing page counter"
    uris = {
        str(annotation.get_object().get("/A", {}).get("/URI", ""))
        for page in reader.pages for annotation in page.get("/Annots", [])
    }
    assert "https://doi.org/10.1007/978-981-95-4969-6_34" in uris, "Paper DOI link missing"
    return {"file": path.name, "pages": expected_pages, "readers": list(texts),
            "keyword_checks": len(KEYWORDS), "status": "passed"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--directory", type=Path, default=ROOT / "output/pdf")
    args = parser.parse_args()
    results = []
    for stem, pages in VARIANTS.items():
        for suffix in ["", "_Print"]:
            results.append(check(args.directory / f"{stem}{suffix}.pdf", pages))
    print(json.dumps({"scope": "local PDF extraction, not employer ATS matching", "results": results}, indent=2))


if __name__ == "__main__":
    main()
