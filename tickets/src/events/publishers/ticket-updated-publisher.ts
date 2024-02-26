import { Publisher, Subjects, TicketUpdatedEvent } from "@mico-gigz/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
