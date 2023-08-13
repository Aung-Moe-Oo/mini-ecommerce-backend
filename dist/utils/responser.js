"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Responser = ({ statusCode, message, devMessage, body, }) => {
    return {
        meta: {
            success: statusCode >= 200 && statusCode <= 300 ? true : false,
            message: message,
            devMessage: devMessage,
        },
        body: body,
    };
};
exports.default = Responser;
//# sourceMappingURL=responser.js.map