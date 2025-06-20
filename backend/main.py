from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import random

app = FastAPI(title="GlaCTrack API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class EmissionData(BaseModel):
    country: str
    code: str
    emissions: float
    year: int

class QuizAnswer(BaseModel):
    answers: List[int]

class QuizResult(BaseModel):
    score: int
    feedback: str
    total: int

class GlacierData(BaseModel):
    scale: float
    colorTint: str
    rotationSpeed: float

# Sample emissions data
emissions_data = []

# Generate sample data for countries and years
countries = [
    {"country": "United States", "code": "US", "base_emissions": 5000},
    {"country": "China", "code": "CN", "base_emissions": 10000},
    {"country": "India", "code": "IN", "base_emissions": 2500},
    {"country": "Russia", "code": "RU", "base_emissions": 1800},
    {"country": "Japan", "code": "JP", "base_emissions": 1200},
    {"country": "Germany", "code": "DE", "base_emissions": 800},
    {"country": "Brazil", "code": "BR", "base_emissions": 500},
    {"country": "Canada", "code": "CA", "base_emissions": 600},
    {"country": "United Kingdom", "code": "GB", "base_emissions": 400},
    {"country": "France", "code": "FR", "base_emissions": 350},
]

# Generate data for years 2000-2023
for year in range(2000, 2024):
    for country_data in countries:
        # Add some realistic variation
        variation = random.uniform(-0.2, 0.2)  # ±20% variation
        year_factor = 1 + (year - 2000) * 0.015  # 1.5% increase per year
        emissions = country_data["base_emissions"] * year_factor * (1 + variation)
        
        emissions_data.append({
            "country": country_data["country"],
            "code": country_data["code"],
            "emissions": round(emissions, 1),
            "year": year
        })

# Quiz questions and correct answers
quiz_questions = [
    {"correct_answer": 2},  # 75%
    {"correct_answer": 2},  # 150 billion tons
    {"correct_answer": 1},  # Arctic
    {"correct_answer": 1},  # 20-25 cm
    {"correct_answer": 2},  # Global warming
]

@app.get("/")
async def root():
    return {"message": "GlaCTrack API - Glacier Carbon Tracker"}

@app.get("/api/emissions", response_model=List[EmissionData])
async def get_emissions(year: Optional[int] = None):
    """Get emissions data for all countries or filtered by year"""
    if year is None:
        return emissions_data
    
    filtered_data = [data for data in emissions_data if data["year"] == year]
    if not filtered_data:
        raise HTTPException(status_code=404, detail=f"No data found for year {year}")
    
    return filtered_data

@app.get("/api/emissions/years")
async def get_available_years():
    """Get list of available years"""
    years = sorted(list(set(data["year"] for data in emissions_data)))
    return {"years": years}

@app.post("/api/quiz", response_model=QuizResult)
async def submit_quiz(quiz_answers: QuizAnswer):
    """Submit quiz answers and get results"""
    if len(quiz_answers.answers) != len(quiz_questions):
        raise HTTPException(
            status_code=400, 
            detail=f"Expected {len(quiz_questions)} answers, got {len(quiz_answers.answers)}"
        )
    
    score = 0
    for i, answer in enumerate(quiz_answers.answers):
        if answer == quiz_questions[i]["correct_answer"]:
            score += 1
    
    # Generate feedback based on score
    percentage = (score / len(quiz_questions)) * 100
    if percentage >= 80:
        feedback = "Excellent! You're a climate champion! 🌟"
    elif percentage >= 60:
        feedback = "Great job! You have solid climate knowledge! 👍"
    elif percentage >= 40:
        feedback = "Good effort! Keep learning about climate change! 📚"
    else:
        feedback = "Keep exploring! Every step towards climate awareness counts! 🌱"
    
    return QuizResult(
        score=score,
        feedback=feedback,
        total=len(quiz_questions)
    )

@app.get("/api/your-glacier", response_model=GlacierData)
async def get_glacier_data(score: Optional[int] = None):
    """Get glacier visualization parameters based on quiz score"""
    if score is None:
        score = 3  # Default middle score
    
    # Calculate glacier properties based on score
    total_questions = len(quiz_questions)
    score_ratio = score / total_questions
    
    # Scale: higher score = larger glacier
    scale = max(0.5, min(1.5, 0.5 + score_ratio))
    
    # Color: green for high scores, yellow for medium, red for low
    if score_ratio >= 0.8:
        color_tint = "#77D9D9"  # Mint/cyan for excellent
    elif score_ratio >= 0.6:
        color_tint = "#90EE90"  # Light green for good
    elif score_ratio >= 0.4:
        color_tint = "#FFD700"  # Gold for okay
    else:
        color_tint = "#FF6B6B"  # Light red for needs improvement
    
    # Rotation speed: slightly faster for higher scores (more "alive")
    rotation_speed = 0.05 + (score_ratio * 0.1)
    
    return GlacierData(
        scale=scale,
        colorTint=color_tint,
        rotationSpeed=rotation_speed
    )

@app.get("/api/stats")
async def get_climate_stats():
    """Get climate statistics for the homepage"""
    return {
        "annual_co2_emissions": "36.8B",
        "glacier_ice_lost_yearly": "150B",
        "sea_level_rise_per_year": "3.4mm",
        "last_updated": "2024"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)