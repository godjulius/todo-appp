import { createSelector } from "@ngrx/store";
import {IProfile} from "../shared/services/account.service";

export const selectProfile = (state: { profile: IProfile }) => state.profile;

export const selectProfileId = createSelector(selectProfile, (profile: IProfile) => profile.id);

export const selectProfileUsername = createSelector(selectProfile, (profile: IProfile) => profile.username);

export const selectProfileEmail = createSelector(selectProfile, (profile: IProfile) => profile.email);

export const selectProfileAvatar = createSelector(selectProfile, (profile: IProfile) => profile.avatar);
