import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BreakpointObserver} from "@angular/cdk/layout";
import {HeaderComponent} from "../header/header.component";
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import { CookieStorageService } from '../../core/services/cookie-storage.service';
import {AUTH_TOKEN} from "../../core/constant/AppConstant";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavContainer,
    MatNavList,
    RouterOutlet,
    MatSidenav,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    HeaderComponent,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatFormField,
    MatLabel,
    MatInput,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= false;
  isCollapsed = false;
  cookieStorageService = inject(CookieStorageService);
  router = inject(Router);
  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu(accountMenuRef: MatExpansionPanel) {
    accountMenuRef.close()
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
  logout() {
    this.cookieStorageService.deleteCookie(AUTH_TOKEN);
    this.router.navigate(['/login']);
  }
}
