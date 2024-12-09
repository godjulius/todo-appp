import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {TranslateService} from "@ngx-translate/core";
import {ILanguage, LANGUAGES} from "../../core/constant/Language.model";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {LANGUAGE} from "../../core/constant/AppConstant";

@Component({
  selector: 'app-language-sheet',
  standalone: true,
  imports: [CommonModule, MatList, MatListItem, MatNavList],
  templateUrl: './language-sheet.component.html',
  styleUrl: './language-sheet.component.scss',
})
export class LanguageSheetComponent {
  private _bottomSheetRef = inject<MatBottomSheetRef<LanguageSheetComponent>>(MatBottomSheetRef);
  private localstorageService = inject(LocalStorageService);
  languages: string[];
  _languages: ILanguage;
  constructor(
    private translateService: TranslateService
  ) {
    this.languages = this.translateService.getLangs();
    this._languages = LANGUAGES;
    console.log('Languages:', this.languages);
  }
  selectLanguage(lang: string) {
    this.translateService.use(lang);
    this._bottomSheetRef.dismiss(lang);
    this.localstorageService.set(LANGUAGE, lang);
  }

}
