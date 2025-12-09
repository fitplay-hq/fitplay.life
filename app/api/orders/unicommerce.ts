import crypto from "crypto";

export const createSaleOrder = async (name: string, address : string, address2: string, city: string, state: string, pincode: string, phone: string, email: string) => {
    try {
        const facilityCode = "wednesdayhealthindiaprivatelimited"
        const addressId = crypto.randomUUID();

        const orderRes = await fetch('https://wednesdayhealthindiaprivatelimited.unicommerce.com/services/rest/v1/oms/saleOrder/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.UNICOMMERCE_ACCESS_TOKEN as string,
                'Facility': facilityCode,
            },
            body: JSON.stringify({
                "order": {
                    "saleOrder": {
                        "cashOnDelivery": false,
                        "addresses": [
                            {
                                "id": addressId,
                                "name": name || "Test User",
                                "addressLine1": address || "string",
                                "addressLine2": address2 || "string",
                                "city": city || "string",
                                "state": state || "string",
                                "pincode": pincode || "string",
                                "phone": phone || "string",
                                "email": email || "string"
                            }
                        ],
                        // Deal with the following before creating an order
                        "saleOrderItems": [
                            {
                                "itemSku": "TESTUAT4",
                                "shippingMethodCode": "STD",
                                "code": "SO1231100023-1",
                                "packetNumber": 1,
                                "giftWrap": true,
                                "giftMessage": "TEST",
                                "facilityCode": "",
                                "totalPrice": "0",
                                "sellingPrice": "950",
                                "prepaidAmount": "0",
                                "discount": "100",
                                "shippingCharges": "50",
                                "storeCredit": "0",
                                "giftWrapCharges": "20"
                            }],
                        "totalCashOnDeliveryCharges": 0,
                        "useVerifiedListings": true
                    }
                }
            })
        });

        const orderData = await orderRes.json();
        console.log('Unicommerce Create Order Response:', orderData);
        return orderData;
    } catch (error) {
        console.error('Error creating Unicommerce order:', error);
        throw error;
    }

}