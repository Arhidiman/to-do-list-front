import {Card, Form, Input, Button} from "antd";
import {useAuthPageStore} from "@/pages/AuthPage/store/useAuthPageStore.ts";
import './RegistrationCard.scss'

export const RegistrationCard = () =>  {

    const {switchAuthReg} = useAuthPageStore()

    return (
        <Card className='registration-card' title='Регистрация'>
            <Form className='registration-card-form'>
                <Form.Item className='input-item'>
                    <span className="label">Имя пользователя</span>
                    <Input className='input' placeholder='имя'/>
                </Form.Item>
                <Form.Item className='input-item'>
                    <span className="label">Пароль</span>
                    <Input className='input' placeholder='Пароль'/>
                </Form.Item>
                <Button className='registration-button' type='primary'>Зарегистрироваться</Button>
            </Form>
            <div className='auth-message'>
                <span>Уже зарегистрированы?</span>
                <Button type='primary' onClick={switchAuthReg}>Войти</Button>
            </div>
        </Card>
    )
}


