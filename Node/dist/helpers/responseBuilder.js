"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
const l10n = require("jm-ez-l10n");
class ResponseBuilder {
    // public static successMessage(message: string): ResponseBuilder {
    //   const rb: ResponseBuilder = new ResponseBuilder();
    //   rb.code = 200;
    //   rb.message = message;
    //   return rb;
    // }
    static successMessage(message) {
        const rb = new ResponseBuilder();
        rb.code = 200;
        rb.status = true;
        rb.message = message;
        return rb;
    }
    static dataNotFound(message) {
        const rb = new ResponseBuilder();
        rb.code = 201;
        rb.status = true;
        rb.message = message;
        console.log(message);
        return rb;
    }
    static errorMessage(message) {
        const rb = new ResponseBuilder();
        rb.code = 500;
        rb.error = message != null ? message : l10n.t("ERR_INTERNAL_SERVER");
        return rb;
    }
    static badRequest(message) {
        const rb = new ResponseBuilder();
        rb.code = 400;
        rb.error = message;
        return rb;
    }
    static notFound(message) {
        const rb = new ResponseBuilder();
        rb.code = 404;
        rb.error = message;
        return rb;
    }
    static data(result, message) {
        const rb = new ResponseBuilder();
        rb.code = 200;
        rb.status = true;
        if (result) {
            result.message = message;
        }
        rb.result = result;
        rb.message = message || null;
        return rb;
    }
    static error(err, message) {
        const rb = new ResponseBuilder();
        if (err instanceof ResponseBuilder) {
            return err;
        }
        rb.code = 500;
        rb.error = err || l10n.t("ERR_INTERNAL_SERVER");
        rb.message = message || null;
        rb.description = err.description;
        rb.result = err ? l10n.t("ERR_THROW_BY_CODE") : l10n.t("ERR_INTERNAL_SERVER");
        return rb;
    }
    static getMobileSuccessResponse(result, message) {
        const rb = new ResponseBuilder();
        rb.code = 200;
        rb.status = true;
        rb.result = result;
        rb.message = message || null;
        return rb;
    }
    static getErrorResponse(result, message, errorCode) {
        const rb = new ResponseBuilder();
        rb.code = errorCode || 404;
        rb.status = false;
        rb.result = result;
        rb.message = message || null;
        return rb;
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=responseBuilder.js.map