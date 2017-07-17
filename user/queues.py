import pika #rabbitmq
import settings

import logging

logger = logging.getLogger()

## Rabbitmq connection setup
connection = pika.BlockingConnection(pika.ConnectionParameters(
        host=settings.rabbitmq['host']))
channel = connection.channel()

channel.queue_declare(queue=settings.rabbitmq['queue'], durable=True)
#channel.exchange_declare(exchange='logs', type='fanout')

def send_message(message):

    try: 
        channel.basic_publish(exchange='',
                            routing_key='slack', # Queue to send the message to
                            body=message,
                            properties=pika.BasicProperties(
                                delivery_mode = 2, # make message persistent
                            ))
        logger.debug(" [->] %r" % message)
    except Exception as e: 
        logger.warning("Unable to send message " + message)
