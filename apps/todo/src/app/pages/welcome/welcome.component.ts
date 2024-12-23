import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
    router = inject(Router);
    createBucket() {
        this.router.navigate(['/bucket']);
    }
}
