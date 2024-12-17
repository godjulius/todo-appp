import {LoadingService} from "../shared/app-loading/loading.service";
import {DestroyRef, inject} from "@angular/core";

export class BaseComponent {
  loadingService = inject(LoadingService);
  destroyRef = inject(DestroyRef)
  constructor() {

  }
}
