import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import deletedImg from '../images/delete.svg'
import api from '../services/api'
import '../styles/pages/deleted.css'

const Deleted = () => {

    interface ILocation {
        id: number
        name: string
    }

    const { push } = useHistory()

    const location = useLocation<ILocation>()

    useEffect(() => {
        if(!location.state) {
            push('/dashboard-created')
        }
    }, [])

    const handleDelete = async () => {
        try {
            await api.delete(`/orphanages/delete/${location.state.id}`)

            push('/dashboard-created')
        } catch {
            alert('Erro ao deletar')
        }
    }

    return (
        <div className="final-container">
            <div className="final-description">
                <h2>Excluir!</h2>
                <p>Você tem certeza que quer excluir "{location.state.name}"?</p>
                <button onClick={handleDelete} className="final-button" type="button">
                    Sim, quero excluir!
                </button>
            </div>
            <div className="final-image">
                <img src={deletedImg} alt="delete"/>
            </div>
        </div>
    )
}

export default Deleted