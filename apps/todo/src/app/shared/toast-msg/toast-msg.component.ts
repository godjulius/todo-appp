import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {ToastMsgService, ToastMsgType} from "./toast-msg.service";

@Component({
    selector: 'app-toast-msg',
    standalone: true,
    imports: [CommonModule, MatIconModule, ],
    templateUrl: './toast-msg.component.html',
    styleUrl: './toast-msg.component.scss',
})
export class ToastMsgComponent {
    toastMsgService = inject(ToastMsgService);

    protected readonly ToastMsgType = ToastMsgType;
}


