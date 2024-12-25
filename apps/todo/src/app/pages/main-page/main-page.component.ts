import {AfterViewInit, Component, inject, OnInit, signal, ViewChild} from '@angular/core';
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
import {finalize, Observable} from "rxjs";
import {AccountService, IProfile} from "../../shared/services/account.service";
import {selectProfile} from "../../store/user.selector";
import {TranslatePipe} from "@ngx-translate/core";
import {setAvatar} from "../../store/user.action";
import {BaseComponent} from "../../core/base.component";

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
export class MainPageComponent extends BaseComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSidenav)  sidenav!: MatSidenav;
    @ViewChild(MatExpansionPanel) accountMenuRef!: MatExpansionPanel;
    isMobile = false;
    isCollapsed = false;
    profile = signal<IProfile>({
        id: -1,
        username: '',
        email: '',
        avatar: null
    });
    readonly PAGE_LIST = PAGE_LIST;
    cookieStorageService = inject(CookieStorageService);
    router = inject(Router);
    route = inject(ActivatedRoute)
    accountService = inject(AccountService);

    constructor(
        private observer: BreakpointObserver,
        private store: Store<{ profile: IProfile }>,
    ) {
        super()
        this.profile$ = this.store.select(selectProfile);
    }

    profile$: Observable<IProfile>

    ngOnInit() {
        this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
            this.isMobile = screenSize.matches;
        });
        this.getProfile()
    }

    ngAfterViewInit() {
        this.accountMenuRef.open();
    }

    getProfile() {
        this.store.dispatch({type: '[Profile] Init'});
        this.loadingService.startLoading();
        const avatarSubs = this.accountService.getAvatar()
            .pipe(
                finalize(() => {
                    this.loadingService.stopLoading();
                })
            )
            .subscribe((avatar) => {
                this.store.dispatch(setAvatar({avatar: avatar}))
            });
        this.destroyRef.onDestroy(() => {
            avatarSubs.unsubscribe();
        })
        const profileSubs = this.profile$.subscribe((profile) => {
            this.profile.set(profile);
            if (profile.avatar === '') {
                this.accountService.getAvatar()
                    .pipe(
                        finalize(() => {
                            this.loadingService.stopLoading();
                        })
                    )
                    .subscribe((avatar) => {
                        this.store.dispatch(setAvatar({avatar: avatar}))
                    });
            }
        })
        this.destroyRef.onDestroy(() => {
            profileSubs.unsubscribe();
        });
    }

    toggleMenu(accountMenuRef: MatExpansionPanel) {
        if (this.isMobile) {
            this.sidenav.toggle();
            this.isCollapsed = false; // On mobile, the menu can never be collapsed
        } else {
            this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
            this.isCollapsed = !this.isCollapsed;
        }
        if (this.isCollapsed) {
            accountMenuRef.close()
        } else {
            accountMenuRef.open()
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
            this.router.navigate([path], {
                relativeTo: this.route, queryParams: {
                    page: 1,
                }
            });
            return;
        }
        this.router.navigate([path], {relativeTo: this.route});
    }
}
