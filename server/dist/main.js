"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const httpService = new axios_1.HttpService();
    httpService.axiosRef.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        console.error('Internal server error exception', error);
        throw new common_1.InternalServerErrorException();
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map