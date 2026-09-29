import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { ProductDetailView } from '@/components/products/ProductDetailView';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const product = await api.getProductById(id);

    if (!product || !product.id) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-background py-6">
        <ProductDetailView product={product} />
      </main>
    );
  } catch {
    notFound();
  }
}
