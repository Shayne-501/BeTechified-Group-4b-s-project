"""
Small, safe PDF password brute-force helper (debugged).

WARNING: Use this script only on PDF files you own or have explicit
permission to test. Unauthorized access to protected files is illegal
and unethical.

This script tries passwords by brute force up to a specified length.
It is intentionally conservative by default (small max length). Large
searches can take extremely long and consume a lot of CPU.
"""

import argparse
import itertools
import string
import sys

try:
    import PyPDF2
except ImportError:
    print("Missing dependency: PyPDF2. Install with: python -m pip install PyPDF2")
    sys.exit(1)


def brute_force_pdf_password(pdf_path, charset, max_length):
    """Attempt to brute-force the PDF owner/user password.

    Returns the found password as a string, or None if not found.
    """
    try:
        with open(pdf_path, 'rb') as fh:
            reader = PyPDF2.PdfReader(fh)
    except FileNotFoundError:
        print(f"File not found: {pdf_path}")
        return None
    except Exception as e:
        print(f"Error opening file: {e}")
        return None

    if not getattr(reader, 'is_encrypted', False):
        print("PDF is not encrypted.")
        return None

    print("Starting brute force...")

    for length in range(1, max_length + 1):
        for password_tuple in itertools.product(charset, repeat=length):
            password = ''.join(password_tuple)
            print(f"Trying: {password}", end='\r', flush=True)
            try:
                # PyPDF2.decrypt may return 0/1 or a truthy value depending on version
                result = reader.decrypt(password)
                if result:
                    print(f"\n✅ Password found: '{password}'")
                    return password
            except Exception:
                # ignore errors and continue trying
                pass

    print("\n❌ Password not found.")
    return None


def parse_args():
    p = argparse.ArgumentParser(description='Brute-force PDF password (use responsibly)')
    p.add_argument('pdf', help='Path to the PDF file')
    p.add_argument('--charset', default='0123456789',
                   help='Characters to use when brute-forcing (default: digits)')
    p.add_argument('--maxlen', type=int, default=4,
                   help='Maximum password length to try (default: 4)')
    return p.parse_args()


if __name__ == '__main__':
    args = parse_args()
    if args.maxlen < 1 or args.maxlen > 8:
        print('For safety, maxlen should be between 1 and 8. Change at your own risk.')
    brute_force_pdf_password(args.pdf, args.charset, args.maxlen)