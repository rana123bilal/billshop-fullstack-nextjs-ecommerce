'use client'
import { Popover, message } from 'antd'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from '@/app/components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '@/redux/userSlice'

function LayoutProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const currentUser = useSelector((state: any) => state.user)
    const dispatch = useDispatch()

    const pathname = usePathname()
    const isPrivatePage = pathname !== '/auth/login' && pathname !== '/auth/register'

    const getCurrentUser = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/auth/currentuser')
            const data = await response.json()
            dispatch(setCurrentUser(data.data))
        } catch (error) {
            message.error('An error occurred while fetching user data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isPrivatePage) {
            getCurrentUser()
        }
    }, [pathname])

    const onLogout = async () => {
        try {
            setLoading(true)
            await axios.get('/api/auth/logout')
            message.success('You have been logged out')
            dispatch(setCurrentUser(null))
            router.push('/auth/login')
        }
        catch (error) {
            message.error('An error occurred while logging out')
        } finally {
            setLoading(false)
        }
    }

    const content = (
        <div className='flex flex-col gap-2 p-2'>
            <div className='flex gap-2 item-center cursor-pointer text-md' onClick={() => router.push('/profile')}>
                <i className="ri-shield-user-line"></i>
                <span>Profile</span>
            </div>
            <div className='flex gap-2 item-center cursor-pointer text-md' onClick={onLogout}>
                <i className="ri-logout-box-r-line"></i>
                <span>Logout</span>
            </div>
        </div>

    )

    return (

        <div>
           {loading && <Loader />}
            {isPrivatePage && currentUser &&
                <>
                    <div className='bg-primary py-2 px-5 flex justify-between items-center'>
                        <div className='flex gap-2 cursor-pointer' onClick={() => router.push('/')}>
                            <h1 className='text 2xl font-bold text-red-500'>Bills</h1>
                            <h1 className='text 2xl font-bold text-yellow-500'>Shop</h1>
                        </div>
                        <div className='flex gap-5 items-center '>
                            <i className="ri-shopping-cart-line text-white text-2xl"></i>
                            <Popover content={content} trigger="click">
                                <div className='flex h-6 w-6 bg-white p-2 rounded-full items-center justify-center cursor-pointer'>
                                    <span>{currentUser?.currentUser?.name[0]}</span>
                                </div>
                            </Popover>

                        </div>

                    </div>
                    <div className='p-5'>  {children}</div>

                </>
            }
            {!isPrivatePage && children}
        </div>
    )
}

export default LayoutProvider
