

import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, ValidationError

router = APIRouter()

class UserPreferences(BaseModel):
    theme: str
    language: str
    notifications: bool

@router.post("/load-prefs")
async def load_prefs(data: str):
    try:
        # Deserialización segura: JSON no ejecuta código
        raw = json.loads(data)
        # Validación estricta del esquema
        validated = UserPreferences(**raw)
    except (json.JSONDecodeError, ValidationError):
        raise HTTPException(status_code=400, detail="Datos invalidos")

    # Solo devolvemos los campos definidos en el modelo
    return validated.model_dump()
