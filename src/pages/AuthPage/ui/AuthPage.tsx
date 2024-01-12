import {RegistrationCard} from "@/components/RegistrationCard/RegistrationCard.tsx";
import {AuthCard} from "@/components/AuthCard/AuthCard.tsx";
import {useAuthPageStore} from "@/pages/AuthPage/store/useAuthPageStore.ts";

export const AuthPage = () =>  {

    const {isAuth} = useAuthPageStore()

    return (
        <>
            {
                isAuth
                ?<RegistrationCard/>
                :<AuthCard/>
            }
        </>
    )
}


