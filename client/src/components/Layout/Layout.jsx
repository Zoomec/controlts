import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import TopNavbar from './TopNavbar'

const Layout = () => {
    return (
        <>
            <TopNavbar />
            <Container fluid>
                <Outlet />
            </Container>

        </>
    )
}

export default Layout