'use client'
import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import CategoriesList from './components/CategoriesList'

function Profile() {

    const currentUser = useSelector((state: any) => state.user)
    return (
        <div>
            {currentUser.currentUser?.isAdmin && (
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab='Products' key='1'>
                        Products
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Categories' key='2'>
                        <CategoriesList />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Orders' key='3'>
                        Orders
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Users' key='4'>
                        Users
                    </Tabs.TabPane>
                </Tabs>
            )}
            {!currentUser.currentUser?.isAdmin && (
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab='Orders' key='1'>
                        Orders
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Personal Information' key='2'>
                        Personal Information
                    </Tabs.TabPane>
                </Tabs>
            )}
        </div>
    )
}

export default Profile
