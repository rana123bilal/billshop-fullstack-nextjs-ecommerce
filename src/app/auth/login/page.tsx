'use client'
import { getRulesForForm } from '@/app/helpers/validations'
import { Button, Form, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'


interface LoginProps {
    email: string;
    password: string;
}

function Login() {
    const router = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false)

    const onLogin = async (values: LoginProps) => {
        try {
            setLoading(true);
            await axios.post('/api/auth/login', values);
            message.success('Logged in successfully');
            router.push('/');
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
            <div className='h-full bg-primary hidden md:flex items-center justify-center'>
                <h1 className='text-7xl font-bold text-red-500'><bdo dir=""></bdo>Bills-</h1>
                <h1 className='text-7xl font-bold text-yellow-500'>shop</h1>
            </div>
            <div className='flex items-center justify-center h-full'>
                <Form className='w-[400px] flex flex-col gap-3 ' layout='vertical' onFinish={onLogin}>
                    <h1 className='text-2xl font-bold'>Login</h1>
                    <hr />
                    <FormItem name='email' label='Email' rules={getRulesForForm('Please input your email!')} >
                        <input type='email' placeholder=' Enter Email' />
                    </FormItem>
                    <FormItem name='password' label='Password' rules={getRulesForForm('Please input your password!')} >
                        <input type='password' placeholder='Enter Password' />
                    </FormItem>
                    <Button type='primary' htmlType='submit' block loading={loading}>Login</Button>
                    <Link href='/auth/register' className='text-primary'>Dont have account yet? Register</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login
