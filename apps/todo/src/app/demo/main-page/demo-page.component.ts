import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {BaseComponent} from "../../core/base.component";
import {CommonButtonComponent} from "../../shared/common-button/common-button.component";

@Component({
    selector: 'app-demo-page',
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
        CommonButtonComponent,
    ],
    templateUrl: './demo-page.component.html',
    styleUrl: './demo-page.component.scss',
})
export class DemoPageComponent extends BaseComponent implements OnInit {
    @ViewChild(MatSidenav)  sidenav!: MatSidenav;
    isMobile = false;
    isCollapsed = false;
    router = inject(Router);
    route = inject(ActivatedRoute)
    PAGE_LIST: any[] = [
        {
            languageKey: 'Button',
            path: 'button',
            icon: 'home',
        },
        {
            languageKey: 'Input',
            path: 'input',
            icon: 'home',
        },
        {
            languageKey: 'counter',
            path: 'counter',
            icon: 'watch',
        }
    ]
    constructor(
        private observer: BreakpointObserver,
    ) {
        super()
    }

    ngOnInit() {
        this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
            this.isMobile = screenSize.matches;
        });
    }

    toggleMenu() {
        if (this.isMobile) {
            this.sidenav.toggle();
            this.isCollapsed = false; // On mobile, the menu can never be collapsed
        } else {
            this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
            this.isCollapsed = !this.isCollapsed;
        }
    }


    navigateTo(path: string) {
        console.log(path)
        this.router.navigate([path], {relativeTo: this.route});
    }
}
