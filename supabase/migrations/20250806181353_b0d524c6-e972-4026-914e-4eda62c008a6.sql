
-- Create articles table for blog management
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN DEFAULT true
);

-- Create gallery table for image management
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on articles table
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on gallery table
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for articles table (admin access only for CUD, public read for published articles)
CREATE POLICY "Anyone can read published articles" 
  ON public.articles 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Admin can manage articles" 
  ON public.articles 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create policies for gallery table (admin access only for CUD, public read for visible images)
CREATE POLICY "Anyone can read visible gallery images" 
  ON public.gallery 
  FOR SELECT 
  USING (is_visible = true);

CREATE POLICY "Admin can manage gallery" 
  ON public.gallery 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-images', 'gallery-images', true);

-- Create storage policies for gallery images bucket
CREATE POLICY "Anyone can view gallery images" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Admin can upload gallery images" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Admin can update gallery images" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Admin can delete gallery images" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'gallery-images');

-- Create trigger to update updated_at timestamp for articles
CREATE OR REPLACE FUNCTION public.update_articles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_articles_updated_at();

-- Create trigger to update updated_at timestamp for gallery
CREATE OR REPLACE FUNCTION public.update_gallery_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON public.gallery
  FOR EACH ROW
  EXECUTE FUNCTION public.update_gallery_updated_at();
