import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { api } from '@/lib/api/client';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo/site-config';
import {
  JsonLd,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo/json-ld';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await api.getProductById(id);
    if (!product || !product.id) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be located in our catalog.',
      };
    }

    const title = `${product.title} - $${product.price.toFixed(2)}`;
    const description =
      product.description ||
      `Buy ${product.title} for $${product.price.toFixed(2)} with express shipping and warranty on ${SITE_CONFIG.name}.`;
    const imageUrl = product.thumbnail || product.image || `${SITE_URL}/favicon.ico`;
    const canonical = `/products/${product.id}`;

    return {
      title,
      description,
      openGraph: {
        title: `${product.title} | ${SITE_CONFIG.name}`,
        description,
        url: `${SITE_URL}${canonical}`,
        type: 'website',
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 800,
            alt: product.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical,
      },
    };
  } catch {
    return {
      title: 'Product Details',
      description: `View product specifications and reviews on ${SITE_CONFIG.name}.`,
    };
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const product = await api.getProductById(id);

    if (!product || !product.id) {
      notFound();
    }

    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      {
        name: product.category,
        path: `/products?category=${encodeURIComponent(product.category.toLowerCase())}`,
      },
      { name: product.title, path: `/products/${product.id}` },
    ];

    const productJsonLd = generateProductJsonLd(product);
    const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);

    return (
      <main className="min-h-screen bg-background py-6">
        <JsonLd data={productJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        <ProductDetailView product={product} />
      </main>
    );
  } catch {
    notFound();
  }
}
