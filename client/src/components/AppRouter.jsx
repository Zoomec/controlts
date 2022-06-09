import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthPage from '../pages/AuthPage'
import WorkPage from '../pages/WorkPage'
import CatalogPage from '../pages/CatalogPage'
import Services from './Catalog/Services/Services'
import Layout from './Layout/Layout'
import NotFoundPage from '../pages/NotFoundPage'
import CreateUpdateService from './Catalog/Services/CreateUpdateService'

const AppRouter = () => {
    const userState = useSelector(state => state.user)

    if (userState.isAuth) {
        // маршруты для авторизованого пользователя
        return (
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<WorkPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                    <Route path='catalog' element={<CatalogPage />}>
                        <Route path='services' element={<Services />} />
                        <Route path='services/add' element={<CreateUpdateService />} />
                        <Route path='services/:id' element={<CreateUpdateService isUpdateMode={true} />} />
                    </Route>
                </Route>
            </Routes>
        )
    } else {
        // маршруты для НЕ авторизованого пользователя
        return (
            <Routes>
                <Route path='/auth' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
            </Routes>
        )

    }


}



export default AppRouter