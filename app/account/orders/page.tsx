"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Order } from "@/lib/types"
import { ShoppingBag } from "lucide-react"

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/account/orders")
      return
    }

    // Get orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const userOrders = allOrders.filter((order: Order) => order.userId === user.id)

    // Sort by date (newest first)
    userOrders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setOrders(userOrders)
    setLoading(false)
  }, [user, router])

  if (!user || loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
      case "Shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">View and track your order history</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">No orders yet</h2>
              <p className="mb-6 text-center text-muted-foreground">
                You haven&apos;t placed any orders yet. Start shopping to place your first order.
              </p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                      <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-medium">Items</h3>
                      <ul className="space-y-2">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>
                              {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-end">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/order-confirmation?orderId=${order.id}`}>View Order Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
