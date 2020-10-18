import React from "react"
import Sidebar from "../components/Sidebar"
import '../styles/pages/dashboard.css'
import { FiMapPin, FiAlertCircle } from 'react-icons/fi'
import CreatedOrphanages from "../components/CreatedOrphanages"
import PendingOrphanages from "../components/PendingOrphanages"


const DashboardPending = () => {

  return (
    <div id="page-create-orphanage">
      <Sidebar>
          <div className="dashboard-marker-icon" style={{
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

          <div className="dashboard-orphanages">
              <PendingOrphanages />
          </div>
      </div>
    </div>
  )
}

export default DashboardPending