from pymongo import MongoClient
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    client = MongoClient('mongodb://user_db:Zh2006L@172.31.35.251:27017/mongadb?authSource=mongadb')
    logger.info("Connected to MongoDB")
    users_collection = client['manga_db']['users']
except Exception as e:
    logger.error(f"MongoDB connection error: {e}")
    raise Exception(e)
