export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export type Order = {
  id: string
  userId: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
  total: number
  shippingAddress: {
    fullName: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  status: "Processing" | "Shipped" | "Delivered"
  createdAt: string
}
