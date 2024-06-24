'use client'
import { getRulesForForm } from '@/app/helpers/validations'
import { Button, Form } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import Link from 'next/link'
import React from 'react'


interface LoginProps {
    email: string;
    password: string;
}

function Login() {


    const onLogin = (values: LoginProps) => {
        console.log(values)
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
                        <input type='email' placeholder=' Enter Email'/>
                    </FormItem>
                    <FormItem name='password' label='Password' rules={getRulesForForm('Please input your password!')} >
                        <input type='password' placeholder='Enter Password' />
                    </FormItem>
                    <Button type='primary' htmlType='submit' block>Login</Button>
                    <Link href='/auth/register' className='text-primary'>Dont have account yet? Register</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login
