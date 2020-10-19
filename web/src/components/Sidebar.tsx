import React, { FC, useContext } from 'react'
import mapMarkerImg from '../images/marker.svg'
import { FiArrowLeft, FiLogOut } from 'react-icons/fi'
import '../styles/components/sidebar.css'
import { useHistory } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

interface SidebarProps {
    logout?: boolean
}

const Sidebar: FC<SidebarProps> = ({ children, logout }) => {

    const User = useContext(UserContext)

    const { push, goBack } = useHistory()

    const handleLogout = () => {
        User.setIsAuth && User.setIsAuth(false)
        localStorage.clear()
        push('/login')
    }

    return (
        <aside>
            <img src={mapMarkerImg} alt="Happy" />
            <div className="sidebar-icons">
                {children}
            </div>
            <footer>
            {logout ? (
                <button type="button" onClick={handleLogout}>
                    <FiLogOut size={24} color="#FFF" />
                </button>
            ) : (
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            )}
            </footer>
        </aside>
    )
}

export default Sidebar