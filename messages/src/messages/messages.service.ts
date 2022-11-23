import { Injectable } from '@nestjs/common'; // Per 'aggiungere classi' al DipInj container 
import { MessagesRepository } from './messages.repository';

@Injectable() //Lo aggiungo al DI contaniner (così ne ha conto)
export class MessagesService {
  constructor(public messagesRepo: MessagesRepository) {
    // Mettere 'public' è come avere una variabile globale (della classe)
    // e gli assegno il parametro del costruttore
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
