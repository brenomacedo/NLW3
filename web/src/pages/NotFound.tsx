import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import deletedImg from '../images/delete.svg'
import '../styles/pages/deleted.css'

const NotFound = () => {

    const { push } = useHistory()

    return (
        <div className="final-container">
            <div className="final-description">
                <h2>Erro!</h2>
                <p>Página não encontrada :(</p>
                <button onClick={() => {
                    push('/')
                }} className="final-button" type="button">
                    Voltar ao início
                </button>
            </div>
            <div className="final-image">
                <img src={deletedImg} alt="delete"/>
            </div>
        </div>
    )
}

export default NotFound