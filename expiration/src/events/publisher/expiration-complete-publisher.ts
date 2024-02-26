import { Subjects,Publisher,ExpirationCompleteEvent } from "@mico-gigz/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
    
}