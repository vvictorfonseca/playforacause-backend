import app from "./app";
import dotenv from 'dotenv'

dotenv.config({ path: ".env" })

const PORT:number | string = process.env.PORT || 5000

app.listen(PORT, ()=> {
  console.log(`Server is listening on port ${PORT}`)
})