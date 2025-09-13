import useSWR from 'swr';
import { ProductModelType } from '@/lib/generated/zod/schemas';

const fetchProducts = async (): Promise<ProductModelType[]> => {
  const response = await fetch('/api/products').then(res => res.json());
  return response.data;
};

export const useProducts = () => {
  const { data, error, isLoading } = useSWR<ProductModelType[]>('products', fetchProducts, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log({data})

  return {
    products: data || [],
    isLoading,
    error,
    mutate: () => {}, // Placeholder for future use
  };
};
