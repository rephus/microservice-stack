FROM python:3-alpine

WORKDIR /code/
ADD . /code

RUN apk update && apk add \ 
    postgresql-dev \ 
    python3-dev \ 
    gcc \ 
    musl-dev
RUN pip install -q -r requirements.txt


CMD ["run.sh"]
