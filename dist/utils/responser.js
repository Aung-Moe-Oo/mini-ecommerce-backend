"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responser = void 0;
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
exports.Responser = Responser;
//# sourceMappingURL=responser.js.map