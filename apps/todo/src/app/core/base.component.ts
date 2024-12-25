import {LoadingService} from "../shared/app-loading/loading.service";
import {DestroyRef, inject} from "@angular/core";
import {ToastMsgService} from "../shared/toast-msg/toast-msg.service";
import {TranslateService} from "@ngx-translate/core";
export class BaseComponent {
    loadingService = inject(LoadingService);
    toastMsgService = inject(ToastMsgService);
    destroyRef = inject(DestroyRef)
    translateService = inject(TranslateService)
    constructor() {

    }
}
