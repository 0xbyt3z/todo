"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    let token = '';
    context.getArgs()[2].req['rawHeaders'].map((s) => {
        if (s.includes('Bearer')) {
            token = s.split(' ')[1];
        }
    });
    const decode = jsonwebtoken_1.default.decode(token, {
        complete: true,
    });
    if (decode) {
        return decode?.payload.email;
    }
    return '';
});
//# sourceMappingURL=currentuser.decorator.js.map