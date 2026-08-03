import os
from pathlib import Path
from functools import cache

import duckdb


@cache
def __get_db_path() -> Path:
    """Get the cached database path."""

    return Path(os.getenv("DB_PATH", "./DB")) / "leave.db"


def insertData(data: dict) -> None:
    """Insert a new leave record.

    Args:
        data: Must contain `emp_name`, `date` and `time`, while `reason` is optional.
    """

    conn = duckdb.connect(str(__get_db_path()))

    try:
        conn.execute(
            """
            INSERT INTO LEAVE (CREATE_TIME, EMP_NAME, DATE, TIME, REASON)
            VALUES (CURRENT_LOCALTIMESTAMP(), ?, ?::DATE, ?, ?)
            """,
            [data["emp_name"], data["date"], data["time"], data.get("reason")],
        )

    finally:
        conn.close()


def updateData(data: dict) -> None:
    """Soft-delete a leave record by stamping DELETE_TIME.

    Args:
        data: Must contain `emp_name`, `date`, `time`.
    """

    conn = duckdb.connect(str(__get_db_path()))

    try:
        conn.execute(
            """
            UPDATE LEAVE
            SET DELETE_TIME = STRFTIME(CURRENT_LOCALTIMESTAMP(), '%Y-%m-%d %H:%M:%S')
            WHERE
                EMP_NAME = ?
                AND DATE = ?::DATE
                AND TIME = ?
                AND DELETE_TIME = 'N'
            """,
            [data["emp_name"], data["date"], data["time"]],
        )

    finally:
        conn.close()


def selectData() -> dict:
    """Return valid leave records in the default display order."""

    conn = duckdb.connect(str(__get_db_path()))
    
    try:
        data = conn.execute(
            """
            SELECT
                CREATE_TIME, DELETE_TIME, EMP_NAME, DATE, TIME, REASON
            FROM
                LEAVE
            WHERE
                DATE >= current_date AND DELETE_TIME = 'N'
            ORDER BY
                DATE, TIME, EMP_NAME
            """
            ).fetchall()

    finally:
        conn.close()

    return {
        "status": "success",
        "data": [
            {
                "IDX": idx,
                **dict(
                    zip(
                        ["CREATE_TIME", "DELETE_TIME", "EMP_NAME", "DATE", "TIME", "REASON"],
                        row,
                        strict=True,
                    )
                ),
            }
            for idx, row in enumerate(data)
        ],
    }
