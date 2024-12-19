import { createReducer, on } from '@ngrx/store';
import { updateProfile } from './user.action';
import {IProfile} from "../shared/services/account.service";

export const initialState: IProfile = {
  id: -1,
  username: '',
  email: '',
  avatar: ''
};

export const profileReducer = createReducer(
  initialState,
  on(updateProfile, (state: IProfile, profile: IProfile) => {
    return updateProfileReducer(state, profile);
  }),
);

function updateProfileReducer(currentProfile: IProfile ,newProfile: IProfile) {
    console.log('Current Profile', currentProfile);
    console.log('New Profile', newProfile);
  return newProfile;
}

