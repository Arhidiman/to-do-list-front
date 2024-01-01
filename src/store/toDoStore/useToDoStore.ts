import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {generateId} from "../../lib/generateId.ts"
import axios from "axios";
import {BASE_URL, TODOS_URL} from "../../constants/urls.ts";

export type TToDoItem = {
    _id: number,
    text: string,
    editMode: boolean
}

interface ITodoStore {
    inputText: string,
    toDoItems: TToDoItem[] | [],
    doneTodos: TToDoItem[],
    deleteTodo: (_id: number) => void,
    setInputText: (text: string) => void
    createTodo: (inputText: string) => void,
    setEditTodoMode: (_id: number) => void,
    disableTodo: (_id: number) => void,
    setInputItemText: (text: string, _id: number) => void,
    completeTodo: (_id: number) => void,
    getAllTodos: () => void
}

export const useToDoStore = create(devtools<ITodoStore>((set, get) => ({
    inputText: '',
    toDoItems: [],
    doneTodos: [],
    deleteTodo: (_id: number) => set((state: ITodoStore) => (
        {toDoItems: state.toDoItems.filter((item: TToDoItem) => item._id !== _id)}
    )),
    setInputText: (text: string) => set(() => (
        {inputText: text}
    )),
    setInputItemText: (text: string, _id: number) => set((state: ITodoStore) => (
        {
            toDoItems: state.toDoItems.map((item: TToDoItem) => (
                item._id !== _id
                    ? item
                    : {...item, text: text}
            ))
        }
    )),
    createTodo: (inputText: string) => set((state: ITodoStore) => (
        {
            toDoItems: inputText ? [...state.toDoItems, {_id: generateId(), text: inputText, editMode: false}] : state.toDoItems,
            inputText: ''
        }
    )),
    setEditTodoMode: (_id: number) => set((state: ITodoStore) => {
        console.log(_id)
        return {
            toDoItems: state.toDoItems.map((item: TToDoItem) => (
                item._id !== _id
                    ? {...item, editMode: false}
                    : {...item, editMode: true}
            ))
        }
    }),
    disableTodo: (_id: number) => set((state: ITodoStore) => ({
        toDoItems: state.toDoItems.map((item: TToDoItem) => (
            item._id !== _id
            ? item
            : {...item, editMode: false}
        ))
    })),
    completeTodo: (_id: number) => {
        const {deleteTodo, toDoItems} = get()
        const completedTodo = toDoItems.find((item: TToDoItem) => item._id === _id)
        set((state: ITodoStore) => (
            {
                doneTodos: completedTodo ? [...state.doneTodos, completedTodo] : [...state.doneTodos]
            }
        ))
        deleteTodo(_id)
    },
    getAllTodos: async () => {
        const todos = await axios(BASE_URL+TODOS_URL)
        set({
            toDoItems: todos.data.map((todo: TToDoItem) => {
                return {...todo, editMode: false}
            })
        })
    }
})))
