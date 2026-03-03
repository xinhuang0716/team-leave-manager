import os
import duckdb


def initDB() -> None:

    # Default to a local file if DB_PATH is not set
    # DB_PATH is for Mount Path in Docker, e.g., /var/lib/data, and should be set in the environment variables
    db_dir = os.getenv("DB_PATH", "./DB")
    os.makedirs(db_dir, exist_ok=True)

    # Connect to DuckDB once to initialise the schema
    db_path = os.path.join(db_dir, "leave.db")
    conn = duckdb.connect(db_path)

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
