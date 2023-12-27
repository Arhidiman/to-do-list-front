import {create} from "zustand"
import axios from 'axios'

const URL = 'https://fakerapi.it/api/v1/users?_quantity=10&_gender=male'

type TUser = {
    "id": number,
    "uuid": string,
    "firstname": string,
    "lastname": string,
    "username": string,
    "password": string,
    "email": string,
    "ip": string,
    "macAddress": string,
    "website": string,
    "image": string
}
interface IUsersStore {
    getAllUsers: () => void
    allUsers: TUser[]
}


export const useUsersStore = create<IUsersStore>((set) => ({
    allUsers: [],
    getAllUsers: async () => {
        const users = await axios(URL)
        console.log(users)
        set({
            allUsers: users.data.data
        })
    }
}))
