import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const TopNavbar = () => {
    const userState = useSelector(state => state.user)

    if (!userState.isAuth) {
        return <></>
    } else {
        return (
            <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Главное окно</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">
                            </Nav.Link>
                            <LinkContainer to="/checkout">
                                <Button variant='outline-warning'>Оформить въезд</Button>
                            </LinkContainer>
                            <NavDropdown title="Сервис" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Настройки</NavDropdown.Item>
                                <LinkContainer to='/catalogs'>
                                    <NavDropdown.Item>Справочники</NavDropdown.Item>
                                </LinkContainer>
                                {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">NEW</NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">
                                {`${userState.userData.fio || userState.userData.username}`}
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">Выйти</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default TopNavbar