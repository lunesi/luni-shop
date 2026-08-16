import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import productsData from "../data/products.json";
import type { Product, Category } from "../types/product";
import { CATEGORY_LABELS } from "../types/product";
import { ProductCard } from "../components/product/ProductCard";
import { useCart } from "../context/CardContext";

const products = productsData as Product[];

const CATEGORY_ORDER: Category[] = ["mice", "pads", "parts"];

const STATS = [
  { value: "46 г", label: "самая лёгкая" },
  { value: "8 000 Гц", label: "опрос сенсора" },
  { value: "2 дня", label: "доставка" },
];

export function HomePage() {
  const { addToCart } = useCart();

  const inStockCount = products.filter((p) => p.inStock).length;
  const featured = products.find((p) => p.category === "mice") ?? products[0];
  const popular = products.slice(0, 6);

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-6">
      <section className="relative overflow-hidden py-16 md:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-64 size-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.28),transparent_62%)]"
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-chip border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted">
              <i aria-hidden className="size-1.5 rounded-full bg-live" />
              {inStockCount} позиций в наличии
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Мышь, которой <span className="text-violet">не чувствуешь</span> рукой
            </h1>

            <p className="mt-6 max-w-[42ch] text-lg text-muted">
              Игровая периферия от 46 граммов. Проверяем каждую партию перед отправкой.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="inline-flex h-13 items-center rounded-chip bg-violet px-8 font-medium text-white transition duration-200 hover:shadow-[0_12px_40px_rgba(124,92,255,0.42)]"
              >
                Смотреть каталог
              </Link>
              <Link
                to="/catalog?cat=mice"
                className="inline-flex h-13 items-center rounded-chip border border-line-strong px-8 font-medium transition-colors hover:bg-surface"
              >
                Только мыши
              </Link>
            </div>

            <dl className="mt-12 flex flex-wrap gap-10 border-t border-line pt-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </dd>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          <Link
            to={`/product/${featured.id}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface-2"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(124,92,255,0.18),transparent_62%)]"
            />
            <span className="absolute left-6 top-6 z-10 font-mono text-[11px] uppercase tracking-widest text-muted">
              {featured.name}
            </span>
            <span className="absolute right-6 top-6 z-10 rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-[13px]">
              {featured.badge}
            </span>
            <span aria-hidden className="absolute inset-x-8 bottom-8 top-20 rounded-xl bg-white" />
            <img
              src={featured.image}
              alt={featured.name}
              className="absolute inset-0 size-full object-contain px-16 pb-16 pt-28 transition-transform duration-300 group-hover:-translate-y-2"
            />
          </Link>
        </div>
      </section>

      <section className="py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Категории</h2>
          <Link
            to="/catalog"
            className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-violet"
          >
            Весь каталог
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((category, index) => {
            const count = products.filter((p) => p.category === category).length;

            return (
              <Link
                key={category}
                to={`/catalog?cat=${category}`}
                className="group relative flex min-h-[180px] flex-col rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-2"
              >
                <span className="font-mono text-[11px] tracking-widest text-violet">
                  0{index + 1}
                </span>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden
                  className="absolute right-6 top-6 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet"
                />
                <h3 className="mt-auto font-display text-2xl font-semibold tracking-tight">
                  {CATEGORY_LABELS[category]}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {count} {count === 1 ? "товар" : "товара"} в наличии
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">
            Забирают чаще всего
          </h2>
          <Link
            to="/catalog"
            className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-violet"
          >
            Показать всё
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}
