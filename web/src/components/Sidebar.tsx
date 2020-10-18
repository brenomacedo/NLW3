import React, { FC } from 'react'
import mapMarkerImg from '../images/marker.svg'
import { FiArrowLeft } from 'react-icons/fi'
import '../styles/components/sidebar.css'
import { useHistory } from 'react-router-dom'

const Sidebar: FC = ({ children }) => {

    const { goBack } = useHistory()

    return (
        <aside>
            <img src={mapMarkerImg} alt="Happy" />
            <div className="sidebar-icons">
                {children}
            </div>
            <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </button>
            </footer>
        </aside>
    )
}

export default Sidebar