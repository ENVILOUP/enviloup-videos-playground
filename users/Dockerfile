FROM python:3.11.9-alpine3.20

ARG SERVICE_NAME="users"

ENV SERVICE_NAME=$SERVICE_NAME

ENV PYTHONPATH=/app

WORKDIR /app

RUN apk --update --no-cache add net-tools curl vim

COPY ../poetry.lock ../pyproject.toml /app/

RUN pip --no-cache-dir install poetry==1.8.3 && \
    poetry export -f requirements.txt -o requirements.txt && \
    pip install --no-cache-dir -r requirements.txt

COPY $SERVICE_NAME/ /app/$SERVICE_NAME

EXPOSE 8000

CMD ["sh", "-c", "uvicorn ${SERVICE_NAME}.app:app --host 0.0.0.0 --port 8000"]
