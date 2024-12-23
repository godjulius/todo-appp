import {createReducer, on} from '@ngrx/store';
import {setAvatar, updateProfile} from './user.action';
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
    on(setAvatar, (state: IProfile, avatar) => {
        return setAvatarReducer(state, avatar);
    }),
);

function updateProfileReducer(currentProfile: IProfile, newProfile: IProfile) {
    return {...newProfile, avatar: ''};
}

function setAvatarReducer(currentProfile: IProfile, avatarObj: { avatar: string }) {
    return {...currentProfile, avatar: avatarObj.avatar};
}
