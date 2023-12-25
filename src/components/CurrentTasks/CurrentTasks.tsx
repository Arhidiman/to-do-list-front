import "./CurrentTasks.scss"
import {PlusOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {useToDoStore} from "../../store/useToDoStore.tsx";
import {todoItem} from "../../store/useToDoStore.tsx";

function CurrentTasks() {

    const {toDoItems, deleteTodo} = useToDoStore()

    console.log(toDoItems)
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
                <Input placeholder='Введите задачу'></Input>
                <Button><PlusOutlined/></Button>
            </div>
            {toDoItems.map(toDoItem)}
        </div>
    )
}

export default CurrentTasks
