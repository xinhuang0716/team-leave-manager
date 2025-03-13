# import packages
import duckdb


# INSERT function
def InsertData(data: dict[str, str, str, str], databaseName: str = "datascience"):
    """
    Create DuckDB database if not exists, and create LEAVE table if not exists.

    [Args]
        databaseName (str): Connect to this database
        data (dict): Must contain "emp_name", "date" and "time", "reason" is optional
    """

    # connect to DuckDB database
    conn = duckdb.connect(f"./DB/{databaseName}.db")

    # insert query
    query = """
            BEGIN TRANSACTION
            ;

            INSERT INTO 
                LEAVE (CREATE_TIME, EMP_NAME, DATE, TIME, REASON)
            VALUES 
                (CURRENT_LOCALTIMESTAMP(), '{emp_name}', DATE '{date}', '{time}', DEFAULT)
            ;

            COMMIT
            ;
            """.format(**data)

    # insert data
    conn.sql(
        query
        if "reason" not in data
        else query.replace("DEFAULT", "'{reason}'".format(**data))
    )

    # disconnection
    conn.close()


# UPDATE function
def UpdateData(data: dict[str, str, str], databaseName: str):
    """
    Update data if the specified leave record is no more valid.

    [Args]
        databaseName (str): Connect to this database
        data (dict): Must contain "emp_name", "date" and "time"
    """

    # connect to DuckDB database
    conn = duckdb.connect(f"./DB/{databaseName}.db")

    # update query
    query = """
            BEGIN TRANSACTION
            ;
            UPDATE LEAVE
                SET DELETE_TIME = STRFTIME(CURRENT_LOCALTIMESTAMP(), '%Y-%m-%d %H:%M:%S')
                WHERE EMP_NAME = '{emp_name}'
                      AND DATE = DATE '{date}'
                      AND TIME = '{time}'
                      AND DELETE_TIME = 'N'
            ;

            COMMIT
            ;
            """.format(**data)

    # insert data
    conn.sql(query)

    # disconnection
    conn.close()


# SELECT function
def SelectData(databaseName: str) -> dict:
    """
    Select all valid leave record from LEAVE table.

    [Args]
        databaseName (str): Connect to this database
    """

    # connect to DuckDB database
    conn = duckdb.connect(f"./DB/{databaseName}.db", read_only = True)

    # select query
    query = """
            SELECT 
                *
            FROM
                LEAVE
            WHERE
                DATE >= current_date  -- filter by date
                AND DELETE_TIME = 'N' -- valid record
            ;
            """

    # data preprocessing
    data = conn.sql(query).fetchall()
    result = {"status": "success",
              "data": [dict(zip(["IDX", "CREATE_TIME", "DELETE_TIME", "EMP_NAME", "DATE", "TIME", "REASON"],
                                [idx] + list(values))
                            ) for idx, values in enumerate(data)]}

    # disconnection
    conn.close()

    return result
