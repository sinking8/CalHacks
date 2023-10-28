from flask import Flask, render_template, request, redirect, url_for, json, jsonify
from model import *

# Initialize App
app = Flask(__name__)


@app.route("/get_response", methods=['POST'])
def get_response():
    if (request.method == 'POST'):
        return get_llama_response(request.get_json()["query"])


if __name__ == "__main__":
    app.run(debug=True)
