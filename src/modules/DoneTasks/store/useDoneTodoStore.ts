import {create} from 'zustand'
import axios from "axios";
import {notification} from "antd";
import {devtools} from "zustand/middleware";
import {BASE_URL} from "@/baseUrl.ts";
import {DONE_TODOS_URL} from "@/modules/DoneTasks/constants/urls.ts";

export type TDoneTodoItem = {
    _id: string,
    text: string,
}

export interface IDoneTodoStore {
    doneTodos: TDoneTodoItem[],
    deleteTodo: (_id: string) => void,
    createDoneTodo: (text: string) => void,
    getAllDoneTodos: () => void,
    deleteDoneTodoById: (_id: string) => void
}

export const useDoneToDoStore = create(devtools<IDoneTodoStore>((set) => ({
    doneTodos: [],
    deleteTodo: (_id: string) => set((state: IDoneTodoStore) => (
        {doneTodos: state.doneTodos.filter((item: TDoneTodoItem) => item._id !== _id)}
    )),
    createDoneTodo: async (text: string) => {
        console.log('CREATE DONE TODO!!!!')
        try {
            const todo = await axios.post(BASE_URL+DONE_TODOS_URL, {author: 'Dimon', text: text})
            set((state: IDoneTodoStore) => {
                return {
                    doneTodos: [...state.doneTodos, {text: todo.data.text, _id: todo.data._id}]
                }
            })
            notification.success({
                message: 'Todo completed successfully'
            })

        } catch (error) {
            if(axios.isAxiosError(error)) {
                notification.error({
                    message: error.message
                })
            }

        }
    },
    getAllDoneTodos: async () => {
        const todos = await axios(BASE_URL+DONE_TODOS_URL)
        set({
            doneTodos: todos.data.map((todo: TDoneTodoItem) => {
                return {...todo, editMode: false}
            })
        })
    },
    deleteDoneTodoById: async (_id: string) => {
        console.log(_id)
        try {
            const data = await axios.delete(`${BASE_URL+DONE_TODOS_URL}/${_id}`)
            set((state: IDoneTodoStore) => (
                {doneTodos: state.doneTodos.filter((item: TDoneTodoItem) => item._id !== _id)}
            ))
            notification.success({
                message: data.data
            })
        } catch (error) {
            if(axios.isAxiosError(error)) {
                notification.error({
                    message: error.message
                })
            }
        }
    }
})))
