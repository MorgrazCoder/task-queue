import { PrismaService } from "nestjs-prisma";

import { ITicketDomain, TicketDomain } from "@domain";

import {
    ITicketRepository,
    TCreateTicketArgs,
} from "@infrastructure/databases/postgres/prisma/repositories";

export class TicketRepository implements ITicketRepository {
    private readonly ticketClient: PrismaService["ticket"];

    constructor(prismaService: PrismaService) {
        this.ticketClient = prismaService.ticket;
    }

    public async getAllByUserId(userId: string): Promise<ITicketDomain[]> {
        return this.ticketClient
            .findMany({ where: { user_id: userId } })
            .then((tickets) =>
                tickets.map(
                    ({ id, user_id, service_id, is_completed }) =>
                        new TicketDomain({ ticket_id: id, service_id, user_id, is_completed })
                )
            );
    }

    public async getById(id: string): Promise<ITicketDomain | null> {
        return this.ticketClient.findUnique({ where: { id } }).then(
            (data) =>
                data &&
                new TicketDomain({
                    ticket_id: data.id,
                    user_id: data.user_id,
                    service_id: data.service_id,
                    is_completed: data.is_completed,
                })
        );
    }

    public async create(args: TCreateTicketArgs): Promise<ITicketDomain> {
        return this.ticketClient
            .create({ data: args })
            .then(
                ({ id, user_id, service_id, is_completed }) =>
                    new TicketDomain({ ticket_id: id, user_id, service_id, is_completed })
            );
    }

    public async markAsCompleted(id: string): Promise<void> {
        return this.ticketClient.update({ where: { id }, data: { is_completed: true } }).then();
    }

    public async isCompleted(id: string): Promise<boolean> {
        return this.ticketClient.findUnique({where: {id}}).then(data=>!!data && data.is_completed)
    }
}
