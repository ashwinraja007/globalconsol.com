
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  image: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  is_published: boolean | null;
}

const BlogManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const { toast } = useToast();

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!editingArticle) {
      setSlug(generateSlug(value));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery-images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("gallery-images")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const articleData = {
        title,
        content,
        excerpt: excerpt || null,
        slug,
        image: imageUrl || (editingArticle?.image || null),
        is_published: true,
      };

      if (editingArticle) {
        const { error } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", editingArticle.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Article updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("articles")
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
    setEditingArticle(article);
    setTitle(article.title);
    setContent(article.content);
    setExcerpt(article.excerpt || "");
    setSlug(article.slug);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

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
    setTitle("");
    setContent("");
    setExcerpt("");
    setSlug("");
    setImageFile(null);
    setEditingArticle(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingArticle ? "Edit Article" : "Create New Article"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter article title"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-slug"
                required
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the article"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content here..."
                rows={10}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Featured Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingArticle ? "Update Article" : "Create Article"}
              </Button>
              {editingArticle && (
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
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <h3 className="font-medium">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.excerpt}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      <span>Slug: /{article.slug}</span>
                      <span className="ml-4">{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit className="h-4 w-4" />
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
              
              {articles.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No articles yet. Create your first article!
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManager;
