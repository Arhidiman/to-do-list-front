import "./CurrentTasks.scss"
import {PlusOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {useToDoStore} from "../../store/useToDoStore.tsx";
import type {todoItem} from "../../store/useToDoStore.tsx";
import {SyntheticEvent} from "react";

function CurrentTasks() {

    const {toDoItems, deleteTodo, setInputText, createTodo, inputText} = useToDoStore()

    const setCurrentText = (e: SyntheticEvent<HTMLInputElement>) => {
        setInputText((e.target as HTMLInputElement).value)
    }

    console.log(inputText)
    const toDoItem = (item: todoItem) => {
        return <div key={item.id} className='current-tasks__item'>
            <span>{item.name}</span>
            <div className='task-actions'>
                <Button><EditOutlined/></Button>
                <Button onClick={() => deleteTodo(item.id)}><DeleteOutlined/></Button>
            </div>
        </div>
    }

    return (
        <div className='current-tasks'>
            <div className='current-tasks__create'>
                <Input onChange={setCurrentText} placeholder='Введите задачу' value={inputText}/>
                <Button onClick={() => createTodo(inputText)}><PlusOutlined/></Button>
            </div>
            {toDoItems.map(toDoItem)}
        </div>
    )
}

export default CurrentTasks
