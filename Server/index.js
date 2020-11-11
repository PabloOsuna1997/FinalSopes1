const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

const { mongoose } = require("./config/database");
app.set('port', process.env.PORT || 3000)

app.use(cors())
app.use(morgan("dev"))          //development mode
app.use(express.json({limit: "500mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true}))


//routes
app.use(require("./routes/user.routes"))

app.listen(app.get('port'), () => {
    console.log('server corriendo en puerto 3000.')
})