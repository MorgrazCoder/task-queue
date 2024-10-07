import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PushToQueueDto {
    @ApiProperty({ example: "e80f801a-43dd-4729-9b51-757809d5ad01"})
    @IsUUID(4)
    ticket_id: string;
}
