import reflex as rx
from calhacks.state import *


def render_stats():
    return rx.hstack(
        rx.recharts.line_chart(
            rx.recharts.line(
                data_key="pv",
                type_=LineChartState.pv_type,
                stroke="#8884d8",
            ),
            rx.recharts.line(
                data_key="uv",
                type_=LineChartState.uv_type,
                stroke="#82ca9d",
            ),
            rx.recharts.x_axis(data_key="name"),
            rx.recharts.y_axis(),
            data=LineChartState.data,
        ),
        rx.recharts.bar_chart(
            rx.recharts.bar(
                data_key="frequency", stroke="#8884d8", fill="#8884d8"
            ),
            rx.recharts.x_axis(data_key="emotion"),
            rx.recharts.y_axis(),
            data=LineChartState.emote_data,
        ),
        height="20em",
        width="100%",
    )
