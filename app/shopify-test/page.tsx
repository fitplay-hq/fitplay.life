"use client";

export default function ConnectShopifyButton() {
  const handleConnect = () => {
    window.location.href =
      "/api/shopify/install?shop=demo-123483729127387293872387970.myshopify.com";
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-green-600 text-white rounded-md"
    >
      Connect Test Shopify Store
    </button>
  );
}
