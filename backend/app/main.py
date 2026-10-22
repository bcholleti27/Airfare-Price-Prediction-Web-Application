
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="Airfare Price Prediction API",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Airfare Price Prediction API",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


class FlightDetails(BaseModel):
    origin: str = Field(min_length=3, max_length=3)
    destination: str = Field(min_length=3, max_length=3)
    days_until_departure: int = Field(ge=0, le=365)


@app.post("/predict")
def predict_price(flight: FlightDetails):
    return {
        "origin": flight.origin,
        "destination": flight.destination,
        "days_until_departure": flight.days_until_departure,
        "predicted_price": 250.00,
        "currency": "USD",
        "model_status": "placeholder"
    }
