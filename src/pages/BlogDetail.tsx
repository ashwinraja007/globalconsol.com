
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  is_published?: boolean;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', articleSlug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        setNotFound(true);
      } else {
        setArticle(data);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
              <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {formatDate(article.published_at)}
              </Badge>
              <h1 className="text-4xl font-bold leading-tight mb-4">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {article.excerpt}
              </p>
            </div>
            
            {article.image && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">
              {article.content}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
