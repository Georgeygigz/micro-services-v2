import { Publisher, Subjects, TicketCreatedEvent } from "@mico-gigz/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
