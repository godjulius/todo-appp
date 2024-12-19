import {Actions, createEffect, ofType} from '@ngrx/effects';
import {updateProfile, initProfile} from './user.action';
import {finalize, map, switchMap, tap, withLatestFrom} from 'rxjs';
import {DestroyRef, inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectProfile} from './user.selector';
import {AccountService, IProfile} from "../shared/services/account.service";
import {LoadingService} from "../shared/app-loading/loading.service";

@Injectable()
export class ProfileEffects {
    accountService = inject(AccountService);
    loadingService = inject(LoadingService)
    destroyRef = inject(DestroyRef)
    loadAccount = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(initProfile),
                switchMap(() => {
                    this.loadingService.startLoading()

                    return this.accountService.getProfile().pipe(
                        map((profile: any) => updateProfile(profile)),
                        finalize(() => {
                            this.loadingService.stopLoading();
                        })
                    );
                }),
            )
    })

    // updateProfile = createEffect(
    //     () => {
    //         return this.actions$.pipe(
    //             ofType(updateProfile),
    //             withLatestFrom(this.store.select(selectProfile)),
    //             tap(([action, profile]) => {
    //                 console.log('Action', action);
    //                 console.log('Profile', profile);
    //                 //Todo: call api update profile
    //
    //             })
    //         );
    //     },
    //     {dispatch: false}
    // );

    constructor(private actions$: Actions, private store: Store<{ profile: IProfile }>) {
    }

}
