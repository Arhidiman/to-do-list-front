import {create} from 'zustand'
import {generateId} from "../lib/generateId.ts"
import {initialState} from "./intitialState.ts";

export type TToDoItem = {
    id: number,
    name: string,
    editMode: boolean
}

interface ITodoStore {
    inputText: string,
    toDoItems: TToDoItem[],
    deleteTodo: (id: number) => void,
    setInputText: (text: string) => void
    createTodo: (inputText: string) => void,
    setEditTodoMode: (id: number) => void,
    disableTodo: (id: number) => void,
    setInputItemText: (text: string, id: number) => void
}

export const useToDoStore = create<ITodoStore>((set) => ({
    inputText: '',
    toDoItems: initialState,
    deleteTodo: (id: number) => set((state: ITodoStore) => (
        {toDoItems: state.toDoItems.filter((item: TToDoItem) => item.id !== id)}
    )),
    setInputText: (text: string) => set(() => (
        {inputText: text}
    )),
    setInputItemText: (text: string, id: number) => set((state: ITodoStore) => (
        {
            toDoItems: state.toDoItems.map((item: TToDoItem) => (
                item.id !== id
                    ? item
                    : {...item, name: text}
            ))
        }
    )),
    createTodo: (inputText: string) => set((state: ITodoStore) => (
        {
            toDoItems: inputText ? [...state.toDoItems, {id: generateId(), name: inputText, editMode: false}] : state.toDoItems,
            inputText: ''
        }
    )),
    setEditTodoMode: (id: number) => set((state: ITodoStore) => (
        {
            toDoItems: state.toDoItems.map((item: TToDoItem) => (
                item.id !== id
                ? {...item, editMode: false}
                : {...item, editMode: true}
            ))
        }
    )),
    disableTodo: (id: number) => set((state: ITodoStore) => ({
        toDoItems: state.toDoItems.map((item: TToDoItem) => (
            item.id !== id
            ? item
            : {...item, editMode: false}
        ))
    }))
}))
