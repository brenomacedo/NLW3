import React, { FC } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import '../styles/components/created-orphanage.css'
import mapIcon from '../utils/mapIcon'

interface PendingOrphanageProps {
  id: number
  name: string
  latitude: number
  longitude: number
}

const PendingOrphanages: FC<PendingOrphanageProps> = ({ latitude, longitude, name, id }) => {

    const { push } = useHistory()

    return (
        <div className="created-orphanage-container">
            <Map
              center={[latitude,longitude]} 
              style={{
                  width: '100%',
                  height: 227,
                  borderRadius: 16
              }}
              zoom={15}
              
            >
              <TileLayer
                url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              
            <Marker interactive={false} icon={mapIcon} position={[latitude,longitude]} />
              
            </Map>
            <div className="created-orphanage-options">
              <div className="created-orphanage-name">
                <h2>{name}</h2>
              </div>
              <div className="created-orphanage-buttons">
                <div className="created-orphanage-button" onClick={() => {
                  push('/verify-orphanage', { id })
                }}>
                    <FiArrowRight size={20} color="#4D6F80" />
                </div>
              </div>
            </div>
        </div>
    )
}

export default PendingOrphanages