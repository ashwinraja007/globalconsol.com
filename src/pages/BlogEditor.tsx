
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, FileText, Edit, X, Bold, Link, Italic, Underline, List, Image } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  alt_text: string | null;
  is_visible: boolean | null;
  created_at: string;
  updated_at: string;
}

type ActiveView = "blog" | "gallery";

const BlogEditor = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>("blog");
  const [uploadLoading, setUploadLoading] = useState(false);
  const { toast } = useToast();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Blog form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // Gallery upload form state
  const [galleryUploadForm, setGalleryUploadForm] = useState({
    title: "",
    description: "",
    alt_text: "",
    file: null as File | null,
  });

  // Gallery edit form state
  const [galleryEditForm, setGalleryEditForm] = useState({
    title: "",
    description: "",
    alt_text: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (activeView === "gallery") {
      fetchGalleryImages();
    }
  }, [activeView]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching images",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!editingId) {
      const generatedSlug = generateSlug(value);
      setSlug(generatedSlug);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !excerpt || !slug) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);
    try {
      let featuredImage = null;
      
      if (selectedFile) {
        featuredImage = await uploadImage(selectedFile);
      }

      const articleData = {
        title,
        content,
        excerpt,
        slug,
        image: featuredImage,
        is_published: true,
      };

      if (editingId) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingId);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Article updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Article created successfully",
        });
      }

      resetForm();
      fetchArticles();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: Article) => {
    setTitle(article.title);
    setContent(article.content);
    setExcerpt(article.excerpt);
    setSlug(article.slug);
    setEditingId(article.id);
    if (article.image) {
      setImagePreview(article.image);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
      
      fetchArticles();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setExcerpt('');
    setSlug('');
    setSelectedFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleGalleryFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUploadForm.file || !galleryUploadForm.title) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please provide both title and image file",
      });
      return;
    }

    setUploadLoading(true);
    try {
      const imageUrl = await uploadImage(galleryUploadForm.file);

      const { error: dbError } = await supabase
        .from('gallery')
        .insert({
          title: galleryUploadForm.title,
          description: galleryUploadForm.description || null,
          alt_text: galleryUploadForm.alt_text || null,
          image_url: imageUrl,
          is_visible: true,
        });

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Image uploaded successfully",
        description: "The image has been added to the gallery",
      });

      setGalleryUploadForm({ title: "", description: "", alt_text: "", file: null });
      fetchGalleryImages();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message,
      });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleGalleryEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setGalleryEditForm({
      title: image.title,
      description: image.description || "",
      alt_text: image.alt_text || "",
    });
  };

  const handleUpdateGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          title: galleryEditForm.title,
          description: galleryEditForm.description || null,
          alt_text: galleryEditForm.alt_text || null,
        })
        .eq('id', editingImage.id);

      if (error) throw error;

      toast({
        title: "Image updated successfully",
        description: "The image details have been updated",
      });

      setEditingImage(null);
      setGalleryEditForm({ title: "", description: "", alt_text: "" });
      fetchGalleryImages();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    }
  };

  const handleGalleryDelete = async (image: GalleryImage) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', image.id);

      if (dbError) throw dbError;

      toast({
        title: "Image deleted successfully",
        description: "The image has been removed from the gallery",
      });

      fetchGalleryImages();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error.message,
      });
    }
  };

  const toggleGalleryVisibility = async (image: GalleryImage) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ is_visible: !image.is_visible })
        .eq('id', image.id);

      if (error) throw error;

      toast({
        title: image.is_visible ? "Image hidden" : "Image made visible",
        description: image.is_visible 
          ? "This image is now hidden from public view" 
          : "This image is now visible to the public",
      });

      fetchGalleryImages();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    }
  };

  const renderBlogEditor = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Article' : 'Create New Article'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-from-title"
                required
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                ref={contentRef}
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                required
                placeholder="Write your article content here..."
              />
            </div>

            <div>
              <Label htmlFor="image">Featured Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingId ? 'Update Article' : 'Create Article'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Published Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 border rounded">
                <div>
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-gray-600">{article.excerpt}</p>
                  <div className="flex gap-4 text-xs text-gray-400 mt-1">
                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    <span>Slug: /{article.slug}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(article)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGalleryEditor = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGalleryFileUpload} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={galleryUploadForm.title}
                onChange={(e) => setGalleryUploadForm({ ...galleryUploadForm, title: e.target.value })}
                placeholder="Enter image title"
                required
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={galleryUploadForm.description}
                onChange={(e) => setGalleryUploadForm({ ...galleryUploadForm, description: e.target.value })}
                placeholder="Enter image description"
                rows={3}
              />
            </div>
            
            <div>
              <Label>Alt Text</Label>
              <Input
                value={galleryUploadForm.alt_text}
                onChange={(e) => setGalleryUploadForm({ ...galleryUploadForm, alt_text: e.target.value })}
                placeholder="Descriptive text for accessibility"
              />
            </div>
            
            <div>
              <Label>Image File *</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setGalleryUploadForm({ ...galleryUploadForm, file: e.target.files?.[0] || null })}
                required
              />
            </div>
            
            <Button type="submit" disabled={uploadLoading} className="w-full">
              {uploadLoading ? "Uploading..." : "Upload Image"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images ({galleryImages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Image className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="border rounded-lg overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.alt_text || image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{image.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={image.is_visible || false}
                          onCheckedChange={() => toggleGalleryVisibility(image)}
                        />
                        <span className="text-sm">Visible</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGalleryEdit(image)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGalleryDelete(image)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Image</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateGalleryImage} className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={galleryEditForm.title}
                    onChange={(e) => setGalleryEditForm({ ...galleryEditForm, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={galleryEditForm.description}
                    onChange={(e) => setGalleryEditForm({ ...galleryEditForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Alt Text</Label>
                  <Input
                    value={galleryEditForm.alt_text}
                    onChange={(e) => setGalleryEditForm({ ...galleryEditForm, alt_text: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingImage(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Content Management</h1>
            
            <div className="flex gap-4 mb-6">
              <Button
                variant={activeView === "blog" ? "default" : "outline"}
                onClick={() => setActiveView("blog")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Blog Editor
              </Button>
              <Button
                variant={activeView === "gallery" ? "default" : "outline"}
                onClick={() => setActiveView("gallery")}
                className="flex items-center gap-2"
              >
                <Image className="h-4 w-4" />
                Gallery Editor
              </Button>
            </div>
          </div>

          {activeView === "blog" ? renderBlogEditor() : renderGalleryEditor()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogEditor;
