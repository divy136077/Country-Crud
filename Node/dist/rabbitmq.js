"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbit = void 0;
const amqp = require("amqplib");
class rabbit {
}
exports.rabbit = rabbit;
rabbit.publishToQueue = (queue, message, durable = false) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cluster = yield amqp.connect(process.env.RABBITMQURL);
        const channel = yield cluster.createChannel();
        yield channel.assertQueue(queue, durable = false);
        yield channel.sendToQueue(queue, Buffer.from(message));
        console.info(' [x] Sending message to queue', queue, message);
    }
    catch (error) {
        // handle error response
        console.error(error, 'Unable to connect to cluster!');
        process.exit(1);
    }
});
rabbit.consumeFromQueue = (queue, isNoAck = false, durable = false, prefetch = null) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const cluster = yield amqp.connect(process.env.RABBITMQURL);
        const channel = yield cluster.createChannel();
        yield channel.assertQueue(queue, durable = false);
        if (prefetch) {
            channel.prefetch(prefetch);
        }
        console.log(` [x] Waiting for messages in ${queue}. To exit press CTRL+C`);
        try {
            yield channel.consume(queue, message => {
                if (message !== null) {
                    let data = JSON.parse(message.content.toString());
                    console.log("data", data);
                    console.log(' [x] Received', JSON.parse(message.content.toString()));
                    channel.ack(message);
                    resolve(data);
                }
                else {
                    console.log('Queue is empty!');
                    channel.reject(message);
                }
            }, { noAck: isNoAck });
        }
        catch (error) {
            console.log(error, 'Failed to consume messages from Queue!');
            cluster.close();
        }
    }));
});
//# sourceMappingURL=rabbitmq.js.map