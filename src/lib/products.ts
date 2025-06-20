export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  type: "physical" | "digital";
  category: string;
}

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Base Builder Hoodie",
    description:
      "Premium cotton hoodie with Base logo. Perfect for builders who code in comfort.",
    price: "0.02",
    image:
      "https://res.cloudinary.com/dq7ojqycd/image/upload/v1750391815/8e273a01-20af-4210-99cd-0bf9ac796a96_w8dfgx.png",
    type: "physical",
    category: "Apparel",
  },
  {
    id: "2",
    title: "Base Genesis NFT",
    description:
      "Exclusive digital collectible commemorating Base's launch. Limited edition artwork.",
    price: "0.05",
    image:
      "https://res.cloudinary.com/dq7ojqycd/image/upload/v1750392015/c852aca0-8ad0-4732-b274-53385e326f1d_t0ogej.png",
    type: "digital",
    category: "Digital",
  },
  {
    id: "3",
    title: "Base Developer Mug",
    description:
      "Ceramic coffee mug with Base branding. Fuel your coding sessions in style.",
    price: "0.03",
    image:
      "https://res.cloudinary.com/dq7ojqycd/image/upload/v1750392236/88c34325-5ab2-4bce-bf05-807e13b9b389_dwsg13.png",
    type: "physical",
    category: "Accessories",
  },
];

export function getProducts(): Product[] {
  return DEMO_PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return DEMO_PRODUCTS.find((product) => product.id === id);
}
