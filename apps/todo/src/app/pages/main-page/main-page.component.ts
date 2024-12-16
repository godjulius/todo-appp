import {Component, DestroyRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
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
import {CookieStorageService} from '../../core/services/cookie-storage.service';
import {AUTH_TOKEN, PAGE_LIST} from "../../core/constant/AppConstant";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {IProfile} from "../../shared/services/account.service";
import {selectProfile} from "../../store/user.selector";
import {TranslatePipe} from "@ngx-translate/core";

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
        TranslatePipe,
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    isMobile = false;
    isCollapsed = false;
    profile = signal<IProfile>({
        id: -1,
        username: '',
        email: '',
        avatar: ''
    });
    readonly PAGE_LIST = PAGE_LIST;
    cookieStorageService = inject(CookieStorageService);
    router = inject(Router);
    route = inject(ActivatedRoute)
    destroyRef = inject(DestroyRef);

    constructor(
        private observer: BreakpointObserver,
        private store: Store<{ profile: IProfile }>,
    ) {
        this.profile$ = this.store.select(selectProfile);
    }

    profile$: Observable<IProfile>

    ngOnInit() {
        this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
            this.isMobile = screenSize.matches;
        });
        this.store.dispatch({type: '[Profile] Init'});
        const profileSubs = this.profile$.subscribe((profile) => {
            this.profile.set(profile);
        })
        this.destroyRef.onDestroy(() => {
            profileSubs.unsubscribe();
        });
    }

    toggleMenu(accountMenuRef: MatExpansionPanel) {
        accountMenuRef.close()
        if (this.isMobile) {
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

    navigateSettings() {
        this.router.navigate(['/main/settings']);
    }

    navigateTo(path: string) {
        if (path === 'buckets') {
            this.router.navigate([path], { relativeTo: this.route, queryParams: {
                    page: 1,
                } });
            return;
        }
        this.router.navigate([path], { relativeTo: this.route });
    }
}
