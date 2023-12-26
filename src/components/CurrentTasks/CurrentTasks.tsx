import {Input} from "antd";
import {useToDoStore} from "../../store/useToDoStore.tsx";
import ToDoItem from "../ToDoItem/ToDoItem.tsx";
import ActionButton from "../ActionButton/ActionButton.tsx";
import type {TToDoItem} from "../../store/useToDoStore.tsx";
import type {SyntheticEvent} from "react";
import "./CurrentTasks.scss"

function CurrentTasks() {

    const {
        toDoItems,
        inputText,
        setInputText,
        createTodo,
    } = useToDoStore()

    const setCurrentText = (e: SyntheticEvent<HTMLInputElement>) => {
        setInputText((e.target as HTMLInputElement).value)
    }

    console.log(inputText, toDoItems)
    const toDoItem = (item: TToDoItem) => {
        return <ToDoItem id={item.id} name={item.name} editMode={item.editMode}/>
    }

    return (
        <div className='current-tasks'>
            <div className='current-tasks__create'>
                <Input onChange={setCurrentText} placeholder='Введите задачу' value={inputText}/>
                <ActionButton actionHandler={() => createTodo(inputText)} type='add'/>
            </div>
            {toDoItems.map(toDoItem)}
        </div>
    )
}

export default CurrentTasks
