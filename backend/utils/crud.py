import duckdb


def insertData(data: dict) -> None:
    """Insert a new leave record.

    Args:
        data: Must contain `emp_name`, `date` and `time`, while `reason` is optional.
    """
    conn = duckdb.connect("./DB/leave.db")
    conn.execute(
        """
        INSERT INTO LEAVE (CREATE_TIME, EMP_NAME, DATE, TIME, REASON)
        VALUES (CURRENT_LOCALTIMESTAMP(), ?, ?::DATE, ?, ?)
        """,
        [data["emp_name"], data["date"], data["time"], data.get("reason")]
    )
    conn.close()


def updateData(data: dict) -> None:
    """Soft-delete a leave record by stamping DELETE_TIME.

    Args:
        data: Must contain `emp_name`, `date`, `time`.
    """

    conn = duckdb.connect("./DB/leave.db")
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
        [data["emp_name"], data["date"], data["time"]]
    )
    conn.close()


def selectData() -> dict:
    """Return all valid (non-deleted) leave records from today onward."""

    conn = duckdb.connect("./DB/leave.db")
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
    conn.close()

    return {
        "status": "success",
        "data": [{"IDX": idx, **dict(zip(["CREATE_TIME", "DELETE_TIME", "EMP_NAME", "DATE", "TIME", "REASON"], row))} for idx, row in enumerate(data)]
    }
