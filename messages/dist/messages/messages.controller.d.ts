import { createMessageDto } from './dtos/create-message.dto';
export declare class MessagesController {
    listMessages(): void;
    createMessage(body: createMessageDto): void;
    getMessage(id: string): void;
}
