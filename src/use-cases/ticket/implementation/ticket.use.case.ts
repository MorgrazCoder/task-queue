import { IUserUseCase } from "src/use-cases/user";
import { IServiceUseCase } from "src/use-cases/service";
import { ITicketUseCase, TCreateTicketArgs, TGetTicketRes } from "src/use-cases/ticket";

import { ITicketRepository } from "@infrastructure/databases/postgres/prisma/repositories";
import { TicketNotFoundException } from "@infrastructure/exceptions";

export class TicketUseCase implements ITicketUseCase {
    constructor(
        private readonly userUseCase: IUserUseCase,
        private readonly serviceUseCase: IServiceUseCase,
        private readonly ticketRepository: ITicketRepository
    ) {}

    public async getTickets(userId: string): Promise<TGetTicketRes[]> {
        return this.ticketRepository.getAllByUserId(userId);
    }

    public async createTicket(args: TCreateTicketArgs): Promise<TGetTicketRes> {
        const { service_id, user_id } = args;

        await this.serviceUseCase.getService(service_id);

        await this.userUseCase.getUserById(user_id);

        return this.ticketRepository.create(args);
    }

    public async executeTicket(id: string): Promise<void> {
        return this.ticketRepository.getById(id).then((data) => {
            if (!data) throw new TicketNotFoundException();

            return this.ticketRepository.markAsCompleted(data.ticket_id);
        });
    }

    public async isCompleted(id: string): Promise<boolean> {
        return this.ticketRepository.isCompleted(id);
    }
}
