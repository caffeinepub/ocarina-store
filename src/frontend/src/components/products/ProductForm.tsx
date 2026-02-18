import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '../../backend';

interface ProductFormProps {
  product?: { id: string; data: Product };
  onSubmit: (data: { id: string; title: string; description: string; price: bigint; imageReference: string }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, isSubmitting }: ProductFormProps) {
  const [formData, setFormData] = useState({
    id: product?.id || '',
    title: product?.data.title || '',
    description: product?.data.description || '',
    price: product?.data.price ? Number(product.data.price) / 100 : 0,
    imageReference: product?.data.imageReference || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        title: product.data.title,
        description: product.data.description,
        price: Number(product.data.price) / 100,
        imageReference: product.data.imageReference,
      });
    }
  }, [product]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.id.trim()) {
      newErrors.id = 'Product ID is required';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (!formData.imageReference.trim()) {
      newErrors.imageReference = 'Image reference is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const priceInCents = BigInt(Math.round(formData.price * 100));

    await onSubmit({
      id: formData.id.trim(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: priceInCents,
      imageReference: formData.imageReference.trim(),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
        <CardDescription>
          {product ? 'Update the product details below' : 'Fill in the details to create a new product'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Product ID</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              disabled={!!product}
              placeholder="unique-product-id"
            />
            {errors.id && <p className="text-sm text-destructive">{errors.id}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Product title"
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product description"
              rows={4}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
            />
            {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageReference">Image Reference</Label>
            <Input
              id="imageReference"
              value={formData.imageReference}
              onChange={(e) => setFormData({ ...formData, imageReference: e.target.value })}
              placeholder="image-url-or-reference"
            />
            {errors.imageReference && <p className="text-sm text-destructive">{errors.imageReference}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

