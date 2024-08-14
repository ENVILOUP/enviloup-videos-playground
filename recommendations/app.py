import fastapi

app = fastapi.FastAPI()


@app.get('/health-check')
async def health_check():
    return 'ok'
