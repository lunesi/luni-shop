export type Category = "mice" | "pads" | "parts";

export type Spec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  tags: string[];
  badge: string;
  inStock: boolean;
  description: string;
  specs: Spec[];
};

export const CATEGORY_LABELS: Record<Category, string> = {
  mice: "Мыши",
  pads: "Коврики",
  parts: "Глайды и грипсы",
};
