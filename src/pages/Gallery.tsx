
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  alt_text: string | null;
  created_at: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, title, description, image_url, alt_text, created_at")
        .eq("is_visible", true)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setImages(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading gallery",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of images showcasing our operations and projects
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && images.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="h-24 w-24 mx-auto mb-6 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Images Yet</h3>
              <p className="text-gray-600">
                Gallery images will appear here once they're uploaded.
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-square overflow-hidden">
                    <motion.img
                      src={image.image_url}
                      alt={image.alt_text || image.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                    <div className="text-xs text-gray-400 mt-3">
                      {new Date(image.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl max-h-full w-full relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.alt_text || selectedImage.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-white text-xl font-semibold mb-2">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-gray-300">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
