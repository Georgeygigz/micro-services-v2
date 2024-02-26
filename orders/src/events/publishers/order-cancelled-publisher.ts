import { Subjects, Publisher, OrderCancelledEvent } from "@mico-gigz/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
