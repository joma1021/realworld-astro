import { atom } from "nanostores";
import type { UserSessionData } from "../models/user";

export const isFollowingStore = atom(false);

export const favoriteStore = atom({ favorite: false, favoritesCount: 0 });
