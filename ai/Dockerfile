FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
# COPY . /code/
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN pip install --upgrade pip && pip install --no-cache-dir --upgrade -r /code/requirements.txt

# CMD ["pwd"]

COPY ./api/ /code/api/
EXPOSE 8000

WORKDIR /code/api/
CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]