import {Component, inject, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LanguageSheetComponent} from "../language-sheet/language-sheet.component";
import {MatListItem} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIcon, MatIconButton, MatToolbar, MatListItem,
    MatTooltipModule, TranslatePipe,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  toggleMenuEmitter = output();
  private bottomSheet = inject(MatBottomSheet)

  toggleMenu() {
    this.toggleMenuEmitter.emit();
  }
  openLanguageSheet() {
    this.bottomSheet.open(LanguageSheetComponent);
  }
}
