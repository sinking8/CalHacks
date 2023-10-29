import os
import reflex as rx
import random

import requests


class State(rx.State):
    """The app state."""

    # The current chat name.
    current_chat = "Intros"

    # The current question.
    question: str

    # Whether we are processing the question.
    processing: bool = False

    # The name of the new chat.
    new_chat_name: str = ""

    # Whether the drawer is open.
    drawer_open: bool = False

    # Whether the modal is open.
    modal_open: bool = False

    def create_chat(self):
        """Create a new chat."""
        # Add the new chat to the list of chats.
        self.current_chat = self.new_chat_name
        self.chats[self.new_chat_name] = []

        # Toggle the modal.
        self.modal_open = False

    def toggle_modal(self):
        """Toggle the new chat modal."""
        self.modal_open = not self.modal_open

    def toggle_drawer(self):
        """Toggle the drawer."""
        self.drawer_open = not self.drawer_open


initial_data = [
    {"name": "Page 1", "uv": 4000, "pv": 2400,
        "amt": 2400, "latest_response": "Hello"},
    {"name": "Page 2", "uv": 3000, "pv": 1398,
        "amt": 2210, "latest_response": "Ass"},
    {"name": "Page C", "uv": 2000, "pv": 9800,
        "amt": 2290, "latest_response": "Shit"},
    {"name": "Page D", "uv": 2780, "pv": 3908,
        "amt": 2000, "latest_response": "Good Boy"},
    {"name": "Page E", "uv": 1890, "pv": 4800,
        "amt": 2181, "latest_response": "Bad boy"},
    {"name": "Page F", "uv": 2390, "pv": 3800,
        "amt": 2500, "latest_response": "Hello"},
    {"name": "Page G", "uv": 3490, "pv": 4300,
        "amt": 2100, "latest_response": "Hello"},
]

# Sending Requests
res = requests.post("https://avasya-api.onrender.com/get_emotion",
                    json={"data": [rec['latest_response'] for rec in initial_data]}).json()

for i in range(len(initial_data)):
    initial_data[i]['emotion'] = res['data'][i]

emote_count = {'Negative': 0, 'Positive': 0, 'Neutral': 0}
for key in list(emote_count.keys()):
    emote_count[key] = len(
        list(filter(lambda x: key.lower() == x['emotion'].lower(), initial_data)))

emote_count_formatted = []
for key, value in emote_count.items():
    emote_count_formatted.append({"emotion": key, "frequency": value})


class LineChartState(State):
    data = initial_data
    emote_data = emote_count_formatted
    pv_type: str = "monotone"
    uv_type: str = "monotone"
