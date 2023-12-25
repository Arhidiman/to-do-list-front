import "./CurrentTasks.scss"
import {PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {useToDoStore} from "../../store/useToDoStore.tsx";
import type {TToDoItem} from "../../store/useToDoStore.tsx";
import {SyntheticEvent} from "react";

function CurrentTasks() {

    const {
        toDoItems,
        inputText,
        deleteTodo,
        setInputText,
        setInputItemText,
        createTodo,
        setEditTodoMode,
        disableTodo
    } = useToDoStore()

    const setCurrentText = (e: SyntheticEvent<HTMLInputElement>) => {
        setInputText((e.target as HTMLInputElement).value)
    }
    const setItemText = (e: SyntheticEvent<HTMLInputElement>, id: number) => {
        setInputItemText((e.target as HTMLInputElement).value, id)
    }

    console.log(inputText, toDoItems)
    const toDoItem = (item: TToDoItem) => {
        return <div key={item.id} className='current-tasks__item'>
            <Input
                onChange={(e) => setItemText(e, item.id)}
                value={item.name}
                disabled={!item.editMode}
            />
            <div className='task-actions'>
                <Button
                    onClick={item.editMode ? () => disableTodo(item.id) : () => setEditTodoMode(item.id)}
                >
                    {
                        !item.editMode ? <EditOutlined/> : <CheckOutlined/>
                    }
                </Button>
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
