from pymongo import MongoClient
from dotenv import load_dotenv
from urllib.parse import urlparse
import logging
import os

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MONGODB_URL = os.getenv("MONGODB_URL")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME")

if not MONGODB_URL:
    raise RuntimeError("MONGODB_URL is not set in environment")
if not MONGODB_DB_NAME:
    raise RuntimeError("MONGODB_DB_NAME is not set in environment")

try:
    client = MongoClient(MONGODB_URL, serverSelectionTimeoutMS=5000)
    client.server_info()
    db = client[MONGODB_DB_NAME]
    users_collection = db["users"]
    host_display = urlparse(MONGODB_URL).hostname or "unknown"
    logger.info(f"Connected to MongoDB at {host_display}, db={MONGODB_DB_NAME}")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise
