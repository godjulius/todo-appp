import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountService} from "../../shared/services/account.service";
import {finalize} from "rxjs";
import {LoadingService} from "../../shared/app-loading/loading.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  accountService = inject(AccountService);
  destroyRef = inject(DestroyRef)
  loadingService = inject(LoadingService)
  constructor() {
  }

  ngOnInit() {

  }

  getProfile() {
    this.loadingService.startLoading()
    const profileSubs = this.accountService.getProfile()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading()
        })
      )
        .subscribe((res) => {
          if (res) {
            console.log(res)
          }
        })
    this.destroyRef.onDestroy(() => {
      profileSubs.unsubscribe()
    })
  }
}
