import React, { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import '../styles/pages/dashboard.css'
import { FiMapPin, FiAlertCircle } from 'react-icons/fi'
import CreatedOrphanages from "../components/CreatedOrphanages"
import { useHistory } from "react-router-dom"
import api from "../services/api"
import Orphanage from "./Orphanage"


const DashboardCreated = () => {

    interface IOrphanages {
        id: number
        name: string
        latitude: number
        longitude: number
    }

    const { push } = useHistory()

    const [orphanages, setOrphanages] = useState<IOrphanages[]>([])

    useEffect(() => {
        api.get('/orphanages').then(res => {
            setOrphanages(res.data)
        })
    }, [])

    const renderOrphanages = () => {
        return orphanages.map(orphanage => {
            return (
                <CreatedOrphanages {...orphanage} />
            )
        })
    }

    return (
        <div id="page-create-orphanage">
        <Sidebar logout>
            <div className="dashboard-marker-icon">
                <FiMapPin color="#0089A5" size={24} />
            </div>
            <div onClick={() => push('/dashboard-pending')} className="dashboard-warning-icon">
                <div className="yellow-circle">
                    <div className="point"></div>
                </div>
                <FiAlertCircle color="white" size={24} />
            </div>
        </Sidebar>

        <div className="dashboard-main">
            <div className="dashboard-title">
                <h2>Orfanatos cadastrados</h2>
                <p>2 Orfanatos</p>
            </div>

            <div className="dashboard-orphanages">
                {renderOrphanages()}
            </div>
        </div>
        </div>
    )
}

export default DashboardCreated