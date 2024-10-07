import { TCreateTicketArgs, TGetTicketRes } from "src/use-cases/ticket";

export interface ITicketUseCase {
    isCompleted(id: string): Promise<boolean>;

    getTickets(userId: string): Promise<TGetTicketRes[]>;

    createTicket(args: TCreateTicketArgs): Promise<TGetTicketRes>;

    executeTicket(id: string): Promise<void>;
}
