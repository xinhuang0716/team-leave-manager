import os
from pathlib import Path

import duckdb


def initDB() -> None:
    # Use a local ./DB directory during development when DB_PATH is not set.
    # On Render, set DB_PATH to the Persistent Disk mount path (for example, /DB)
    # so leave.db is stored on persistent storage instead of the temporary filesystem.
    db_dir = Path(os.getenv("DB_PATH", "./DB"))
    db_dir.mkdir(parents=True, exist_ok=True)

    # Connect to DuckDB to initialise
    db_path = db_dir / "leave.db"
    conn = duckdb.connect(str(db_path))

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
        )
        ;
        """
    )

    conn.close()
