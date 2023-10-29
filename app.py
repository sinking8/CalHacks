from flask import Flask, request
from model import *
from minds import *
import numpy as np
import json

f = open('./prompts.json', "rb")
prompts_json = json.load(f)

# Initialize App
app = Flask(__name__)


@app.route("/get_response", methods=['POST'])
def get_response():
    incidents = recent_incidents()
    incident_text = ""
    for i in range(len(incidents)):
        incident_text += str(i)+":"+incidents[i]+"\n"
    if (request.method == 'POST'):
        return get_llama_response(prompts_json["logs"].format(LOGS=incident_text)+prompts_json["enquiry_prompt"].format(SEVERITY=request.get_json()["query"]))


@app.route("/get_detection", methods=['POST'])
def get_detection():
    if (request.method == "POST"):
        # if(request.get_data()!=None):
        n = np.random.randint(10)
        return {True: "yes", False: "no"}[n % 2 == 0]


if __name__ == "__main__":
    app.run(debug=True)
