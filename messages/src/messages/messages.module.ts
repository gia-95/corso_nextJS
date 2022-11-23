import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository]  // classi che possono essere usate come dipendenze per altre classi (segnate con '@Injectable')
})
export class MessagesModule {}
