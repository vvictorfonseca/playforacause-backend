import Joi from 'joi'
import { CreateProductData } from '../services/productsService'

const saveProduct = Joi.object<CreateProductData>({
  name: Joi.string().min(6).required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().min(6).required(),
  size: Joi.string().max(2),
  club: Joi.string().min(3),
  units: Joi.number().required()
})

export  default saveProduct