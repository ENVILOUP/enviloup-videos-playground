import fastapi
import pydantic

app = fastapi.FastAPI()


class Video(pydantic.BaseModel):
    id: int
    title: str
    descrition: str


@app.get('/health-check')
async def health_check():
    return {'status': 'ok'}


VIDEOS_DATABASE = [
    Video(id=1,
          title='Hello World',
          descrition='Some description for Hello'),
    Video(id=2,
          title='The concept meaning',
          descrition='The concept meaning by Nikita'),
    Video(id=3,
          title='What is Enviloup?',
          descrition='Video about Enviloup'),
]


@app.get('/video/list/')
async def get_videos_list() -> list[Video]:
    return VIDEOS_DATABASE


@app.get('/video/{video_id}/')
async def get_video(video_id: int) -> Video:
    for video in VIDEOS_DATABASE:
        if video.id == video_id:
            return video
    raise fastapi.exceptions.HTTPException(status_code=404)
