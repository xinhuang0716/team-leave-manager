# import packages
import duckdb, os


# InitDB function
def InitDB(databaseName: str):
    """
    Create DuckDB database if not exists, and create LEAVE table if not exists.

    [Args]
        databaseName (str): LEAVE Table will be created under this database
    """

    # connect to DuckDB database
    if not os.path.exists("./DB"):
        os.makedirs("./DB")
    conn = duckdb.connect(f"./DB/{databaseName}.db")

    # create table
    conn.sql(
        """
        CREATE TABLE IF NOT EXISTS LEAVE (
            CREATE_TIME TIMESTAMP_S NOT NULL,
            DELETE_TIME VARCHAR(16) NOT NULL DEFAULT 'N',
            EMP_NAME VARCHAR(16) NOT NULL,
            DATE DATE NOT NULL,
            TIME VARCHAR(4) NOT NULL,
            REASON VARCHAR(64) DEFAULT NULL,
            CONSTRAINT TIME CHECK (TIME IN ('AM', 'PM')),
            PRIMARY KEY (EMP_NAME, DATE, TIME, DELETE_TIME)
            )
        ;
        """
    )

    # disconnection
    conn.close()