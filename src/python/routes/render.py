# src/python/routes/render.py
# PASO 3: Server-Side Template Injection (SSTI) — template fijo con autoescaping habilitado

from fastapi import APIRouter
from jinja2 import Environment, select_autoescape

router = APIRouter()

GREETING_TEMPLATE = "Hola {{ name }}!"
env = Environment(autoescape=select_autoescape(["html", "xml"]))

@router.get("/greet")
async def greet(name: str):
    template = env.from_string(GREETING_TEMPLATE)
    return {"message": template.render(name=name)}
