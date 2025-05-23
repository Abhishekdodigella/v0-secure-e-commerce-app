"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cartItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const cartItemCount = isMounted ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">ShopEase</span>
          </Link>
        </div>
        <nav
          className={`${isMenuOpen ? "absolute inset-x-0 top-16 border-b bg-background p-4 md:static md:border-0 md:bg-transparent md:p-0" : "hidden md:flex"} items-center gap-4 md:gap-6`}
        >
          <Link
            href="/"
            className={`text-sm font-medium ${pathname === "/" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-sm font-medium ${pathname === "/products" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
            onClick={closeMenu}
          >
            Products
          </Link>
          {user && (
            <Link
              href="/account/orders"
              className={`text-sm font-medium ${pathname === "/account/orders" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
              onClick={closeMenu}
            >
              My Orders
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="hidden md:inline-flex">
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
