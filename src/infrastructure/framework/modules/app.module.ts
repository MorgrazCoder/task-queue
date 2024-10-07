import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { Module, ValidationPipe } from "@nestjs/common";

import { UserModule } from "@infrastructure/framework/modules/user.module";
import { QueueModule } from "@infrastructure/framework/modules/queue.module";
import { TicketModule } from "@infrastructure/framework/modules/ticket.module";
import { ServiceModule } from "@infrastructure/framework/modules/service.module";
import { PostgresModule } from "@infrastructure/framework/modules/postgres.module";

import { CustomExceptionsFilter } from "@infrastructure/framework/filters";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        QueueModule,
        TicketModule,
        ServiceModule,
        PostgresModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({ transform: true, whitelist: true }),
        },
        {
            provide: APP_FILTER,
            useClass: CustomExceptionsFilter,
        },
    ],
})
export class AppModule {}

