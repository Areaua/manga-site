from pymongo import MongoClient
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    client = MongoClient('mongodb://user_db:Zh2006L@172.31.35.251:27017/mongadb?authSource=mongadb')
    logger.info("Connected to MongoDB")
    # Проверка подключения
    client.server_info()  # Вызывает исключение, если подключение не удалось
    users_collection = client['mongadb']['users']
    logger.info("Users collection accessed successfully")
except Exception as e:
    logger.error(f"MongoDB connection error: {e}")
    raise Exception(f"Failed to connect to MongoDB: {e}")