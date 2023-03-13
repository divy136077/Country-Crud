const amqp = require("amqplib"); 
export class rabbit {
    public static publishToQueue = async (queue, message, durable = false) => {
        try {
        const cluster = await amqp.connect(process.env.RABBITMQURL);
        const channel = await cluster.createChannel();
        await channel.assertQueue(queue, durable= false);
        await channel.sendToQueue(queue, Buffer.from(message));
    
        console.info(' [x] Sending message to queue', queue, message);
    
        } catch (error) {
            // handle error response
            console.error(error, 'Unable to connect to cluster!');  
            process.exit(1);
        }
    
    }
    public static consumeFromQueue = async (queue, isNoAck = false, durable = false, prefetch = null) => {
        return new Promise(async(resolve, reject) => {
            const cluster = await amqp.connect(process.env.RABBITMQURL);
            const channel = await cluster.createChannel();
            await channel.assertQueue(queue, durable=false);
            if (prefetch) {
                channel.prefetch(prefetch);
            }
            console.log(` [x] Waiting for messages in ${queue}. To exit press CTRL+C`)
            try {
             await channel.consume(queue, message => {
                    if (message !== null) {
                        let data = JSON.parse(message.content.toString());
                        console.log("data",data)
                        console.log(' [x] Received', JSON.parse(message.content.toString()));
                        
                        channel.ack(message);
                        resolve(data);
                    } else {
                        console.log('Queue is empty!')
                        channel.reject(message);
                    }
                }, {noAck: isNoAck})
            } catch (error) {
                console.log(error, 'Failed to consume messages from Queue!')
                cluster.close(); 
            }
        });
    }
    
}

    