
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/login")
async def login(body: dict):
    username = body.get("username")
    password = body.get("password")
    if not isinstance(username, str) or not isinstance(password, str):
        raise HTTPException(status_code=400, detail="Tipo de datos invalido")
    user = _find_one({"username": username, "password": password})
    if user:
        return {"token": "access_granted", "role": user.get("role")}
        raise HTTPException(status_code=401, detail="Credenciales invalidas")
