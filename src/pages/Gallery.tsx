
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image as ImageIcon } from 'lucide-react';
import { getCurrentCountryFromPath } from '@/services/countryDetection';

interface GalleryImage {
  id: string;
  country: string;
  title: string;
  description: string | null;
  label: string | null;
  image_url: string;
  created_at: string;
}

const countries = [
  { value: "singapore", label: "Singapore" },
  { value: "myanmar", label: "Myanmar" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "pakistan", label: "Pakistan" },
  { value: "srilanka", label: "Sri Lanka" },
];

const Gallery = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);
  
  // Set initial country based on URL path
  const getInitialCountry = () => {
    switch (currentCountry.code) {
      case 'MM': return 'myanmar';
      case 'BD': return 'bangladesh';
      case 'PK': return 'pakistan';
      case 'LK': return 'srilanka';
      default: return 'singapore';
    }
  };

  const [selectedCountry, setSelectedCountry] = useState(getInitialCountry());
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('country', selectedCountry)
        .not('label', 'eq', 'private')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery images:', error);
        throw error;
      }

      setImages(data || []);
    } catch (error) {
      console.error('Gallery fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
            <p className="text-lg text-gray-600 mb-6">Explore our operations across different countries</p>
            
            <div className="flex justify-center mb-8">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gc-gold"></div>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-24 w-24 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Images Available</h3>
              <p className="text-gray-500">No images found for {countries.find(c => c.value === selectedCountry)?.label}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 truncate">{image.title}</h3>
                    {image.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">{image.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
