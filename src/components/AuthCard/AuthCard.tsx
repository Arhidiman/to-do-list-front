import {Card, Form, Input, Button} from "antd";
import {useAuthPageStore} from "@/pages/AuthPage/store/useAuthPageStore.ts";
import './AuthCard.scss'
export const AuthCard = () =>  {

    const {switchAuthReg} = useAuthPageStore()

    return (
        <Card className='auth-card' title='Вход'>
            <Form className='auth-card-form'>
                <Form.Item className='input-item'>
                    <span className="label">Имя пользователя</span>
                    <Input className='input' placeholder='имя'/>
                </Form.Item>
                <Form.Item className='input-item'>
                    <span className="label">Пароль</span>
                    <Input className='input' placeholder='Пароль'/>
                </Form.Item>
                <Button type='primary'>Войти</Button>
            </Form>
            <div className='auth-message'>
                <span>Нет аккаунта?</span>
                <Button type='primary' onClick={switchAuthReg}>Зарегистрироваться</Button>
            </div>
        </Card>
    )
}


