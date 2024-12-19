import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastMsgService {
    messages = signal<Message[]>([] as Message[]);

    add(message: Message) {
        this.messages().push(message);
        setTimeout(() => {
            this.close(message);
        }, 7000)
    }

    addSuccess(rawMessage: any) {
        console.log(rawMessage);
        const msg = new Message({title: rawMessage.title, message: rawMessage.message, type: ToastMsgType.SUCCESS});
        this.add(msg);
    }

    addInfo(title: string, message: string) {
        const msg = new Message({title, message, type: ToastMsgType.INFO});
        this.add(msg);
    }

    addError(title: string, message: string) {
        const msg = new Message({title, message, type: ToastMsgType.ERROR});
        this.add(msg);
    }

    close(message: Message) {
        this.messages.set(this.messages().filter(m => m.id !== message.id));
    }
}

class Message {
    id: string;
    title: string;
    message: string
    type: ToastMsgType;

    constructor(msg: IToastMsg) {
        this.id = new Date().getTime().toString();
        this.title = msg.title;
        this.message = msg.message
        this.type = msg.type;
    }
}

export interface IToastMsg {
    title: string;
    message: string;
    type: ToastMsgType;
}

export enum ToastMsgType {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error'
}
