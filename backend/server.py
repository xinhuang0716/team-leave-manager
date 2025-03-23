# import packages
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# some utility functions
from utils.database import InitDB
from utils.crud import InsertData, UpdateData, SelectData
from utils.model import InsertModel, UpdateModel

METADATA = {
    "title": "FastAPI for Team Leave Manager",
    "description": """This is a simple FastAPI server for managing team leaves. It has the following endpoints:""",
    "version": "0.0.1",
    "openapi_tags": [
        {
            "name": "Root",
            "description": "Check the API documentation at /docs"
        },
        {
            "name": "Initiate Database",
            "description": "To create your Team-Leave-Manager, you need to initiate a database first."
        },
        {
            "name": "Create New Record",
            "description": "To add a new leave record, payload should include the following fields:<br/>"
            + "1.  **\"emp_name\"**, str, for example, \"John\"<br/>"
            + "2. **\"date\"**, str, for example, \"2025-12-31\"<br/>"
            + "3. \"**time\"**, str, need to be \"AM\" or \"PM\"<br/>"
            + "4. \"**reason\"** str, it's optional"
        },
        {
            "name": "Change Record from Valid to Invalid",
            "description": "To change the existed leave record from valid to invalid, your payload need to include the items of the record that you want to modify."
},
        {
            "name": "Retrieve All Valid Records",
            "description": "It will return all the valid leave records in the order of **\"date\"**, **\"time\"** and **\"emp_name\"**."
        }
    ]
}

# Create FastAPI instance
app = FastAPI(**METADATA)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root
@app.get("/", tags = ["Root"])
def _():
    return "Check the API documentation at /docs"


# Initialize database
@app.post("/init/{dbName}", tags = ["Initiate Database"])
def init(dbName: str):
    try:
        InitDB(databaseName=dbName)
        return {"message": f"Database {dbName} has initialized successfully"}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


# Insert data
@app.post("/add/{dbName}", tags = ["Create New Record"])
def add(data: InsertModel, dbName: str):
    try:
        InsertData(data.dict(), databaseName=dbName)
        return {
            "message": "Data has been inserted successfully, with the following details: "
            + str(data)
        }
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


# Update data
@app.post("/change/{dbName}", tags = ["Change Record from Valid to Invalid"])
def change(data: UpdateModel, dbName: str):
    try:
        UpdateData(data.dict(), databaseName=dbName)
        return {
            "message": "Data has been updated successfully, with the following details: "
            + str(data)
        }
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


# Select data
@app.get("/fetch/{dbName}", tags = ["Retrieve All Valid Records"])
async def fetch(dbName: str):
    try:
        return SelectData(databaseName=dbName)
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


# launch the server
# uvicorn server:app --reload --host 0.0.0.0 --port 8000
# http://<ip>:8000
