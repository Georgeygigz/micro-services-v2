import { Subjects, Publisher, OrderCreatedEvent } from "@mico-gigz/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
