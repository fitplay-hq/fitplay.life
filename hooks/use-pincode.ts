import { useState, useCallback } from "react";
import { toast } from "sonner";

interface PincodeData {
  city: string;
  state: string;
}

export function usePincodeLookup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupPincode = useCallback(
    async (pincode: string): Promise<PincodeData | null> => {
      if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        setError("Invalid pincode");
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const origin =
          typeof window !== "undefined" ? window.location.origin : "";
        const response = await fetch(
          `${origin}/api/pincode?pincode=${pincode}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch pincode data");
        }

        return data as PincodeData;
      } catch (err: any) {
        console.error("Pincode lookup error:", err);
        const errorMessage = err.message || "Error fetching pincode data";
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { lookupPincode, isLoading, error };
}
