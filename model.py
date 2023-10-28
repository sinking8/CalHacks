import requests
from dotenv import load_dotenv
import os


endpoint = 'https://api.together.xyz/inference'
load_dotenv()


def get_llama_response(text):

    res = requests.post(endpoint, json={
        "model": "OpenAssistant/llama2-70b-oasst-sft-v10",
        "max_tokens": 25,
        "prompt": text,
        "request_type": "language-model-inference",
        "temperature": 0.75,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 0.5,
        "stop": [
            "</s>",
            "<|im_end|>"
        ],
        "negative_prompt": "",
        "sessionKey": "c1bb40ca5ee41dc7ac4d7d9cdcbe0146f319d0f1",
        "type": "chat"
    }, headers={
        "Authorization": os.get_env("AUTH_KEY"),
    })
    return res
