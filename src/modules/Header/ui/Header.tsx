import {useAuthPageStore} from "@/pages/AuthPage/store/useAuthPageStore.ts";
import {UserOutlined, LogoutOutlined} from "@ant-design/icons";
import './Header.scss'
import {getLocalstorageItem} from "@/common/lib/getLocalstorageItem.ts";
import {useEffect, useState} from "react";

export const Header = () =>  {

    const [userName, setUserName] = useState<string | null>('')

    useEffect(() => {
        setUserName(getLocalstorageItem('name'))
    }, [userName]); //TODO: fix (userName not updated)

    return (
        <header className='header'>
            <div className='header-container'>
                <div className='header-user'>
                    <UserOutlined/>
                    <p>{userName}</p>
                    <LogoutOutlined/>
                </div>
            </div>
        </header>
    )
}


