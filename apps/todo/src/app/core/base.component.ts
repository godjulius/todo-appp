import {LoadingService} from "../shared/app-loading/loading.service";
import {DestroyRef, inject} from "@angular/core";
import {ToastMsgService} from "../shared/toast-msg/toast-msg.service";
export class BaseComponent {
    loadingService = inject(LoadingService);
    toastMsgService = inject(ToastMsgService);
    destroyRef = inject(DestroyRef)

    constructor() {

    }
}
