#!/usr/bin/env bash
# Phon3y server backend – run script
# Requires: Python 3.9, 3.10, or 3.11 (3.10 recommended for deps: allosaurus, mediapipe, opencv)

set -e

MIN_PYTHON_MAJOR=3
MIN_PYTHON_MINOR=9
MAX_PYTHON_MINOR=11
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="${SCRIPT_DIR}/.venv"
REQUIREMENTS="${SCRIPT_DIR}/requirements.txt"

check_python_ok() {
    local py_cmd="$1"
    command -v "$py_cmd" &>/dev/null && \
        "$py_cmd" -c "import sys; exit(0 if (3, 9) <= sys.version_info[:2] <= (3, 11) else 1)" 2>/dev/null
}

# Prefer python3.10, then 3.11, 3.9, then python3
PYTHON_CMD=""
for candidate in python3.10 python3.11 python3.9 python3; do
    if check_python_ok "$candidate"; then
        PYTHON_CMD="$candidate"
        break
    fi
done

if [[ -z "$PYTHON_CMD" ]]; then
    echo "Error: Python ${MIN_PYTHON_MAJOR}.${MIN_PYTHON_MINOR}–${MAX_PYTHON_MINOR} is required for this project."
    echo "Install with: pyenv install 3.10.x  OR  apt install python3.10  OR  brew install python@3.10"
    exit 1
fi

echo "Using: $($PYTHON_CMD --version)"

# Create virtual environment if it doesn't exist
if [[ ! -d "$VENV_DIR" ]]; then
    echo "Creating virtual environment..."
    "$PYTHON_CMD" -m venv "$VENV_DIR"
fi

# Activate and install dependencies
source "${VENV_DIR}/bin/activate"
pip install --upgrade pip -q
pip install -r "$REQUIREMENTS" -q

echo "Starting Flask server..."
exec python api.py
