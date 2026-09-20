from app.database import D1


async def insertData(db: D1, data: dict) -> None:
    """Insert a new leave record.

    Args:
        data: Must contain `emp_name`, `date` and `time`, while `reason` is optional.

    """
    await db.query(
        """
        INSERT INTO LEAVE (CREATE_TIME, EMP_NAME, DATE, TIME, REASON)
        VALUES (datetime('now', '+8 hours'), ?, ?, ?, NULLIF(?, ''))
        """,
        [data["emp_name"], data["date"].isoformat(), data["time"], data.get("reason") or ""],
    )


async def updateData(db: D1, data: dict) -> None:
    """Soft-delete a leave record by stamping DELETE_TIME.

    Args:
        data: Must contain `emp_name`, `date`, `time`.
    """
    await db.query(
        """
        UPDATE LEAVE
        SET DELETE_TIME = datetime('now', '+8 hours')
        WHERE
            EMP_NAME = ? AND DATE = ? AND TIME = ? AND DELETE_TIME = 'N'
        """,
        [data["emp_name"], data["date"].isoformat(), data["time"]],
    )


async def selectData(db: D1) -> dict:
    """Return valid leave records in the default display order."""
    result = await db.query(
        """
        SELECT
            CREATE_TIME, DELETE_TIME, EMP_NAME, DATE, TIME, REASON
        FROM
            LEAVE
        WHERE
            DATE >= date('now', '+8 hours') AND DELETE_TIME = 'N'
        ORDER BY
            DATE, TIME, EMP_NAME
        """
    )

    return {
        "status": "success",
        "data": [{"IDX": idx, **row} for idx, row in enumerate(result.results or [])],
    }
