import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType, setInitializedAC} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Login} from "../features/Login/Login";
import {isAuthMeTC, logoutTC} from "../features/Login/authReducer";
import {CircularProgress} from "@mui/material";
import {clearDataAC} from "../features/TodolistsList/todolists-reducer";
import {TodolistType} from "../api/todolists-api";


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
    const isLogged = useAppSelector<boolean>((state) => state.auth.isLogged)
    const dispatch = useAppDispatch()
    const LogoutHandler = () => {
        console.log('here')
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(isAuthMeTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLogged && <Button color="inherit" onClick={LogoutHandler}>Log out</Button>}

                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'/*'} element={<Navigate to={'/404'}/>}/>

                </Routes>
            </Container>

        </div>
    )
}

export default App
