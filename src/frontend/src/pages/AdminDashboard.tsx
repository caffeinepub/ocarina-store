import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAdminStatus } from '../hooks/useAdminStatus';
import { useListProducts, useCreateProduct, useUpdateProduct } from '../hooks/useQueries';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '../backend';

type EditingProduct = { id: string; data: Product } | null;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdminStatus();
  const { data: products = [], isLoading: productsLoading } = useListProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<EditingProduct>(null);

  // Redirect non-admins
  if (!adminLoading && !isAdmin) {
    navigate({ to: '/access-denied' });
    return null;
  }

  if (adminLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Verifying permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleCreate = async (data: {
    id: string;
    title: string;
    description: string;
    price: bigint;
    imageReference: string;
  }) => {
    try {
      await createProduct.mutateAsync(data);
      toast.success('Product created successfully!');
      setIsAdding(false);
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to create product';
      toast.error(errorMessage);
      console.error('Create product error:', error);
    }
  };

  const handleUpdate = async (data: {
    id: string;
    title: string;
    description: string;
    price: bigint;
    imageReference: string;
  }) => {
    try {
      await updateProduct.mutateAsync(data);
      toast.success('Product updated successfully!');
      setEditingProduct(null);
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to update product';
      toast.error(errorMessage);
      console.error('Update product error:', error);
    }
  };

  const handleEdit = (id: string, product: Product) => {
    setEditingProduct({ id, data: product });
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingProduct(null);
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Button variant="outline" onClick={() => navigate({ to: '/' })} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {(isAdding || editingProduct) && (
        <ProductForm
          product={editingProduct || undefined}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          isSubmitting={createProduct.isPending || updateProduct.isPending}
        />
      )}

      {!isAdding && !editingProduct && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsAdding(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          <ProductList
            products={products}
            onEdit={handleEdit}
            isLoading={productsLoading}
          />
        </div>
      )}
    </div>
  );
}

