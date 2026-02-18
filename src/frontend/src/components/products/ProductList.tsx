import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Package } from 'lucide-react';
import type { Product } from '../../backend';

interface ProductListProps {
  products: Array<[string, Product]>;
  onEdit: (id: string, product: Product) => void;
  isLoading: boolean;
}

export default function ProductList({ products, onEdit, isLoading }: ProductListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <Package className="h-12 w-12 text-muted-foreground/50" />
            <div>
              <p className="font-medium">No products yet</p>
              <p className="text-sm text-muted-foreground">Create your first product to get started</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>Manage your product catalog</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Image Ref</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(([id, product]) => (
                <TableRow key={id}>
                  <TableCell className="font-mono text-sm">{id}</TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                  <TableCell className="text-right">${(Number(product.price) / 100).toFixed(2)}</TableCell>
                  <TableCell className="font-mono text-xs truncate max-w-[150px]">
                    {product.imageReference}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(id, product)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

