"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from "lucide-react"
import type { Order } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!orderId) {
      router.push("/account/orders")
      return
    }

    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === orderId && o.userId === user.id)

    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      router.push("/account/orders")
    }

    setLoading(false)
  }, [orderId, user, router])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!order) {
    return <div className="container mx-auto px-4 py-8">Order not found</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Thank you for your purchase. Your order has been received.</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Order #{order.id.slice(0, 8)}</h2>
              <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{order.status}</div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-medium">Items</h3>
              <ul className="space-y-4">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-medium">Shipping Address</h3>
                <address className="not-italic text-muted-foreground">
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                </address>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Order Summary</h3>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${(order.total / 1.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(order.total - order.total / 1.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-foreground">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-between gap-4">
            <Button variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild>
              <Link href="/account/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
