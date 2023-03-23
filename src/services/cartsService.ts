import { carts } from "@prisma/client";

export type CreateCartData = Omit<carts, "id">