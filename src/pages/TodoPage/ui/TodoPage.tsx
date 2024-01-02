import {CurrentTasks} from "@/modules/CurrentTasks/index.ts"
import {DoneTasks} from "@/modules/DoneTasks/index.ts";

export const TodoPage = () =>  {
    return (
        <>
            <CurrentTasks/>
            <DoneTasks/>
        </>
    )
}


