import { products } from '@/lib/catalog'
import { ProductCard } from '@/components/product/ProductCard'

export default function WishlistPage() {
  const wishlist = products.slice(0, 3)

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <p className="font-label text-[11px] tracking-[0.35em] text-[#C0392B]">ACCOUNT</p>
      <h1 className="mt-4 font-heading text-[42px] md:text-[56px]">Wishlist</h1>
      <p className="mt-4 max-w-2xl text-[#A0A0A0]">Save Tangred pieces you want to revisit, compare, or hand over to Tan Leida for styling context.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
