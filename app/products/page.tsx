import { ProductGrid } from "@/components/product-grid"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-muted-foreground">Browse our collection of high-quality products</p>
      </div>
      <ProductGrid />
    </div>
  )
}
