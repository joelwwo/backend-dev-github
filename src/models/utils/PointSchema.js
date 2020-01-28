const mongoose = require('mongoose')

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
        required: [true, 'O tipo da coordenada é obrigatória']
    },
    coordinates: {
        type: [Number],
        required: [true, 'A coordenada é obrigatória, por favor, a informe.']
    }
})

module.exports = PointSchema;