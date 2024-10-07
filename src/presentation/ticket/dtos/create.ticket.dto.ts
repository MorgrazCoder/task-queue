import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {
    @ApiProperty({ example: "e80f801a-43dd-4729-9b51-757809d5ad01" })
    @IsUUID(4)
    user_id: string;

    @ApiProperty({ example: "e80f801a-43dd-4729-9b51-757809d5ad01" })
    @IsUUID(4)
    service_id: string;
}
