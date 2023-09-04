import { atom } from "nanostores";
import type { UserSessionData } from "../models/user";

export const userSessionStore = atom<UserSessionData | null>(null);
