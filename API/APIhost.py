import propertySearch as ps

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/getProperties")
def get_properties(location: str, minPrice: int, maxPrice: int, minBeds:int, minBaths:int, listingType: str):
    return {"properties": ps.propSearch(location, minPrice, maxPrice, minBeds, minBaths, listingType)}

@app.get("/getRent")
def get_rent(address: str, apiKey: str, propertyType: str, bedrooms: str, bathrooms: str, squareFootage: str):
    return ps.calcRent(address, apiKey, propertyType, bedrooms, bathrooms, squareFootage)