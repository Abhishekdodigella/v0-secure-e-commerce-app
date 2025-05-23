"use client"

import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import { getProductById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, ShoppingCart } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border bg-background">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold">${product.price.toFixed(2)}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium">Description</h2>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Product Details</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{product.category}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span className="text-green-600">In Stock</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free shipping</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
