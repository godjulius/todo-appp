import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {AppLoadingComponent} from "./shared/app-loading/app-loading.component";
import {LoadingService} from "./shared/app-loading/loading.service";
import {LocalStorageService} from "./core/services/local-storage.service";
import {LANGUAGE} from "./core/constant/AppConstant";
@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatDividerModule, MatIconModule, TranslateModule, AppLoadingComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loadingService = inject(LoadingService);
  localstorageService = inject(LocalStorageService);
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const browserLang = translate.getBrowserLang()!;
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
    const userLanguage = this.localstorageService.get(LANGUAGE);
    if (userLanguage) {
      translate.use(userLanguage);
    }
  }
}
