import {create} from 'zustand'
import {generateId} from "../lib/generateId.ts"

export type todoItem = {
    id: number,
    name: string
}

interface ITodoStore {
    toDoItems: todoItem[],
    deleteTodo: (id: number) => void
}

export const useToDoStore = create<ITodoStore>((set) => ({
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
    deleteTodo: (id: number) => set((state: ITodoStore) => ({toDoItems: state.toDoItems.filter((item: todoItem) => item.id !== id)}))
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
