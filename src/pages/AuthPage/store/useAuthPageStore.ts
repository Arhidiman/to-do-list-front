import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import axios from "axios";
import {notification} from "antd";
import {BASE_URL} from "@/baseUrl.ts";
import {USERS_URL} from "@/pages/AuthPage/constants/urls.ts";

export interface IAuthPageStore {
    isAuth: boolean,
    isSignedIn: boolean,
    currentUser: IUser,
    switchAuthReg: () => void
    signUpNewUser: (user: IUser) => void
    setUserName: (name: string) => void
}

interface IUser {
    name: string,
    password: string
}

export const useAuthPageStore = create(devtools<IAuthPageStore>((set) => ({
    isAuth: false,
    isSignedIn: false,
    currentUser: {} as IUser,
    switchAuthReg: () => set((state: IAuthPageStore) => ({
        isAuth: !state.isAuth
    })),
    signUpNewUser: async (user: IUser) => {
        try {
            await axios.post(BASE_URL+USERS_URL, user)
            notification.success({
                message: 'User successfully signed up'
            })

        } catch (error) {
            if(axios.isAxiosError(error)) {
                notification.success({
                    message: error.message
                })
            }
        }
        return {
            isSignedIn: true
        }
    },
    setUserName: (name: string) => set((state: IAuthPageStore) => ({
        ...state,
        currentUser: {
            ...state.currentUser,
            name
        }
    }))
})))