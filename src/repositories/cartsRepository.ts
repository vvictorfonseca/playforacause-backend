import prisma from "../config/database";
import { CreateCartData, CreateUpdateCart } from "../services/cartsService";

async function addToCart(newCart: CreateCartData) {
  await prisma.carts.create({data: newCart})
}

async function getUserCart(userId: number) {
  const carts = prisma.carts.findMany({
    where: {
      userId
    },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          image: true,
          size: true,
          units: true
        }
      }
    },
    orderBy: {
      id: 'asc'
    }
  })

  return carts
}

async function getCartById(cartId: number) {
  const cart = await prisma.carts.findFirst({
    where: {
      id: cartId
    },
    select: {
      units: true
    }
  })

  return cart
}

async function getCartByProductId(productId: number, userId: number) {
  const cart = prisma.carts.findFirst({
    where: {
      productId,
      userId
    },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          units: true
        }
      }
    }
  })

  return cart
}

async function incrementUnitsIfProductIsAlreadyOnUserCart(cartId: number, units: number, userId: number) {
  await prisma.carts.updateMany({
    where: {
      id: cartId,
      userId: userId
    },
    data: {
      units: {
        increment: units
      }
    }
  })
}

async function incrementProductUnitFromUserCart(updateCart: CreateUpdateCart) {
  await prisma.carts.updateMany({
    where: {
      id: updateCart.id,
      userId: updateCart.userId
    },
    data: {
      units: {
        increment: 1
      }
    }
  })
}

async function decrementProductUnitFromUserCart(updateCart: CreateUpdateCart) {
  await prisma.carts.updateMany({
    where: {
      id: updateCart.id,
      userId: updateCart.userId
    },
    data: {
      units: {
        decrement: 1
      }
    }
  })
}

async function deleteProductFromCart(cartId: number) {
  await prisma.carts.deleteMany({
    where: {
      id: cartId
    }
  })
}

const cartsRepository = {
  addToCart,
  getUserCart,
  getCartById,
  getCartByProductId,
  incrementUnitsIfProductIsAlreadyOnUserCart,
  decrementProductUnitFromUserCart,
  incrementProductUnitFromUserCart,
  deleteProductFromCart
}

export default cartsRepository