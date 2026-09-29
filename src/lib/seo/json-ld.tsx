import React from 'react';
import { Product } from '@/types';
import { SITE_CONFIG, SITE_URL } from './site-config';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.supportEmail,
    sameAs: [
      SITE_CONFIG.socialLinks.twitter,
      SITE_CONFIG.socialLinks.github,
    ],
  };
}

export function generateWebSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_URL,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateProductJsonLd(product: Product): Record<string, unknown> {
  const rate =
    typeof product.rating === 'object' && product.rating !== null
      ? product.rating.rate
      : Number(product.rating || 0);

  const count =
    typeof product.rating === 'object' && product.rating !== null
      ? product.rating.count
      : product.reviews?.length || 1;

  const images: string[] = [];
  if (product.image) images.push(product.image);
  if (product.thumbnail && !images.includes(product.thumbnail)) images.push(product.thumbnail);
  if (Array.isArray(product.images)) {
    product.images.forEach((img) => {
      if (img && !images.includes(img)) images.push(img);
    });
  }

  const inStock = product.stock === undefined || product.stock > 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || `${product.title} available now at ${SITE_CONFIG.name}`,
    image: images.length > 0 ? images : [`${SITE_URL}/favicon.ico`],
    sku: `PROD-${product.id}`,
    mpn: `${product.id}`,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: product.brand || SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.id}`,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      priceValidUntil: '2028-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    },
    ...(rate > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rate.toFixed(1),
            reviewCount: Math.max(1, count),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  };
}

export function generateBreadcrumbJsonLd(
  breadcrumbs: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.path.startsWith('http') ? crumb.path : `${SITE_URL}${crumb.path}`,
    })),
  };
}

export function generateItemListJsonLd(products: Product[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.slice(0, 10).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/products/${product.id}`,
      name: product.title,
    })),
  };
}
