
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const News = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">News</h1>
          <p className="text-center text-gray-600">This is the news page.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
