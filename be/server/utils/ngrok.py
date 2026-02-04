import requests
from typing import Optional

NGROK_API = "http://127.0.0.1:4040/api/tunnels"


class NgrokError(Exception):
    pass


def fetch_public_url(timeout: float = 2.0) -> Optional[str]:
    """Return the public ngrok URL if an active tunnel is present, otherwise None.

    Raises NgrokError for request-level failures (caller can fall back to local URL).
    """
    try:
        resp = requests.get(NGROK_API, timeout=timeout)
        resp.raise_for_status()
    except requests.RequestException as e:
        raise NgrokError(f"Failed to contact ngrok API: {e}") from e

    data = resp.json()
    tunnels = data.get("tunnels") or []
    if not tunnels:
        return None
    # prefer https tunnel if present
    for t in tunnels:
        pub = t.get("public_url")
        if pub and pub.startswith("https://"):
            return pub
    # else return first available
    return tunnels[0].get("public_url")
