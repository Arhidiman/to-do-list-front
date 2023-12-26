import {Input} from "antd";
import {useToDoStore} from "../../store/useToDoStore.tsx";
import ActionButton from "../ActionButton/ActionButton.tsx";
import type {TToDoItem} from "../../store/useToDoStore.tsx";
import type {SyntheticEvent} from "react";
import './ToDoItem.scss'

function ToDoItem({id, name, editMode}: TToDoItem) {

    const {
        toDoItems,
        inputText,
        deleteTodo,
        setInputItemText,
        setEditTodoMode,
        disableTodo,
        completeTodo
    } = useToDoStore()

    const setItemText = (e: SyntheticEvent<HTMLInputElement>, id: number) => {
        setInputItemText((e.target as HTMLInputElement).value, id)
    }

    const getActionHandler = (editMode: boolean) => {
        switch (editMode) {
            case true: return () => disableTodo(id)
            case false: return () => setEditTodoMode(id)
        }
    }
    const getActionType = (editMode: boolean) => {
        switch (editMode) {
            case true: return 'check'
            case false: return 'edit'
        }
    }
    const deleteToDoItem = () => deleteTodo(id)

    console.log(inputText, toDoItems)

    return (
        <div key={id} className='to-do-item'>
                <Input
                    onChange={(e) => setItemText(e, id)}
                    value={name}
                    disabled={!editMode}
                />
                <div className='task-actions'>
                    <ActionButton actionHandler={() => completeTodo(id)} type='complete'/>
                    <ActionButton actionHandler={getActionHandler(editMode)} type={getActionType(editMode)}/>
                    <ActionButton actionHandler={deleteToDoItem} type='delete'/>
                </div>
        </div>
    )

}

export default ToDoItem
