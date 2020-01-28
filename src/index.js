const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const port = 8080
const url = "mongodb+srv://omnistack:joelwwo@omnistack-hcm6f.mongodb.net/omnistack1000?retryWrites=true&w=majority"

const app = express();

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})