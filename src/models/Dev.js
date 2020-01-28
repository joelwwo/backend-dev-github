const mongoose = require('mongoose')

const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
    github_username: { type: String, maxlength: 120, required: [true, 'Informe o identificador do GitHub.'] },
    name: { type: String, maxlength: 120, required: [true, 'Informe o nome do(a) dev.'] },
    bio: { type: String, maxlength: 120 },
    avatar_url: { type: String, maxlength: 120 },
    techs: [String],
    location:{
        type: PointSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model('Dev', DevSchema)