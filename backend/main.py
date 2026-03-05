import json
import logging
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from utils.crud import insertData, selectData, updateData
from utils.database import initDB
from utils.model import FetchResponse, InsertModel, MessageResponse, UpdateModel

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

# Load configuration
with open("./config/metadata.json", encoding="utf-8") as f: METADATA = json.load(f)
with open("./config/middleware.json", encoding="utf-8") as f: MIDDLEWARE = json.load(f)


# Lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    initDB()
    yield


# App Instance & Middleware
app = FastAPI(**METADATA, lifespan=lifespan)
app.add_middleware(CORSMiddleware, **MIDDLEWARE)


# Routes
@app.get("/", tags=["Root"])
def root():
    return {"message": "Check the API documentation at /docs"}


@app.post("/add", tags=["Create New Record"], response_model=MessageResponse)
def add(data: InsertModel) -> MessageResponse:
    try:
        insertData(data.model_dump())
        return MessageResponse(message=f"Data inserted successfully: {data}")
    except Exception as e:
        logger.error("Error inserting data: %s", e)
        raise HTTPException(status_code=500, detail="An internal server error occurred")


@app.patch("/change", tags=["Change Record from Valid to Invalid"], response_model=MessageResponse)
def change(data: UpdateModel) -> MessageResponse:
    try:
        updateData(data.model_dump())
        return MessageResponse(message=f"Record updated successfully: {data}")
    except Exception as e:
        logger.error("Error updating data: %s", e)
        raise HTTPException(status_code=500, detail="An internal server error occurred")


@app.get("/fetch", tags=["Retrieve All Valid Records"], response_model=FetchResponse)
def fetch() -> FetchResponse:
    try:
        return FetchResponse(**selectData())
    except Exception as e:
        logger.error("Error fetching data: %s", e)
        raise HTTPException(status_code=500, detail="An internal server error occurred")


# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info", access_log=True)
