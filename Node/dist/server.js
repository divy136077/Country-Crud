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
exports.App = void 0;
const bodyParser = require("body-parser"); // pull information from HTML POST (express4)
const compression = require("compression"); // Compression request and response
const dotenv = require("dotenv"); // Loads environment variables from a .env
const express = require("express");
// tslint:disable-next-line: no-var-requires
require("express-async-errors");
const helmet = require("helmet"); // Security
const l10n = require("jm-ez-l10n");
const methodOverride = require("method-override"); // simulate DELETE and PUT (express4)
const morgan = require("morgan"); // log requests to the console (express4)
const path = require("path");
const trimRequest = require("trim-request");
const logger_1 = require("./helpers/logger");
const routes_1 = require("./routes");
const database_1 = require("./database");
const multer = require("multer");
const amqp = require("amqplib");
const userController_1 = require("./v1/modules/user/userController");
var fs = require("fs");
const userController = new userController_1.UserController();
// Loads environment variables from a .env
dotenv.config();
// initialize database
database_1.DB.init();
const upload = multer({
    dest: '/public/assets',
});
class App {
    constructor() {
        this.logger = logger_1.Log.getLogger();
        const NODE_ENV = process.env.NODE_ENV;
        const PORT = process.env.PORT;
        this.app = express();
        this.app.use(helmet());
        this.app.use("/uploads", express.static(path.join("uploads")));
        this.app.all("/*", (req, res, next) => {
            // res.setHeader("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");
            // tslint:disable-next-line: max-line-length
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, authorization, token, language, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale");
            res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
            if (req.method === "OPTIONS") {
                res.writeHead(200);
                res.end();
            }
            else {
                next();
            }
        });
        if (NODE_ENV === "development") {
            this.app.use(express.static(path.join(process.cwd(), "public")));
            // set the static files location of bower_components
            this.app.use(morgan("dev")); // log every request to the console
        }
        else if (NODE_ENV == "TEST") {
            this.app.use("/public", express.static(path.join(process.cwd(), "public")));
        }
        else {
            this.app.use(compression()); // All request compressed
            // set the static files location /public/img will be /img for users
            this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
        }
        l10n.setTranslationsFile("en", "src/language/translation.en.json");
        this.app.use(l10n.enableL10NExpress);
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json(), (error, req, res, next) => {
            if (error) {
                return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
            }
            next();
        });
        this.app.use(bodyParser.json({ type: "application/vnd.api+json" }));
        this.app.use(upload.any());
        this.app.use(methodOverride());
        this.app.use(trimRequest.all);
        const routes = new routes_1.Routes(NODE_ENV);
        this.app.use("/api/v1", routes.path());
        const Server = this.app.listen(PORT, () => {
            this.logger.info(`The server is running on port localhost: ${process.env.PORT}`);
            this.app.use((err, req, res, next) => {
                if (err) {
                    console.log('errr ', err);
                    res.status(500).json({ error: req.t("ERR_INTERNAL_SERVER") });
                    return;
                }
                next();
            });
        });
        // const server = https.createServer(
        //   {
        //     key: fs.readFileSync('./crt/ssl.key/server.key', 'utf8'),
        //     cert: fs.readFileSync('./crt/ssl.crt/server.crt', 'utf8'),
        //   },
        //   this.app
        // );
        // server.listen(PORT, () => {
        //   try {
        //     this.logger.info(`The server is running on port localhost: ${process.env.PORT}`);
        //     this.app.use((err: any, req: any, res: any, next: () => void) => {
        //       if (err) {
        //         console.log('errr ', err);
        //         res.status(500).json({ error: req.t("ERR_INTERNAL_SERVER") });
        //         // SendEmail.sendRawMail(null, null, [process.env.EXCEPTION_MAIL],
        //         //   `ICrowd - API (${NODE_ENV}) - Unhandled Crash`, err.stack); // sending exception email
        //         return;
        //       }
        //       next();
        //     });
        //   }
        //   catch (e) {
        //     console.log("entering catch block");
        //     console.log(e);
        //     console.log("leaving catch block");
        //   }      
        // });
        function amqpConnect() {
            return __awaiter(this, void 0, void 0, function* () {
                // let durable = false;
                // const cluster = await amqp.connect(process.env.RABBITMQURL);
                // const channel = await cluster.createChannel();
                // await channel.assertQueue(process.env.MS_QUEUE_NAME_ROLE_UPDATE, (durable = false));
                // await channel.assertQueue(process.env.MS_QUEUE_NAME_IMPORT_USER, (durable = false));
                // channel.consume(
                //   process.env.MS_QUEUE_NAME_ROLE_UPDATE,
                //   async (msg) => {
                //     let data = JSON.parse(msg.content.toString());
                //     let resp = await userController.updateRoleDataByQueue(data);
                //   },
                //   { noAck: true }
                // );
                // channel.consume(
                //   process.env.MS_QUEUE_NAME_IMPORT_USER,
                //   async (msg) => {
                //     let resp = await userController.getDataFromImportTable();
                //   },
                //   { noAck: true }
                // );
            });
        }
        // amqpConnect();
    }
}
exports.App = App;
//# sourceMappingURL=server.js.map