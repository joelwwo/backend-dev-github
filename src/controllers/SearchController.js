const Dev = require('../models/Dev')
const parseStringAsArray = require('../../src/utils/parseStringAsArray')

module.exports = {

    async index(req, res) {

        try {

            const { latitude, longitude, techs } = req.query

            const techsArray = parseStringAsArray(techs)

            const devs = await Dev.find({
                techs: {
                    $in: techsArray,
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                            /* coordinates: [latitude, longitude] */
                        },
                        $maxDistance: 10000
                    }
                }
            })

            return res.send({
                message: 'Devs filtrados com sucesso.',
                result: devs
            })

        } catch (e) {
            return res.status(500).json({ message: e.message })
        }

    }

}