export interface IQueueUseCase {
    pushToQueue(ticketId: string): Promise<void>;

    executeTicket(ticketId: string): Promise<string>;
}
