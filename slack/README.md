## Slack service 

Send messages to slack via REST and store messages in Redis

## Run

    docker-compose up slack
     
## Post a slack message 

    curl -X POST http://localhost:8102/ -d '{"channel": "#user", "message": "User <id> created"}'  -H  'Content-Type: application/json'

## List messages posted (for testing) 
    
    curl localhost:8102/messages?channel=%23user

## Libraries

* Assert: https://nodejs.org/api/assert.html
