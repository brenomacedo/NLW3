import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import { FiArrowLeft, FiPlus, FiX, FiXCircle, FiCheck } from "react-icons/fi"

import '../styles/pages/create-orphanage.css'
import Sidebar from "../components/Sidebar"
import mapIcon from "../utils/mapIcon"
import api from "../services/api"
import { useHistory, useLocation } from "react-router-dom"

export default function VerifyOrphanage() {

  interface ILocation {
    id: number
  }

  interface IOrphanage {
    id: number
    name: string
    latitude: number
    longitude: number
    about: string
    instructions: string
    opening_hours: string
    open_on_weekends: boolean
    images: {
      id: number
      url: string
    }[]
  }

  const location = useLocation<ILocation>()

  const { push } = useHistory()

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [orphanage, setOrphanage] = useState<IOrphanage>()

  useEffect(() => {
    if(!location.state) {
      return push('/dashboard-created')
    }

    api.get<IOrphanage>(`orphanages/${location.state.id}`).then(res => {
      setOrphanage(res.data)
      setName(res.data.name)
      setAbout(res.data.about)
      setInstructions(res.data.instructions)
      setOpenOnWeekends(res.data.open_on_weekends)
      setOpeningHours(res.data.opening_hours)
      setPreviewImages(res.data.images.map(e => e.url))
    })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
  }

  const accept = async () => {
    try {
      await api.put(`/orphanages/approve/${location.state.id}`)
      push('/dashboard-created')
    } catch {
      alert('erro ao aprovar, tente novamente mais tarde')
    }
  }

  const deny = async () => {
    try {
      await api.delete(`/orphanages/delete/${location.state.id}`)
      push('/dashboard-created')
    } catch {
      alert('erro ao recusasr, tente novamente mais tarde')
    }
  }

  if(!orphanage) {
    return <h1>Carregando</h1>
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[orphanage.latitude,orphanage.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer 
                url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              
              <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input readOnly id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea readOnly id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImages.map((img, index) => {
                  return (
                    <div className="img-container">
                      <img src={img} key={index} alt={name}></img>
                    </div>
                  )
                })}
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea readOnly id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input readOnly id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                type="button" className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button
                type="button" className={!open_on_weekends ? 'active' : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <div className="verify-orphanage-buttons">
            <button onClick={accept} className="verify-confirm-button" type="submit">
                <FiCheck size={20} color='white' /> Confirmar
            </button>
            <button onClick={deny} className="verify-deny-button" type="submit">
                <FiXCircle size={20} color='white' /> Recusar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
