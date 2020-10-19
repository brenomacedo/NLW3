import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import { FiArrowLeft, FiPlus, FiX } from "react-icons/fi"

import '../styles/pages/create-orphanage.css'
import Sidebar from "../components/Sidebar"
import mapIcon from "../utils/mapIcon"
import api from "../services/api"
import { useHistory, useLocation } from "react-router-dom"

export default function EditOrphanage() {


  interface RouteParams {
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

  const { push } = useHistory()

  const [position, setPosition] = useState({ lat: 0, lng: 0 })


  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [orphanage, setOrphanage] = useState<IOrphanage>()

  const location = useLocation<RouteParams>()

  useEffect(() => {
    if(!location.state) {
      return push('/dashboard-created')
    }

    api.get<IOrphanage>(`/orphanages/${location.state.id}`).then(res => {
      setOrphanage(res.data)
      setName(res.data.name)
      setAbout(res.data.about)
      setInstructions(res.data.instructions)
      setOpeningHours(res.data.opening_hours)
      setOpenOnWeekends(res.data.open_on_weekends)
      setPosition({
        lat: res.data.latitude,
        lng: res.data.longitude
      })
      setPreviewImages(res.data.images.map(e => e.url))
    })
    
  }, [])

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    setPosition({
      lat: event.latlng.lat,
      lng: event.latlng.lng
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { lat: latitude, lng: longitude } = position
  


    try {
      await api.put(`/orphanages/update/${location.state.id}`, {
        name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
      })
      alert('Cadastro realizado com sucesso!')
      push('/dashboard-created')
    } catch {
      alert('Erro ao cadastrar')
    }
  }

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) {
      return
    }
    const selectedImages = Array.from(e.target.files)
    setImages(selectedImages)
    const selectedImagesPreview = selectedImages.map(img => {
      return URL.createObjectURL(img)
    })
    setPreviewImages(selectedImagesPreview)
  }

  const removeImage = (removeIndex: number) => {
    const newPreviewImages = previewImages.filter((img, index) => index !== removeIndex)
    const newImages = images.filter((img, index) => index !== removeIndex)
    setImages(newImages)
    setPreviewImages(newPreviewImages)
  }


  if(!orphanage) {
    return <h1>Carregando...</h1>
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              {position.lat !== 0 && position.lng !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.lat,position.lng]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
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

                <input hidden multiple onChange={handleSelectImages} type="file" id="image[]"/>
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button onClick={() => setOpenOnWeekends(true)}
                type="button" className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button onClick={() => setOpenOnWeekends(false)}
                type="button" className={!open_on_weekends ? 'active' : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
