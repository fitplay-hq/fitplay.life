import useSWR from 'swr';

interface Order {
  id: string;
  createdAt: string;
  amount: number;
  status: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    variant: {
      product: {
        name: string;
        images: string[];
        vendorName: string;
      };
    };
  }>;
}

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch('/api/orders').then(res => res.json());
  return response.orders || [];
};

export const useOrders = () => {
  const { data, error, isLoading, mutate } = useSWR<Order[]>(
    typeof window !== 'undefined' ? 'orders' : null,
    fetchOrders,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
      dedupingInterval: 30000,
      focusThrottleInterval: 30000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      loadingTimeout: 10000,
      fallbackData: [],
    }
  );

  return {
    orders: data || [],
    isLoading,
    error,
    mutate,
  };
};