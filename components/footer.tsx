import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">ShopEase</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for quality products at affordable prices.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="text-muted-foreground hover:text-foreground">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-foreground">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-muted-foreground hover:text-foreground">
                  Order History
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">123 Shop Street, City, Country</li>
              <li>
                <a href="mailto:support@shopease.com" className="text-muted-foreground hover:text-foreground">
                  support@shopease.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
