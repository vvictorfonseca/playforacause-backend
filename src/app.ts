import express, { json } from 'express'
import 'express-async-errors'

import cors from 'cors'

import router from './routers/index'
import handleErrors from './middlewares/handleErrosMiddleware'

const app = express()

app.use(cors())
app.use(json())

app.use(router)
app.use(handleErrors)

export default app