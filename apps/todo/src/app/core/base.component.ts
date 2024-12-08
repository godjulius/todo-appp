import {LoadingService} from "../shared/app-loading/loading.service";
import {inject} from "@angular/core";

export class BaseComponent {
  loadingService = inject(LoadingService);
  constructor() {

  }
}
