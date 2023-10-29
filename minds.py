import mindsdb_sdk
from dotenv import load_dotenv
import os
import json

f = open('./prompts.json', "rb")
prompts_json = json.load(f)

load_dotenv()

# Load Server
server = mindsdb_sdk.connect(login=os.getenv(
    "EMAIL_ID"), password=os.getenv("PASSWORD"))


def load_emotions(text="All Good"):
    return server.query(prompts_json['emote_query'].format(COMMENT_TEXT=text)).fetch()['sentiment']
