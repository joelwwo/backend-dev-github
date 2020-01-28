const axios = require('axios')

const Dev = require('../models/Dev')
const parseStringAsArray = require('../../src/utils/parseStringAsArray')

module.exports = {

    async store(req, res) {

        try {

            const { github_username, techs, latitude, longitude } = req.body
            const userExists = await Dev.findOne({ github_username })

            if (!userExists) {

                const { data } = await axios.get(`https://api.github.com/users/${github_username}`)
                let { login, name = login, avatar_url, bio } = data
                name = name ? name : login

                const location = {
                    coordinates: [longitude, latitude]
                }

                const techsArray = parseStringAsArray(techs)
                const dev = await Dev.create({
                    github_username,
                    name,
                    bio,
                    avatar_url,
                    techs: techsArray,
                    location
                })
                return res.status(200).json(dev)

            }
            else {
                return res.status(417).json({ message: `Dev ${github_username} já cadastrado.` })
            }

        } catch (e) {
            return res.status(500).json({ message: e.message })
        }

    },

    async index(req, res) {

        try {

            const devs = await Dev.find()
            return res.send({
                message: 'Devs consultados com sucesso.',
                result: devs
            })

        } catch (e) {
            return res.status(500).send({
                message: 'Ocorreu um erro ao tentar buscar os devs na base de dados.',
                error: e.message
            })
        }

    }

}