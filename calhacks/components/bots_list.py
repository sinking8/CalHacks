import reflex as rx


def bots_table():
    return rx.table_container(
        rx.table(
            headers=["Bot ID", "Name", "Location", "Current Action"],
            rows=[
                (1, "John", "New York", "Navigate"),
                (2, "Jane", "San Francisco", "Investigate"),
                (3, "Joe", "Los Angeles", "Report"),
            ],
        )
    )
