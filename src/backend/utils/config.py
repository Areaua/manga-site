from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

AVATARS_DIR = Path(os.getenv("AVATARS_DIR", "./avatars_storage")).resolve()
AVATARS_DIR.mkdir(parents=True, exist_ok=True)
