import {create} from 'zustand'
import {generateId} from "../lib/generateId.ts"

export type todoItem = {
    id: number,
    name: string
}

interface ITodoStore {
    inputText: string,
    toDoItems: todoItem[],
    deleteTodo: (id: number) => void,
    setInputText: (text: string) => void
    createTodo: (inputText: string) => void
}

export const useToDoStore = create<ITodoStore>((set) => ({
    inputText: '',
    toDoItems: [
        {
            id: generateId(),
            name: "task 1"
        },
        {
            id: generateId(),
            name: "task 2"
        },
        {
            id: generateId(),
            name: "task 3"
        },
        {
            id: generateId(),
            name: "task 4"
        },
        {
            id: generateId(),
            name: "task 5"
        }
    ],
    deleteTodo: (id: number) => set((state: ITodoStore) => ({toDoItems: state.toDoItems.filter((item: todoItem) => item.id !== id)})),
    setInputText: (text: string) => set(() => ({inputText: text})),
    createTodo: (inputText: string) => set((state: ITodoStore) => (
        {
            toDoItems: inputText ? [...state.toDoItems, {id: generateId(), name: inputText}] : state.toDoItems,
            inputText: ''
        }
    ))
}))


// todoItems: [
//     {
//         id: generateId(),
//         name: "task 1"
//     },
//     {
//         id: generateId(),
//         name: "task 1"
//     },
//     {
//         id: generateId(),
//         name: "task 1"
//     },
//     {
//         id: generateId(),
//         name: "task 1"
//     },
//     {
//         id: generateId(),
//         name: "task 1"
//     }
// ]
