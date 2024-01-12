import {create} from 'zustand'
import {devtools} from "zustand/middleware";

export type TDoneTodoItem = {
    _id: string,
    text: string,
}

export interface IAuthPageStore {
    isAuth: boolean,
    switchAuthReg: () => void
}

export const useAuthPageStore = create(devtools<IAuthPageStore>((set) => ({
    isAuth: false,
    switchAuthReg: () => set((state: IAuthPageStore) => ({
        isAuth: !state.isAuth
    }))
})))