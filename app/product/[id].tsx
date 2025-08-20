import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ToastManager';

interface ProductDetailProps {
  addToCart: (product: any) => void;
  getCartItemQuantity: (title: string, brand: string) => number;
  updateCartQuantity: (title: string, brand: string, quantity: number) => void;
}

interface CartItem {
  id: number;
  title: string;
  brand: string;
  credits: number;
  image: string;
  quantity: number;
}

export default function ProductPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartAnimation, setCartAnimation] = useState(false);

  const getCartItemQuantity = (productTitle: string, productBrand: string): number => {
    const item = cartItems.find(item => 
      item.title === productTitle && item.brand === productBrand
    );
    return item ? item.quantity : 0;
  };

  const removeFromCart = (id: number) => {
    const removedItem = cartItems.find(item => item.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    if (removedItem) {
      toast.info(
        `${removedItem.title} removed from cart`,
        undefined,
        2000
      );
    }
  };

  const { toast } = useToast()

  const addToCart = (product: any) => {
    let wasUpdated = false;
    let isNewItem = false;
    let newQuantity = 1;
    
    setCartItems(prev => {
      // Check if product already exists in cart
      const existingItem = prev.find(item => 
        item.title === product.title && item.brand === product.brand
      );
      
      if (existingItem) {
        // If exists, increment quantity
        wasUpdated = true;
        newQuantity = existingItem.quantity + 1;
        return prev.map(item =>
          item.title === product.title && item.brand === product.brand
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // If new product, add to cart with quantity 1
        isNewItem = true;
        return [...prev, { 
          ...product, 
          id: Date.now() + Math.random(), // Ensure unique ID
          quantity: 1 
        }];
      }
    });

    // Trigger cart animation
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 600);

    // Show custom toast notification
    if (wasUpdated) {
      toast.success(
        `${product.title} quantity updated!`,
        `Now you have ${newQuantity} in your cart.`,
        3000
      );
    } else if (isNewItem) {
      toast.success(
        `${product.title} added to cart!`,
        `${product.credits} credits - Great choice for your wellness journey!`,
        3000
      );
    }
  };


  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app this would come from API
  const product = {
    id: parseInt(id as string || '1'),
    title: 'Premium Adjustable Dumbbells Set',
    brand: 'FlexFit',
    credits: 200,

    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: 'Transform your home workout with this premium adjustable dumbbell set. Features quick-change weight system from 5-50 lbs per dumbbell, comfortable grip handles, and space-saving design perfect for any home gym setup.',
    features: [
      'Adjustable weight from 5-50 lbs per dumbbell',
      'Quick-change dial system for easy weight selection',
      'Ergonomic comfort grip handles',
      'Compact storage tray included',
      'Durable cast iron weight plates',
      '2-year manufacturer warranty'
    ],
    specifications: {
      'Weight Range': '5-50 lbs per dumbbell',
      'Material': 'Cast iron with comfort grip',
      'Dimensions': '16.5" x 8" x 9"',
      'Weight': '90 lbs total',
      'Warranty': '2 years'
    },
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  };

  const faqs = [
    {
      question: 'How quickly can I change weights?',
      answer: 'The dial system allows you to change weights in under 3 seconds. Simply turn the dial to your desired weight and lift.'
    },
    {
      question: 'What is the warranty coverage?',
      answer: 'This product comes with a 2-year manufacturer warranty covering defects in materials and workmanship.'
    },
    {
      question: 'Is assembly required?',
      answer: 'Minimal assembly required. The dumbbells come pre-assembled, you just need to set up the storage tray.'
    },
    {
      question: 'Can I use these for all muscle groups?',
      answer: 'Yes, these adjustable dumbbells are perfect for full-body workouts including arms, chest, back, shoulders, and legs.'
    }
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const updateCartQuantityByProduct = (productTitle: string, productBrand: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0
      const itemToRemove = cartItems.find(item => 
        item.title === productTitle && item.brand === productBrand
      );
      if (itemToRemove) {
        removeFromCart(itemToRemove.id);
      }
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.title === productTitle && item.brand === productBrand
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/store" className="hover:text-emerald-600 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Store
        </Link>
        <span>/</span>
        <span>Fitness Equipment</span>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="text-emerald-600 bg-emerald-50">
                {product.brand}
              </Badge>
              {product.inStock && (
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  In Stock
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl text-primary mb-4">
              {product.title}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl text-primary font-bold">{product.credits} credits</span>
              <Badge className="bg-emerald-100 text-emerald-800">
                Great Value
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              Use your company wellness credits to purchase
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">{product.description}</p>
            
            <div>
              <h3 className="font-medium text-primary mb-2">Key Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {getCartItemQuantity(product.title, product.brand) === 0 ? (
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - {product.credits * quantity} credits
              </Button>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center border-2 border-emerald-300 rounded-lg bg-emerald-50">
                  <button
                    onClick={() => updateCartQuantityByProduct(product.title, product.brand, 
                      getCartItemQuantity(product.title, product.brand) - 1)}
                    className="px-4 py-3 hover:bg-emerald-100 text-emerald-700 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 text-emerald-800 font-bold text-lg min-w-[60px] text-center">
                    {getCartItemQuantity(product.title, product.brand)}
                  </span>
                  <button
                    onClick={() => updateCartQuantityByProduct(product.title, product.brand, 
                      getCartItemQuantity(product.title, product.brand) + 1)}
                    className="px-4 py-3 hover:bg-emerald-100 text-emerald-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex space-x-3">
              <Button variant="outline" size="lg" className="flex-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                <Heart className="w-5 h-5 mr-2" />
                Save for Later
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Sections */}
      <div className="mt-16 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium text-primary mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">{key}</span>
                    <span className="text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vendor Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">FF</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary">{product.brand}</h3>
                  <p className="text-gray-600">Trusted Fitness Partner</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                FlexFit has been providing premium fitness equipment for over 15 years, 
                helping millions achieve their wellness goals.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8 Brand Rating</span>
                </div>
                <div>500+ Products</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-medium text-primary mb-6">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-medium text-primary mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our wellness experts are here to help you make the right choice
            </p>
            <Link href="/support">
              <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                Contact Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}