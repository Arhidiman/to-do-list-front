import {Card, Form, Input, Button} from "antd";
import {useAuthPageStore} from "@/pages/AuthPage/store/useAuthPageStore.ts";
import type {SyntheticEvent} from "react";
import './RegistrationCard.scss'


export const RegistrationCard = () =>  {

    const {
        switchAuthReg,
        setUserName,
        setUserPassword,
        signUpNewUser
    } = useAuthPageStore()

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

    const submitRegistration = async () => {
        try {
            const user = await form.validateFields()
            signUpNewUser(user)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className='registration-card' title='Регистрация'>
            <Form className='registration-card-form' form={form}>
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
                <Button className='registration-button' type='primary' onClick={submitRegistration}>
                    Зарегистрироваться
                </Button>
            </Form>
            <div className='auth-message'>
                <span>Уже зарегистрированы?</span>
                <Button type='primary' onClick={switchAuthReg}>Войти</Button>
            </div>
        </Card>
    )
}


