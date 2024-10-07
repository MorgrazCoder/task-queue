import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "@infrastructure/framework/modules/app.module";

export class Application {
    private readonly app: INestApplication;
    private readonly configService: ConfigService;

    private readonly appPort: number;
    private readonly apiVersion: string;

    constructor(app: INestApplication) {
        this.app = app;
        this.configService = app.get(ConfigService);
        this.appPort = this.configService.getOrThrow("APP_PORT");
        this.apiVersion = this.configService.getOrThrow("API_VERSION");
    }

    public assignGlobalPipes(): this {
        this.app.useGlobalPipes();
        return this;
    }

    public assignGlobalGuards(): this {
        this.app.useGlobalGuards();
        return this;
    }

    public assignGlobalFilters(): this {
        this.app.useGlobalFilters();
        return this;
    }

    public assignGlobalInterceptors(): this {
        this.app.useGlobalInterceptors();
        return this;
    }

    public initDocs(): this {
        const config = new DocumentBuilder()
            .setTitle("Task queue")
            .setDescription("Task queue API documentation")
            .setVersion(this.apiVersion)
            .build();

        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup(`api/v${this.apiVersion}/docs`, this.app, document);

        return this;
    }

    private async startApp(): Promise<void> {
        await this.app
            .listen(this.appPort)
            .then(() => console.log(`Application has been started on port: ${this.appPort}`));
    }

    public static async create() {
        return NestFactory.create(AppModule).then((app) =>
            new Application(app)
                .initDocs()
                .assignGlobalPipes()
                .assignGlobalGuards()
                .assignGlobalFilters()
                .assignGlobalInterceptors()
                .startApp()
        );
    }
}
