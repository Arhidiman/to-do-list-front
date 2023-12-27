import {Input} from "antd";
import {useToDoStore} from "../../store/toDoStore/useToDoStore.ts";
import { useShallow } from 'zustand/react/shallow'
import ToDoItem from "../ToDoItem/ToDoItem.tsx";
import ActionButton from "../ActionButton/ActionButton.tsx";
import type {TToDoItem} from "../../store/toDoStore/useToDoStore.ts";
import type {SyntheticEvent} from "react";
import "./CurrentTasks.scss"

function CurrentTasks() {
    console.log("CURRENT tasks render")

    const {
        toDoItems,
        inputText,
        setInputText,
        createTodo,
    } = useToDoStore(
        useShallow((state) => ({
            toDoItems: state.toDoItems,
            inputText: state.inputText,
            setInputText: state.setInputText,
            createTodo: state.createTodo,
        }))
    )

    const setCurrentText = (e: SyntheticEvent<HTMLInputElement>) => {
        setInputText((e.target as HTMLInputElement).value)
    }

    const toDoItem = (item: TToDoItem) => {
        return <ToDoItem id={item.id} name={item.name} editMode={item.editMode}/>
    }

    return (
        <div>
            <h2 className='current-tasks__title'>Tasks to do</h2>
            <div className='current-tasks'>
                <div className='current-tasks__create'>
                    <Input onChange={setCurrentText} placeholder='Введите задачу' value={inputText}/>
                    <ActionButton actionHandler={() => createTodo(inputText)} type='add'/>
                </div>
                {toDoItems.map(toDoItem)}
            </div>
        </div>
    )
}

export default CurrentTasks
