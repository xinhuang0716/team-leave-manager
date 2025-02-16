# import packages
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# some utility functions
from utils.database import InitDB
from utils.crud import InsertData, UpdateData, SelectData
from utils.model import InsertModel, UpdateModel


# Create FastAPI instance
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


# Root
@app.get("/")
def _():
    return "Check the API documentation at /docs"

# Initialize database
@app.post("/init/{dbName}")
def init(dbName : str):
    try:
        InitDB(databaseName = dbName)
        return {"message": f"Database {dbName} has initialized successfully"}
    except Exception as error:
        raise HTTPException(status_code = 500, detail = str(error))

# Insert data
@app.post("/add/{dbName}")
def add(data: InsertModel, dbName : str):
    try:
        InsertData(data.dict(), databaseName = dbName)
        return {"message": "Data has been inserted successfully, with the following details: " + str(data)}
    except Exception as error:
        raise HTTPException(status_code = 500, detail = str(error))
    
# Update data
@app.post("/change/{dbName}")
def change(data: UpdateModel, dbName : str):
    try:
        UpdateData(data.dict(), databaseName = dbName)
        return {"message": "Data has been updated successfully, with the following details: " + str(data)}
    except Exception as error:
        raise HTTPException(status_code = 500, detail = str(error))

# Select data
@app.get("/fetch/{dbName}")
async def fetch(dbName: str):
    try:
        return SelectData(databaseName = dbName)
    except Exception as error:
        raise HTTPException(status_code = 500, detail = str(error))

# launch the server
# uvicorn server:app --reload --host 0.0.0.0 --port 8000
# http://<ip>:8000