'use client'

import { Button } from 'antd'
import React from 'react'
import CategoryForm from './CategoryForm'

function CategoriesList() {

    const [showCategoryForm, setShowCategoryForm] = React.useState(false)

    return (
        <div>
            <div className='flex justify-end'>
                <Button type="primary" onClick={() => setShowCategoryForm(true)}>Add Category</Button>
            </div>
            {showCategoryForm && (
                <CategoryForm showCategoryForm={showCategoryForm} setShowCategoryForm={setShowCategoryForm} reloadData={() => {}} />
            )}
    </div>
    )
}

export default CategoriesList
