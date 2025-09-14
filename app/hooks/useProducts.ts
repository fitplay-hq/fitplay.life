import useSWR from 'swr';
import { ProductModelType } from '@/lib/generated/zod/schemas';

const fetchProducts = async (): Promise<ProductModelType[]> => {
  const response = await fetch('/api/products').then(res => res.json());
  return response.data;
};

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<ProductModelType[]>('products', fetchProducts, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    dedupingInterval: 60000, // 1 minute deduplication
    focusThrottleInterval: 60000, // 1 minute throttle
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    loadingTimeout: 10000,
    fallbackData: [], // Prevent showing 0 products during initial load
  });

  return {
    products: data || [],
    isLoading,
    error,
    mutate,
  };
};
