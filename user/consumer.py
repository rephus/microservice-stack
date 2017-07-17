import settings
from queues import channel 
import logging 

logger = logging.getLogger()
logger.info(' [*] Waiting for messages. To exit press CTRL+C')

def callback(ch, method, properties, body):
    logger.debug(" [<-] %r" % body)
    # TODO do stuff
    logger.debug(" [x] %r" % body)
    ch.basic_ack(delivery_tag = method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(callback,
                      queue=settings.rabbitmq['queue'])

channel.start_consuming()
