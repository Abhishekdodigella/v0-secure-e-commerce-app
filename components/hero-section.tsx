import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative py-12 md:py-24 bg-muted/40 rounded-lg mb-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Quality Products at ShopEase
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Shop the latest trends and essentials with our curated collection. Fast shipping and secure checkout.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/account">
                <Button size="lg" variant="outline">
                  My Account
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-500 opacity-20 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold">SUMMER SALE</div>
                  <div className="text-2xl">Up to 50% Off</div>
                  <div className="text-lg">Limited Time Only</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
