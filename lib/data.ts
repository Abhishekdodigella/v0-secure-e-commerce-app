import type { Product } from "@/lib/types"

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design for immersive sound experience.",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description:
      "Advanced fitness tracker with heart rate monitoring, sleep tracking, GPS, and 7-day battery life. Water-resistant and compatible with iOS and Android.",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wearables",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description:
      "Soft, breathable organic cotton t-shirt with a relaxed fit. Ethically sourced and environmentally friendly. Available in multiple colors.",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description:
      "Double-walled, vacuum-insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof design.",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home",
  },
  {
    id: "5",
    name: "Bluetooth Portable Speaker",
    description:
      "Compact, waterproof Bluetooth speaker with 360° sound, 16-hour battery life, and built-in microphone for calls. Perfect for outdoor adventures.",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Leather Wallet",
    description:
      "Handcrafted genuine leather wallet with RFID blocking technology, multiple card slots, and slim profile. Available in black and brown.",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
  },
  {
    id: "7",
    name: "Ceramic Coffee Mug Set",
    description:
      "Set of 4 handmade ceramic coffee mugs with unique glazed finish. Microwave and dishwasher safe, 12oz capacity.",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home",
  },
  {
    id: "8",
    name: "Yoga Mat",
    description:
      "Eco-friendly, non-slip yoga mat with alignment markings. 6mm thickness for joint protection and comfort during practice.",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fitness",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
