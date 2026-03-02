import os
import duckdb


def initDB() -> None:

    # Connect to DuckDB once to initialise the schema
    os.makedirs("./DB", exist_ok=True)
    conn = duckdb.connect("./DB/leave.db")

    # Create table if not exists
    conn.sql(
        """
        CREATE TABLE IF NOT EXISTS LEAVE (
            CREATE_TIME  TIMESTAMP_S  NOT NULL,
            DELETE_TIME  VARCHAR(16)  NOT NULL DEFAULT 'N',
            EMP_NAME     VARCHAR(16)  NOT NULL,
            DATE         DATE         NOT NULL,
            TIME         VARCHAR(4)   NOT NULL,
            REASON       VARCHAR(64)  DEFAULT NULL,
            CONSTRAINT TIME CHECK (TIME IN ('AM', 'PM')),
            PRIMARY KEY (EMP_NAME, DATE, TIME, DELETE_TIME)
        );
        """
    )

    # Close after initialisation; each request will open its own connection
    conn.close()
