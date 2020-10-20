import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../database/models/Orphanage'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'
import orphanages_view from '../views/orphanages_view'

export default {
    async create (req: Request, res: Response) {
        const { latitude, longitude, name, opening_hours,
            instructions, about, open_on_weekends, user_id } = req.body
    
        const orphanagesRepository = getRepository(Orphanage)

        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        })

        const data = { latitude, longitude, name, opening_hours,
            instructions, about, open_on_weekends: open_on_weekends === 'true', images, user_id }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false
        })
    
        const orphanage = orphanagesRepository.create(data)
        
        await orphanagesRepository.save(orphanage)
    
        return res.status(201).json(orphanage)
    },
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            where: {
                approved: true
            },
            relations: ['images']
        })

        return res.json(orphanageView.renderMany(orphanages))
    },

    async indexPending(req: Request, res: Response) {
        const orphanagesRespository = getRepository(Orphanage)

        const orphanages = await orphanagesRespository.find({
            where: {
                approved: false
            },
            relations: ['images']
        })

        return res.json(orphanageView.renderMany(orphanages))
    },

    async approveOrphanage(req: Request, res: Response) {

        const { id } = req.params

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = await orphanagesRepository.findOne(id, {
            relations: ['images']
        })

        if(!orphanage) {
            return res.status(500).json({ message: "usuário não encontrado!" })
        }

        orphanage.approved = true

        await orphanagesRepository.save(orphanage)

        return res.status(200).json(orphanages_view.render(orphanage))

    },
    
    async show(req: Request, res: Response) {
        const { id } = req.params
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(orphanageView.render(orphanages))
    },

    async updateOrphanage(req: Request, res: Response) {
        const { id } = req.params
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body


        const data = { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required()
        })

      
        await schema.validate(data, {
            abortEarly: false
        })

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = await orphanagesRepository.findOne(id)

        if(!orphanage) {
            return res.status(500).json({ message: "Orphanage not found" })
        }

        orphanage.name = name
        orphanage.latitude = latitude
        orphanage.longitude = longitude
        orphanage.about = about
        orphanage.instructions = instructions
        orphanage.opening_hours= opening_hours
        orphanage.open_on_weekends = open_on_weekends

        await orphanagesRepository.save(orphanage)

        return res.status(200).json(orphanage)
    },

    async deleteOrphanage(req: Request, res: Response) {
        const { id } = req.params

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = await orphanagesRepository.findOne(id)

        if(!orphanage) {
            return res.status(500).json({ message: "User not found" })
        }

        await orphanagesRepository.delete(orphanage)

        return res.status(200).json({ message: "Orphanage successfully deleted!" })
    }
}