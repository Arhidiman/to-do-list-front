import {generateId} from "../../lib/generateId.ts";

export const initialState = [
    {
        id: generateId(),
        text: "task 1",
        editMode: false
    },
    {
        id: generateId(),
        text: "task 2",
        editMode: false
    },
    {
        id: generateId(),
        text: "task 3",
        editMode: false
    },
    {
        id: generateId(),
        text: "task 4",
        editMode: false
    },
    {
        id: generateId(),
        text: "task 5",
        editMode: false
    }
]
