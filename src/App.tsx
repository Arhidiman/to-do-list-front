
import {useEffect} from "react";
import CurrentTasks from "./components/CurrentTasks/CurrentTasks.tsx"
import DoneTasks from "./components/DoneTasks/DoneTasks.tsx";
import {useUsersStore} from "./store/usersStore/useUsersStore.ts";
import './App.css'

function App() {

    const {allUsers, getAllUsers} = useUsersStore()
    console.log(allUsers)
    useEffect(() => {
        getAllUsers()
    }, []);


    return (
     <>
         {
             allUsers.map(user => <div>{user.firstname}</div>)
         }
         <CurrentTasks/>
         <DoneTasks/>
     </>
    )
}

export default App
