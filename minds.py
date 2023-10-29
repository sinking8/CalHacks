import mindsdb_sdk
from dotenv import load_dotenv
import os

load_dotenv()

# Load Server
server = mindsdb_sdk.connect(login=os.getenv(
    "EMAIL_ID"), password=os.getenv("PASSWORD"))


def load_emotions(): pass


def recent_incidents():
    pass
