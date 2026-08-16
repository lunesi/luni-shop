import { useState } from "react";
import productsData from "../data/products.json";
import type { Product, Category } from "../types/product";
import { ProductCard } from "../components/product/ProductCard";
import { useCart } from "../context/CardContext";
import { useSearchParams } from "react-router-dom";

const CATEGORIES = [
  { value: "all", label: "Все" },
  { value: "mice", label: "Мыши" },
  { value: "pads", label: "Коврики" },
  { value: "parts", label: "Глайды" },
] as const;

const products = productsData as Product[];

export function CatalogPage() {
  //const [category, setCategory] = useState<Category | "all">("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get("cat");
  const category = CATEGORIES.some((c) => c.value === catParam) ? (catParam as Category) : "all";
  const setCategory = (value: Category | "all") => {
    setSearchParams(value === "all" ? {} : { cat: value });
  };

  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const { addToCart } = useCart();

  const filtered = category === "all" ? products : products.filter((p) => p.category === category);

  const visibleProducts = [...filtered].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Каталог</h1>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Категории */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`h-10 cursor-pointer rounded-chip border px-4 text-sm font-medium transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "border-violet bg-violet text-white shadow-sm hover:bg-violet/90 hover:shadow"
                    : "border-line text-muted hover:border-violet/60 hover:bg-violet/5 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Сортировка */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="h-10 cursor-pointer rounded-chip border border-line bg-surface px-4 text-sm outline-none transition-all duration-200 hover:border-violet/60 focus:border-violet focus:ring-2 focus:ring-violet/20"
        >
          <option value="asc">Сначала дешёвые</option>
          <option value="desc">Сначала дорогие</option>
        </select>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="mt-8 text-muted">Ничего не найдено</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
