import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import axios from "axios";
import {notification} from "antd";
import {TODOS_URL, USER_TODOS_TODOS_URL} from "@/modules/CurrentTasks/constants/urls.ts";
import {BASE_URL} from "@/common/constants/baseUrl.ts";

export type TToDoItem = {
    _id: string,
    text: string,
    editMode: boolean,
}

interface ITodoStore {
    inputText: string,
    toDoItems: TToDoItem[] | [],
    setInputText: (text: string) => void
    createTodo: (inputText: string, userName: string, userId: string) => void,
    setEditTodoMode: (_id: string) => void,
    disableAndUpdateTodo: (_id: string, text: string) => void,
    setInputItemText: (text: string, _id: string) => void,
    getAllTodos: (userId: string) => void,
    deleteTodoById: (_id: string, message: boolean) => void
}

export const useToDoStore = create(devtools<ITodoStore>((set) => ({
    inputText: '',
    toDoItems: [],
    setInputText: (text: string) => set(() => (
        {inputText: text}
    )),
    setInputItemText: (text: string, _id: string) => set((state: ITodoStore) => (
        {
            toDoItems: state.toDoItems.map((item: TToDoItem) => (
                item._id !== _id
                    ? item
                    : {...item, text}
            ))
        }
    )),
    createTodo: async (inputText: string, userName: string, userId: string) => {
        try {
            const todo = await axios.post(BASE_URL+TODOS_URL, {author: userName, text: inputText, userId})
            set((state: ITodoStore) => {
                return {
                    toDoItems: inputText ? [...state.toDoItems, {text: inputText, _id: todo.data._id, editMode: false}] : state.toDoItems,
                    inputText: ''
                }
            })
            notification.success({
                message: 'New todo created successfully'
            })

        } catch (error) {
            if(axios.isAxiosError(error)) {
                notification.error({
                    message: error.message
                })
            }

        }
    },
    setEditTodoMode: (_id: string) => set((state: ITodoStore) => {
        console.log(_id)
        return {
            toDoItems: state.toDoItems.map((item: TToDoItem) => (
                item._id !== _id
                    ? {...item, editMode: false}
                    : {...item, editMode: true}
            ))
        }
    }),
    disableAndUpdateTodo: async (_id: string, text: string) => {
        try {
            const data = await axios.put(BASE_URL+TODOS_URL, {_id: _id, text: text})
            set((state: ITodoStore) => {
                return {
                    toDoItems: state.toDoItems.map((item: TToDoItem) => (
                        item._id !== _id
                            ? item
                            : {...item, editMode: false}
                    ))
                }
            })
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
    },
    getAllTodos: async (userId: string) => {
        console.log(BASE_URL+USER_TODOS_TODOS_URL)
        const todos = await axios.get(`${BASE_URL+USER_TODOS_TODOS_URL}?userId=${userId}`)
        set({
            toDoItems: todos.data.map((todo: TToDoItem) => {
                return {...todo, editMode: false}
            })
        })
    },
    deleteTodoById: async (_id: string, message: boolean) => {
        console.log(_id)
        try {
            const data = await axios.delete(`${BASE_URL+TODOS_URL}/${_id}`)
            set((state: ITodoStore) => (
                {toDoItems: state.toDoItems.filter((item: TToDoItem) => item._id !== _id)}
            ))
            message && notification.success({
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
