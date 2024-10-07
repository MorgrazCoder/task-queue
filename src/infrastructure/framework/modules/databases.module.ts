import { Module } from "@nestjs/common";
import { PostgresModule } from "./postgres.module";

@Module({
    imports: [PostgresModule],
})
export class DatabasesModule {}
