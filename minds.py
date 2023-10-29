import mindsdb_sdk
from dotenv import load_dotenv
import os

load_dotenv()

# Load Server
server = mindsdb_sdk.connect(login=os.get_env(
    "EMAIL_ID"), password=os.getenv("PASSWORD"))


def recent_incidents():
    pass
