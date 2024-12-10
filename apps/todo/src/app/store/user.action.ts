import {createAction, props} from '@ngrx/store';
import {IProfile} from "../shared/services/account.service";


export const initProfile = createAction('[Profile] Init');
export const updateProfile = createAction('[Profile] Update', props<IProfile>());
