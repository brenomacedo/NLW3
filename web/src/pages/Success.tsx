import React from 'react'
import successImg from '../images/success.svg'
import '../styles/pages/deleted.css'

const Success = () => {
    return (
        <div style={{ backgroundColor: '#37C77F' }} className="final-container">
            <div className="final-description">
                <h2>Ebaaa!</h2>
                <p>O cadastro foi enviado ao administrador! Agora é só esperar!</p>
                <button style={{ backgroundColor: '#31B272' }} className="final-button" type="button">
                    Voltar ao mapa!
                </button>
            </div>
            <div className="final-image">
                <img src={successImg} alt="delete"/>
            </div>
        </div>
    )
}

export default Success