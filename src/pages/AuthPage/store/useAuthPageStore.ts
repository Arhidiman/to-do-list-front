import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import axios from "axios";
import {notification} from "antd";
import {BASE_URL} from "@/common/constants/baseUrl.ts";
import {USERS_URL} from "@/pages/AuthPage/constants/urls.ts";
import type {NavigateFunction} from "react-router-dom";
import {routes} from "@/common/constants/routes.ts";
import {saveToLocalStorage} from "@/common/lib/saveToLocalStorage.ts";

export interface IAuthPageStore {
    isAuth: boolean,
    isSignedIn: boolean,
    currentUser: IUser,
    switchAuthReg: () => void,
    signUpNewUser: (user: IUser) => void,
    signIn: (user: IUser, navigate: NavigateFunction) => void,
    setUserName: (name: string) => void,
    setUserPassword: (name: string) => void
}

interface IUser {
    name: string,
    password: string,
    _id: string
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
            const response = await axios.post(BASE_URL+USERS_URL, user)
            saveToLocalStorage('name', response.data.name)
            saveToLocalStorage('_id', response.data._id)
            console.log(response)
            notification.success({
                message: 'User successfully signed up'
            })
            return {
                isSignedIn: true
            }
        } catch (error) {
            if(axios.isAxiosError(error)) {
                notification.error({
                    message: error.message
                })
            }
        }
    },
    signIn: async (user: IUser, navigate: NavigateFunction) => {
        try {
            const response = await axios.get(BASE_URL+USERS_URL, {params: user})
            saveToLocalStorage('name', response.data.name)
            saveToLocalStorage('_id', response.data._id)
            navigate(routes.todos)
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