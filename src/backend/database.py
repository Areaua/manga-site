from pymongo import MongoClient
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    client = MongoClient('mongodb://localhost:27017/')
    logger.info("Connected to MongoDB")
    users_collection = client['manga_db']['users']
except Exception as e:
    logger.error(f"MongoDB connection error: {e}")
    raise