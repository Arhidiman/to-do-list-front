import {useEffect, useState} from "react"
import {Input} from "antd";
import {useToDoStore} from "../store/useToDoStore.ts";
import { useShallow } from 'zustand/react/shallow'
import ToDoItem from "../../../components/ToDoItem/ToDoItem.tsx";
import ActionButton from "@/UI/ActionButton/ActionButton.tsx";
import Modal from "@/components/Modal/Modal.tsx";
import type {TToDoItem} from "../store/useToDoStore.ts";
import type {SyntheticEvent} from "react";
import "./CurrentTasks.scss"

export function CurrentTasks() {

    const {
        toDoItems,
        inputText,
        setInputText,
        createTodo,
        getAllTodos,
        deleteTodoById
    } = useToDoStore(
        useShallow((state) => ({
            toDoItems: state.toDoItems,
            inputText: state.inputText,
            setInputText: state.setInputText,
            createTodo: state.createTodo,
            getAllTodos: state.getAllTodos,
            deleteTodoById: state.deleteTodoById,
        }))
    )

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [todoId, setTodoId] = useState<string>('')
    const setCurrentText = (e: SyntheticEvent<HTMLInputElement>) => {
        setInputText((e.target as HTMLInputElement).value)
    }

    const confirmDeleteHandler = (_id: string) => {
        setIsModalOpen(true)
        setTodoId(_id)
    }

    const deleteTodo = () => {
        deleteTodoById(todoId, true)
        setIsModalOpen(false)
    }

    const toDoItem = (item: TToDoItem) => {
        return <ToDoItem
            _id={item._id}
            text={item.text}
            editMode={item.editMode}
            confirmDeletion={() => confirmDeleteHandler(item._id)}
        />
    }

    useEffect(() => {
        getAllTodos()
    }, [])

    console.log('toDoItems', toDoItems)

    return (
        <>
            <div>
                <h2 className='current-tasks__title'>Tasks to do</h2>
                <div className='current-tasks'>
                    <div className='current-tasks__create'>
                        <Input onChange={setCurrentText} placeholder='Введите задачу' value={inputText}/>
                        <ActionButton actionHandler={() => createTodo(inputText)} type='add'/>
                    </div>
                    {toDoItems && toDoItems.map(toDoItem)}
                </div>
            </div>
            <Modal
                confirmHandler={deleteTodo}
                cancelHandler={() => setIsModalOpen(false)}
                title={'Подтвердите удаление задачи'}
                isOpen={isModalOpen}
            />
        </>

    )
}