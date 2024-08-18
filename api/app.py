import fastapi
import pydantic
from minio import Minio

app = fastapi.FastAPI()

client = Minio("s3-storage:9000",
               access_key="Y4V9npKFwGru81ZDASq8",
               secret_key="D9ZG56RepFWdLzVVJz4hbSGEhsaySI8Hc1LuiwMW",
               cert_check=False,
               secure=False)


class Video(pydantic.BaseModel):
    id: int
    title: str
    descrition: str


@app.get('/health-check')
async def health_check():
    if not client.bucket_exists('enviloup'):
        raise fastapi.exceptions.HTTPException(status_code=404, detail='`enviloup` S3 bucket is not exist!')
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
    Video(id=4,
          title='What is Enviloup?',
          descrition='Video about Enviloup'),
    Video(id=5,
          title='What is Enviloup?',
          descrition='Video about Enviloup'),
    Video(id=6,
          title='What is Enviloup?',
          descrition='Video about Enviloup'),
    Video(id=7,
          title='What is Enviloup?',
          descrition='Video about Enviloup'),
    Video(id=8,
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
