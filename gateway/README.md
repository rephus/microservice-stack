## Simple REST + Redis storage

Simple service to store geolocation (or any other generic user based data)
by GET + POST rest service using redis,
protected by an APP key.

## Run

Saving data
```
POST /
{"user": "rephus", "latitude":51.5296836,"longitude":-0.080295}
```

Getting list of users with their latest location
```
GET /
{"rephus" : {"user": "rephus", "latitude":51.5296836,"longitude":-0.080295} }
```
