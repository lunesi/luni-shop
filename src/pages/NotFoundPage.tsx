import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-[1280px] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center md:px-6">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-40 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_62%)]"
      />

      <p className="relative font-display text-[120px] font-extrabold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)] md:text-[180px]">
        404
      </p>

      <h1 className="relative mt-4 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        Страница промахнулась
      </h1>

      <p className="relative mt-3 max-w-[42ch] text-muted">
        Такого адреса у нас нет. Возможно, ссылка устарела или в ней опечатка.
      </p>

      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-[52px] items-center rounded-chip bg-violet px-8 font-medium text-white transition duration-200 hover:shadow-[0_12px_40px_rgba(124,92,255,0.42)]"
        >
          На главную
        </Link>
        <Link
          to="/catalog"
          className="inline-flex h-[52px] items-center rounded-chip border border-line-strong px-8 font-medium transition-colors hover:bg-surface"
        >
          В каталог
        </Link>
      </div>
    </div>
  );
}
