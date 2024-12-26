import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {CommonButtonComponent} from "../../shared/common-button/common-button.component";
import { MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-welcome',
  standalone: true,
    imports: [CommonModule, RouterModule, TranslatePipe, CommonButtonComponent, MatIconModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
    router = inject(Router);
    createBucket() {
        this.router.navigate(['/bucket']);
    }
}
