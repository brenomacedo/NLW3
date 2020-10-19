import React, { FormEvent, useContext, useEffect, useState } from 'react'
import logoImg from '../images/marker.svg'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import '../styles/pages/login.css'
import { useHistory } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import api from '../services/api'

const Login = () => {

    interface ILoginResponse {
        user: {
            id: number
            name: string
            email: string
        }
        token: string
    }

    const [check, setCheck] = useState(false)

    const User = useContext(UserContext)
    const { push, goBack } = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(User.isAuth) {
            push('/dashboard-created')
        }
    }, [User.isAuth])

    const login = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const login = await api.post<ILoginResponse>('/user/auth', {
                email, password
            })

            if(check) {
                localStorage.setItem('token', `Bearer ${login.data.token}`)
            }

            User.setIsAuth && User.setIsAuth(true)
            User.setToken && User.setToken(`Bearer ${login.data.token}`)

            push('/dashboard-created')
        } catch {
            alert('Usuário ou senha incorretos!')
        }
    }

    return (
        <div className="homeform-container">
            <div className="homeform-banner">
                <img width={110} src={logoImg} alt="logo"/>
                <h2 className="homeform-logo">happy</h2>
                <h2 className="homeform-city">Fortaleza</h2>
                <h2 className="homeform-state">Ceará</h2>
            </div>
            <div className="homeform-form">
                
                    <div onClick={() => goBack()} className="homeform-back">
                        <FiArrowLeft color="#15C3D6" size={24} />
                    </div>
                

                <form onSubmit={login} className="homeform-form-container">
                    <h2 className="homeform-form-title">
                        Fazer login
                    </h2>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">E-mail</p>
                        <input value={email} onChange={e => setEmail(e.target.value)}
                        className="homeform-input" type="text"/>
                    </div>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">Senha</p>
                        <input value={password} onChange={e => setPassword(e.target.value)}
                        className="homeform-input" type="password"/>
                    </div>

                    <div className="homeform-options">
                        <div className="homeform-option-remember">
                            <div onClick={() => setCheck(!check)}
                            className={check ? "homeform-checkbox-active" : "homeform-checkbox"}>
                                <FiCheck size={18} color='white' />
                            </div>
                            <p>Lembrar-me</p>
                        </div>
                        <div style={{ cursor: 'pointer' }} onClick={() => push('/forgot-password')}
                        className="homeform-forgot">
                            <p>Esqueci minha senha</p>
                        </div>
                    </div>

                    <button
                    className={(!email || !password) ? "homeform-button-disabled" : "homeform-button"}>
                        <p>Entrar</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login