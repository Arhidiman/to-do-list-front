
import {useDoneToDoStore} from "@/modules/DoneTasks/store/useDoneTodoStore.ts";
import DoneToDo from "../../../components/DoneToDo/DoneToDo.tsx"
import {useEffect} from "react";
import {TDoneTodoItem} from "@/modules/DoneTasks/store/useDoneTodoStore.ts";
import './DoneTasks.scss'

export function DoneTasks() {
    console.log("DONE tasks render")

    const {
        doneTodos,
        getAllDoneTodos,
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
                {doneTodos.map(doneTodo)}
            </div>
        </div>

    )
}