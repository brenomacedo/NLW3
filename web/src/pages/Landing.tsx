import React, { useContext } from 'react'
import logoImg from '../images/logo.svg'
import { FiArrowRight } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import '../styles/global.css'
import '../styles/pages/landing.css'
import UserContext from '../contexts/UserContext'

const Landing = () => {

    const User = useContext(UserContext)

    const { push } = useHistory()

    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt=""/>
                <main>
                <h1>Leve felicidade para o mundo!</h1>
                <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div className="location">
                    <strong>Fortaleza</strong>
                    <p>{User.isAuth ? 'ola' : 'nao ola'}</p>
                </div>
                <div onClick={() => push('/login')}
                className="restrict-access">Acesso restrito</div>
                

                <Link to="/app" className="enter-app">
                <FiArrowRight size={26} color='rgba(0,0,0,0.6)' />
                </Link>
            </div>
        </div>
    )
}

export default Landing