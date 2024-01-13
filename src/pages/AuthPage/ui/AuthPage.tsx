import {RegistrationCard} from "@/pages/AuthPage/ui/RegistrationCard/RegistrationCard.tsx";
import {AuthCard} from "@/pages/AuthPage/ui/AuthCard/AuthCard.tsx";
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


