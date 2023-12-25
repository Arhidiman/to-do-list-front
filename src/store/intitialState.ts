import {generateId} from "../lib/generateId.ts";

export const initialState = [
    {
        id: generateId(),
        name: "task 1",
        editMode: false
    },
    {
        id: generateId(),
        name: "task 2",
        editMode: false
    },
    {
        id: generateId(),
        name: "task 3",
        editMode: false
    },
    {
        id: generateId(),
        name: "task 4",
        editMode: false
    },
    {
        id: generateId(),
        name: "task 5",
        editMode: false
    }
]
