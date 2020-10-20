import React, { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import '../styles/pages/dashboard.css'
import { FiMapPin, FiAlertCircle } from 'react-icons/fi'
import noPending from '../images/nopending.svg'
import CreatedOrphanages from "../components/CreatedOrphanages"
import PendingOrphanages from "../components/PendingOrphanages"
import { useHistory } from "react-router-dom"
import api from "../services/api"


const DashboardPending = () => {

    const { push } = useHistory()

    interface IOrphanages {
        id: number
        name: string
        latitude: number
        longitude: number
    }

    const [orphanages, setOrphanages] = useState<IOrphanages[]>([])

    useEffect(() => {
        api.get<IOrphanages[]>('/orphanages/pending').then(res => {
            setOrphanages(res.data)
        })
    }, [])

    const renderOrphanages = () => {
        return orphanages.map(orphanage => {
            return (
                <PendingOrphanages {...orphanage} />
            )
        })
    }

    return (
        <div id="page-create-orphanage">
        <Sidebar logout >
            <div onClick={() => push('/dashboard-created')} className="dashboard-marker-icon" style={{
                backgroundColor: '#12AFCB'
            }}>
                <FiMapPin color="white" size={24} />
            </div>
            <div className="dashboard-warning-icon" style={{
                    backgroundColor: '#FFD666'
                }}>
                <div className="yellow-circle">
                    <div className="point"></div>
                </div>
                <FiAlertCircle color="#0089A5" size={24} />
            </div>
        </Sidebar>

        <div className="dashboard-main">
            <div className="dashboard-title">
                <h2>Cadastros pendentes</h2>
                <p>2 pendentes</p>
            </div>

            <div style={{ justifyContent: orphanages.length === 0 ? 'center' : undefined }}
            className="dashboard-orphanages">
                {orphanages.length !== 0 ? (
                    <>
                        {renderOrphanages()}
                    </>
                ) : (
                    <div className="no-pending">
                        <img src={noPending} alt="nenhum"/>
                        <p>Nenhum no momento</p>
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default DashboardPending