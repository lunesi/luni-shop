import { Link, useParams } from "react-router-dom";
import productsData from "../data/products.json";
import type { Product } from "../types/product";
import { CATEGORY_LABELS } from "../types/product";
import { formatPrice } from "../lib/formatPrice";
import { useCart } from "../context/CardContext";

const products = productsData as Product[];

export function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-24 text-center md:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Товар не найден</h1>
        <p className="mt-2 text-muted">Возможно, он снят с продажи или ссылка устарела.</p>
        <Link
          to="/catalog"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-chip bg-violet px-6 text-sm font-medium text-white transition duration-200 hover:shadow-[0_12px_40px_rgba(124,92,255,0.42)]"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const hasSpecs = product.specs.length > 0;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
      <nav aria-label="Хлебные крошки" className="mb-8 flex items-center gap-2 text-sm text-muted">
        <Link to="/catalog" className="transition-colors hover:text-text">
          Каталог
        </Link>
        <span aria-hidden>/</span>
        <span className="text-text">{CATEGORY_LABELS[product.category]}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface">
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(124,92,255,0.16),transparent_62%)]"
          />
          <span className="absolute left-5 top-5 z-10 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
            <i
              aria-hidden
              className={`size-1.5 rounded-full ${product.inStock ? "bg-live" : "bg-muted"}`}
            />
            {product.inStock ? "в наличии" : "под заказ"}
          </span>
          <span className="absolute right-5 top-5 z-10 rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-[13px]">
            {product.badge}
          </span>
          <span aria-hidden className="absolute inset-x-6 bottom-6 top-16 rounded-xl bg-white" />
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 size-full object-contain px-12 pb-12 pt-24"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-widest text-violet">
            {CATEGORY_LABELS[product.category]}
          </span>

          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            {product.name}
          </h1>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-chip border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-base leading-relaxed text-muted">{product.description}</p>

          <p className="mt-8 font-display text-3xl font-semibold tracking-tight">
            {formatPrice(product.price)}
          </p>

          <button
            type="button"
            onClick={() => addToCart(product.id)}
            disabled={!product.inStock}
            className="mt-6 h-12 cursor-pointer rounded-chip bg-violet px-8 text-base font-medium text-white transition duration-200 hover:shadow-[0_12px_40px_rgba(124,92,255,0.42)] disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted disabled:hover:shadow-none"
          >
            {product.inStock ? "Добавить в корзину" : "Нет в наличии"}
          </button>
        </div>
      </div>

      {hasSpecs && (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Характеристики</h2>

          <dl className="mt-6 overflow-hidden rounded-card border border-line">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-1 border-b border-line px-6 py-4 last:border-b-0 sm:flex-row sm:justify-between sm:gap-4"
              >
                <dt className="text-sm text-muted">{spec.label}</dt>
                <dd className="font-mono text-sm">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
