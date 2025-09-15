import useSWR, { mutate } from 'swr';
import { ProductModelType } from '@/lib/generated/zod/schemas';

// Fetch all products for admin
export const fetchAdminProducts = async (): Promise<ProductModelType[]> => {
  const response = await fetch('/api/products/product').then(res => res.json());
  return response.data || [];
};

// Fetch single product for admin
export const fetchAdminProduct = async (id: string): Promise<ProductModelType | null> => {
  const response = await fetch(`/api/products/product?id=${id}`).then(res => res.json());
  return response.data || null;
};

// Prefetch products for better performance
export const prefetchAdminProducts = () => {
  return mutate('admin-products', fetchAdminProducts());
};

// Hook for fetching all products
export const useAdminProducts = () => {
  const { data, error, isLoading, mutate: mutateProducts } = useSWR<ProductModelType[]>(
    'admin-products',
    fetchAdminProducts,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
      dedupingInterval: 60000,
      focusThrottleInterval: 60000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      loadingTimeout: 10000,
      fallbackData: [],
    }
  );

  return {
    products: data || [],
    isLoading,
    error,
    mutate: mutateProducts,
  };
};

// Hook for fetching single product
export const useAdminProduct = (id: string | null) => {
  const { data, error, isLoading, mutate: mutateProduct } = useSWR<ProductModelType | null>(
    id ? `admin-product-${id}` : null,
    () => id ? fetchAdminProduct(id) : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    product: data,
    isLoading,
    error,
    mutate: mutateProduct,
  };
};

// Create product
export const createAdminProduct = async (productData: any) => {
  const response = await fetch('/api/products/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create product');
  }

  const result = await response.json();
  mutate('admin-products'); // Invalidate products list
  return result.data;
};

// Update product
export const updateAdminProduct = async (productData: any) => {
  const response = await fetch('/api/products/product', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update product');
  }

  const result = await response.json();
  mutate('admin-products'); // Invalidate products list
  mutate(`admin-product-${productData.id}`); // Invalidate specific product
  return result.data;
};

// Delete product
export const deleteAdminProduct = async (id: string) => {
  const response = await fetch(`/api/products/product?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete product');
  }

  const result = await response.json();
  mutate('admin-products'); // Invalidate products list
  mutate(`admin-product-${id}`); // Invalidate specific product
  return result.data;
};