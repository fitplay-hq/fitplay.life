"use client";

import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });

  const faqCategories = [
    { id: 'all', name: 'All Topics' },
    { id: 'credits', name: 'Credits & Payments' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'products', name: 'Products & Services' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'wellness', name: 'Wellness Program' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'credits',
      question: 'How do I check my credit balance?',
      answer: 'You can view your credit balance on the My Benefits page. It shows your total credits, used credits, and remaining balance. You can also see your credit history and expiry dates.',
      helpful: 15,
      tags: ['credits', 'balance']
    },
    {
      id: 2,
      category: 'credits',
      question: 'When do my wellness credits expire?',
      answer: 'Wellness credits typically expire at the end of each calendar year (December 31st). Any unused credits will be forfeited, so make sure to use them before the expiry date.',
      helpful: 23,
      tags: ['credits', 'expiry']
    },
    {
      id: 3,
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'After placing an order, you will receive a confirmation email with tracking information. You can also track your orders in the Profile section under Order History.',
      helpful: 18,
      tags: ['orders', 'tracking']
    },
    {
      id: 4,
      category: 'orders',
      question: 'What is the return policy?',
      answer: 'Most products can be returned within 30 days of delivery in their original condition. Digital services and health screenings are typically non-refundable. Check the specific product page for return eligibility.',
      helpful: 12,
      tags: ['returns', 'policy']
    },
    {
      id: 5,
      category: 'products',
      question: 'How do I know if a product is covered by my company benefits?',
      answer: 'All products in our Wellness Store are pre-approved by your company. You can purchase any item using your wellness credits. The credit cost is clearly displayed on each product page.',
      helpful: 27,
      tags: ['benefits', 'coverage']
    },
    {
      id: 6,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to your Profile page and click the Edit button in the Personal Information section. You can update your name and email address. Department and Employee ID cannot be changed.',
      helpful: 8,
      tags: ['profile', 'settings']
    },
    {
      id: 7,
      category: 'wellness',
      question: 'How is my wellness score calculated?',
      answer: 'Your wellness score is based on your activity level, completed health screenings, product purchases, and participation in wellness challenges. It is updated monthly and helps track your wellness journey.',
      helpful: 31,
      tags: ['wellness', 'score']
    },
    {
      id: 8,
      category: 'wellness',
      question: 'Can I earn bonus credits?',
      answer: 'Yes! You can earn bonus credits by completing wellness challenges, referring colleagues, writing product reviews, and participating in company wellness events.',
      helpful: 22,
      tags: ['bonus', 'credits', 'challenges']
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our wellness support team',
      availability: 'Mon-Fri, 9 AM - 6 PM IST',
      action: 'Start Chat',
      primary: true
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      primary: false
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      availability: 'Mon-Fri, 9 AM - 5 PM IST',
      action: 'Call Now',
      primary: false
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      category: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl text-primary mb-4">Help & Support</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our wellness support team
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help topics, keywords, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {faqCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {contactOptions.map((option, index) => (
          <Card key={index} className={`hover:shadow-lg transition-shadow ${
            option.primary ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
          }`}>
            <CardContent className="p-6 text-center space-y-4">
              <div className={`w-12 h-12 rounded-lg mx-auto flex items-center justify-center ${
                option.primary ? 'bg-emerald-500' : 'bg-gray-100'
              }`}>
                <option.icon className={`w-6 h-6 ${
                  option.primary ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h3 className="font-medium text-primary mb-1">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                <p className="text-xs text-gray-500">{option.availability}</p>
              </div>
              <Button 
                variant={option.primary ? 'default' : 'outline'} 
                size="sm"
                className={option.primary ? 'bg-emerald-500 hover:bg-emerald-600' : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'}
              >
                {option.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-primary">Frequently Asked Questions</h2>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              {filteredFaqs.length} results
            </Badge>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`faq-${faq.id}`} className="border-0">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="text-left">
                          <h3 className="font-medium text-primary">{faq.question}</h3>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                              {faqCategories.find(cat => cat.id === faq.category)?.name}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {faq.helpful} people found this helpful
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Was this helpful?</span>
                            <Button variant="outline" size="sm" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                              👍 Yes
                            </Button>
                            <Button variant="outline" size="sm">
                              👎 No
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse all categories
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={contactForm.category} onValueChange={(value) => setContactForm({...contactForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credits">Credits & Payments</SelectItem>
                      <SelectItem value="orders">Orders & Shipping</SelectItem>
                      <SelectItem value="products">Products & Services</SelectItem>
                      <SelectItem value="account">Account & Profile</SelectItem>
                      <SelectItem value="wellness">Wellness Program</SelectItem>
                      <SelectItem value="technical">Technical Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Describe your issue or question in detail..."
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-50 hover:text-emerald-600" asChild>
                <a href="#track-order">Track My Order</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-50 hover:text-emerald-600" asChild>
                <a href="#return-policy">Return Policy</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-50 hover:text-emerald-600" asChild>
                <a href="#wellness-guide">Wellness Program Guide</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-50 hover:text-emerald-600" asChild>
                <a href="#credit-guide">Credit Usage Guide</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}