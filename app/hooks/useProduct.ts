import useSWR from 'swr';
import { ProductModelType } from '@/lib/generated/zod/schemas';

const fetchProduct = async (id: string): Promise<ProductModelType | null> => {
  const response = await fetch(`/api/products/product?id=${id}`).then(res => res.json());
  return response.data
};

export const useProduct = (id: string) => {
  const { data, error, isLoading } = useSWR<ProductModelType | null>(
    id ? `product/${id}` : null,
    () => fetchProduct(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log({data})

  return {
    product: data,
    isLoading,
    error,
    mutate: () => {}, // Placeholder for future use
  };
};
