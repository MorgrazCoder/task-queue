import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Inject, ParseUUIDPipe, Post, Query } from "@nestjs/common";

import { ITicketUseCase, TicketUseCase } from "src/use-cases/ticket";

import { CreateTicketDto } from "@presentation/ticket";

@ApiTags("Ticket")
@Controller("tickets")
export class TicketController {
    constructor(@Inject(TicketUseCase) private readonly ticketUseCase: ITicketUseCase) {}

    @Get()
    public async getTicketsByUser(
        @Query("userId", new ParseUUIDPipe({ version: "4" })) userId: string
    ) {
        return this.ticketUseCase.getTickets(userId);
    }

    @Post()
    public async createTicket(@Body() dto: CreateTicketDto) {
        return this.ticketUseCase.createTicket(dto);
    }
}
