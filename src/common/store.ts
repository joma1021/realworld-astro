import { atom } from "nanostores";

export const isFollowingStore = atom(false);

export const favoriteStore = atom({ favorite: false, favoritesCount: 0 });
