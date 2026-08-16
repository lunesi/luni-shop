import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatPrice } from "../../lib/formatPrice";

type ProductCardProps = {
  product: Product;
  onAdd: (id: string) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition duration-200 hover:-translate-y-1 hover:border-line-strong">
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(124,92,255,0.16),transparent_62%)]"
        />

        <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
          <i
            aria-hidden
            className={`size-1.5 rounded-full ${product.inStock ? "bg-live" : "bg-muted"}`}
          />
          {product.inStock ? "в наличии" : "под заказ"}
        </span>

        <span className="absolute right-4 top-4 z-10 rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-[13px]">
          {product.badge}
        </span>

        <span aria-hidden className="absolute inset-x-5 bottom-5 top-16 rounded-xl bg-white" />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 size-full object-contain px-10 pb-10 pt-20 transition-transform duration-300 group-hover:-translate-y-1.5"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 border-t border-line p-6">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          <Link to={`/product/${product.id}`} className="hover:text-violet">
            {product.name}
          </Link>
        </h3>

        <ul className="flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-chip border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="font-display text-xl font-semibold tracking-tight">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={() => onAdd(product.id)}
            disabled={!product.inStock}
            className="h-10 cursor-pointer rounded-chip border border-line-strong px-6 text-sm font-medium transition duration-200 hover:border-violet hover:bg-violet hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:bg-transparent disabled:hover:text-text"
          >
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}
