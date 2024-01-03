
import {useEffect} from "react";
import DoneToDo from "@/components/DoneToDo/DoneToDo.tsx"
import ActionButton from "@/UI/ActionButton/ActionButton.tsx";
import {useDoneToDoStore} from "@/modules/DoneTasks/store/useDoneTodoStore.ts";
import type {TDoneTodoItem} from "@/modules/DoneTasks/store/useDoneTodoStore.ts";
import './DoneTasks.scss'

export function DoneTasks() {
    console.log("DONE tasks render")

    const {
        doneTodos,
        getAllDoneTodos,
        deleteAllDoneTodos
    } = useDoneToDoStore()
    const doneTodo = (todo: TDoneTodoItem) => {
        return (
            <DoneToDo key={todo._id} text={todo.text}/>
        )
    }

    useEffect(() => {
        getAllDoneTodos()
    }, []);

    return (
        <div>
            <h2 className='done-tasks__title'>Done tasks</h2>
            <div className='done-tasks'>
                <ActionButton
                    className='clear-done-tasks'
                    text='Clear all'
                    actionHandler={() => deleteAllDoneTodos()}
                    type='delete'
                />
                {doneTodos.map(doneTodo)}
            </div>
        </div>

    )
}