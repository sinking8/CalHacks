"""The home page of the app."""

from calhacks import styles
from calhacks.components.navbar import *
from calhacks.components.bots_list import *
from calhacks.components.graph import *

import reflex as rx


def index() -> rx.Component:
    return rx.vstack(
        navbar(),
        rx.box(rx.heading("Current Active Bots", size='md'),
               bg=styles.bg_medium_color),
        bots_table(),
        rx.box(rx.heading("Bots Statistics", size='md'),
               bg=styles.bg_medium_color),
        render_stats(),
        bg=styles.bg_dark_color,
        color=styles.text_light_color,
        min_h="100vh",
        spacing="0",
    )
