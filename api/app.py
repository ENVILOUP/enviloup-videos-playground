from uuid import UUID
from typing import Annotated

import fastapi
from pydantic import BaseModel
from datetime import datetime

app = fastapi.FastAPI()


class VideoStats(BaseModel):
    likes: int
    dislikes: int
    views: int


class Video(BaseModel):
    uuid: Annotated[str, UUID]
    title: str
    descrition: str
    thumbnail_path: str
    playlist_path: str
    stats: VideoStats
    pub_date: datetime


@app.get('/health-check')
async def health_check():
    return {'status': 'ok'}


VIDEOS_DATABASE = [
    Video(
        uuid='35b1c855-1a90-42e2-a1c0-1fd4ca9c4450',
        title='Hello World',
        descrition='Some description for Hello',
        thumbnail_path='cdn.enviloup.com/path/to/thumbnail.jpg',
        playlist_path='path/to/master_playlist.m3u8',
        stats=VideoStats(
            likes=134,
            dislikes=12,
            views=5245
        ),
        pub_date=datetime.now()
    ),
    Video(
        uuid='fa8a7683-65da-4a6c-8ea3-f90d8e56731c',
        title='What is CONCEPT?',
        descrition="What is concept and WHY Nikita doesn't understand this",
        thumbnail_path='path/to/thumbnail.jpg',
        playlist_path='path/to/master_playlist.m3u8',
        stats=VideoStats(
            likes=826,
            dislikes=107,
            views=12942
        ),
        pub_date=datetime.now()
    ),
]


@app.get('/video/list/')
async def get_videos_list() -> list[Video]:
    return VIDEOS_DATABASE


@app.get('/video/{video_uuid}/')
async def get_video(video_uuid: Annotated[str, UUID]) -> Video:
    for video in VIDEOS_DATABASE:
        if video.uuid == video_uuid:
            return video
    raise fastapi.exceptions.HTTPException(status_code=404)
