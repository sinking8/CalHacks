import reflex as rx
from calhacks.state import *


def render_stats():
    return rx.vstack(
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
        height="20em",
        width="100%",
    )
