import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import pypdf
except ImportError:
    install('pypdf')
    import pypdf

from pypdf import PdfReader

def extract(pdf_path, output_path):
    try:
        reader = PdfReader(pdf_path)
        text = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Successfully extracted {pdf_path}")
    except Exception as e:
        print(f"Failed to extract {pdf_path}: {e}")

extract("ahmeds_sop (1).pdf", "sop_parsed.txt")
extract("Ahmed's Resume - USF.pdf", "resume_parsed.txt")
