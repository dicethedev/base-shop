const SHOPIFY_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "your-shop.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "your-token";

const SHOPIFY_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`;

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    url: string;
    altText?: string;
  }[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    availableForSale: boolean;
  }[];
}

const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(limit = 10): Promise<ShopifyProduct[]> {
  try {
    const response = await fetch(SHOPIFY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: { first: limit },
      }),
    });

    const { data } = await response.json();

    return data.products.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      handle: edge.node.handle,
      images: edge.node.images.edges.map((img: any) => ({
        url: img.node.url,
        altText: img.node.altText,
      })),
      priceRange: edge.node.priceRange,
      variants: edge.node.variants.edges.map((variant: any) => ({
        id: variant.node.id,
        title: variant.node.title,
        price: variant.node.price,
        availableForSale: variant.node.availableForSale,
      })),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return demo products if Shopify fails
    return getDemoProducts();
  }
}

// Demo products for when Shopify isn't configured
export function getDemoProducts(): ShopifyProduct[] {
  return [
    {
      id: "demo-1",
      title: "Base Builder Hoodie",
      description:
        "Premium hoodie for Base builders. Soft, comfortable, and perfect for coding sessions.",
      handle: "base-builder-hoodie",
      images: [
        {
          url: "/placeholder.svg?height=300&width=300",
          altText: "Base Builder Hoodie",
        },
      ],
      priceRange: {
        minVariantPrice: {
          amount: "0.05",
          currencyCode: "USDC",
        },
      },
      variants: [
        {
          id: "demo-1-variant",
          title: "Default",
          price: { amount: "0.05", currencyCode: "USDC" },
          availableForSale: true,
        },
      ],
    },
    {
      id: "demo-2",
      title: "Base NFT Collection",
      description:
        "Exclusive digital collectible showcasing Base ecosystem artwork.",
      handle: "base-nft-collection",
      images: [
        {
          url: "/placeholder.svg?height=300&width=300",
          altText: "Base NFT Collection",
        },
      ],
      priceRange: {
        minVariantPrice: {
          amount: "0.01",
          currencyCode: "USDC",
        },
      },
      variants: [
        {
          id: "demo-2-variant",
          title: "Default",
          price: { amount: "0.01", currencyCode: "USDC" },
          availableForSale: true,
        },
      ],
    },
    {
      id: "demo-3",
      title: "Base Sticker Pack",
      description:
        "High-quality vinyl stickers featuring Base logos and designs.",
      handle: "base-sticker-pack",
      images: [
        {
          url: "/placeholder.svg?height=300&width=300",
          altText: "Base Sticker Pack",
        },
      ],
      priceRange: {
        minVariantPrice: {
          amount: "0.02",
          currencyCode: "USDC",
        },
      },
      variants: [
        {
          id: "demo-3-variant",
          title: "Default",
          price: { amount: "0.02", currencyCode: "USDC" },
          availableForSale: true,
        },
      ],
    },
    {
      id: "demo-4",
      title: "Base Developer Mug",
      description:
        "Perfect coffee mug for Base developers. Dishwasher safe ceramic.",
      handle: "base-developer-mug",
      images: [
        {
          url: "/placeholder.svg?height=300&width=300",
          altText: "Base Developer Mug",
        },
      ],
      priceRange: {
        minVariantPrice: {
          amount: "0.03",
          currencyCode: "USDC",
        },
      },
      variants: [
        {
          id: "demo-4-variant",
          title: "Default",
          price: { amount: "0.03", currencyCode: "USDC" },
          availableForSale: true,
        },
      ],
    },
  ];
}
