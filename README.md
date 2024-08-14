# Enviloup Videos Playgroud

WARNING! THIS REPO IS ONLY PROOF OF CONCENT!

REPO MAINTAINER: @jojopko

Теперь, я пишу на русском: мне так удобнее.

## Установка для разработки

### Pyenv

Советую использовать pyenv для установки нужной версии интерпретатора,
которая написана в файле `.python-version`:

Не забудь добавить pyenv в PATH!

```shell
$ pyenv local 3.11
```

### Poetry

Советую использовать poetry, если что-то будешь разрабатывать и добавлять новые пакеты:

```shell
$ pyenv exec pip install poetry==1.8.3
$ pyenv exec poetry shell
$ poetry install
```

Но можно и без него, чтобы тупо скачать и посмотреть:

```shell
$ pyenv exec pythom -m venv .venv/
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

Теперь в IDE дожно все подсвечиваться и можно запустить приложения. Хотя лучше
проводить тесты в Docker. 

## Docker

Нужно установить Docker Engine, Docker Compose - обычно идет в комплекте.
Для разработки рекомендую установить Docker Desktop.

Для запуска контейнеров используем эту команду:

```shell
$ docker compose up -d
```

Если надо принудительно перебилдить пишем эту:

```shell
$ docker compose up --build -d
```

Если надо подключиться внутрь контенера пишем эту:

```shell
$ docker exec -it <container-name> sh
```

Для удаления пишем эту:

```shell
$ docker compose down
```
