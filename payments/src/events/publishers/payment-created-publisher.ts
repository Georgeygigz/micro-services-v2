import { Publisher, Subjects, PaymentCreatedEvent } from "@mico-gigz/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
