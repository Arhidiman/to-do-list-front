import {Card, Form, Input, Button} from "antd";
import {useAuthPageStore} from "@/pages/AuthPage/store/useAuthPageStore.ts";
import {useNavigate} from "react-router-dom";
import type {SyntheticEvent} from "react";
import './AuthCard.scss'

export const AuthCard = () =>  {

    const {
        switchAuthReg,
        setUserName,
        setUserPassword,
        signIn
    } = useAuthPageStore()


    const navigate = useNavigate()
    const setName = (e: SyntheticEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement
        console.log(element.value)
        setUserName(element.value)
    }
    const setPassword = (e: SyntheticEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement
        setUserPassword(element.value)
    }

    const [form] = Form.useForm()
    const inputRules = [{ required: true, message: 'Это поле не может быть пустым' }]

    const submitAuth = async () => {
        try {
            const user = await form.validateFields()
            signIn(user, navigate)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className='auth-card' title='Вход'>
            <Form className='auth-card-form' form={form}>
                <Form.Item rules={inputRules} name='name'>
                    <div className='input-item' >
                        <span className="label">Имя пользователя</span>
                        <Input className='input' placeholder='имя' onChange={setName}/>
                    </div>
                </Form.Item>
                <Form.Item rules={inputRules} name='password'>
                    <div className='input-item' >
                        <span className="label">Пароль</span>
                        <Input className='input' placeholder='Пароль' onChange={setPassword}/>
                    </div>
                </Form.Item>
                <Button className='auth-button' type='primary' onClick={submitAuth}>
                    Войти
                </Button>
            </Form>
            <div className='auth-message'>
                <span>Нет аккаунта?</span>
                <Button type='primary' onClick={switchAuthReg}>Зарегистрироваться</Button>
            </div>
        </Card>
    )
}


