import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import axios from "axios";
import {notification} from "antd";
import {BASE_URL} from "@/constants/baseUrl.ts";
import {USERS_URL} from "@/pages/AuthPage/constants/urls.ts";
import {routes} from "@/constants/routes.ts";

export interface IAuthPageStore {
    isAuth: boolean,
    isSignedIn: boolean,
    currentUser: IUser,
    switchAuthReg: () => void,
    signUpNewUser: (user: IUser) => void,
    signIn: (user: IUser) => void,
    setUserName: (name: string) => void,
    setUserPassword: (name: string) => void
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
                notification.error({
                    message: error.message
                })
            }
        }
        return {
            isSignedIn: true
        }
    },
    signIn: async (user: IUser) => {
        try {
            const response = await axios.get(BASE_URL+USERS_URL, {params: user})
            console.log(response)
            window.location.href = 'http://localhost:5173/todos'
            notification.success({
                message: 'User successfully signed in'
            })
        } catch (error) {
            if(axios.isAxiosError(error)) {
                notification.error({
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
    })),
    setUserPassword: (password: string) => set((state: IAuthPageStore) => ({
        ...state,
        currentUser: {
            ...state.currentUser,
            password
        }
    }))
})))