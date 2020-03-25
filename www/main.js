"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(compression());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(helmet());
    app.setGlobalPrefix('api/v1.0');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.enableCors({
        exposedHeaders: ['X-Total-Count'],
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map