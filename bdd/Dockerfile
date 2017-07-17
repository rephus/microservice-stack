FROM python:3-alpine

WORKDIR /code/
ADD . /code

RUN pip install -q -r requirements.txt

CMD ["behave"]
