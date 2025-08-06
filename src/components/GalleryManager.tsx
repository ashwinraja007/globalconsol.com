
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Upload, Image as ImageIcon } from "lucide-react";

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

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const { toast } = useToast();

  // Upload form states
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    alt_text: "",
    file: null as File | null,
  });

  // Edit form states
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    alt_text: "",
  });

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
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

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please provide both title and image file",
      });
      return;
    }

    setUploadLoading(true);
    try {
      const imageUrl = await uploadImage(uploadForm.file);

      const { error } = await supabase
        .from("gallery")
        .insert({
          title: uploadForm.title,
          description: uploadForm.description || null,
          alt_text: uploadForm.alt_text || null,
          image_url: imageUrl,
          is_visible: true,
        });

      if (error) throw error;

      toast({
        title: "Image uploaded successfully",
        description: "The image has been added to the gallery",
      });

      setUploadForm({ title: "", description: "", alt_text: "", file: null });
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

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setEditForm({
      title: image.title,
      description: image.description || "",
      alt_text: image.alt_text || "",
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      const { error } = await supabase
        .from("gallery")
        .update({
          title: editForm.title,
          description: editForm.description || null,
          alt_text: editForm.alt_text || null,
        })
        .eq("id", editingImage.id);

      if (error) throw error;

      toast({
        title: "Image updated successfully",
        description: "The image details have been updated",
      });

      setEditingImage(null);
      setEditForm({ title: "", description: "", alt_text: "" });
      fetchGalleryImages();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", image.id);

      if (error) throw error;

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

  const toggleVisibility = async (image: GalleryImage) => {
    try {
      const { error } = await supabase
        .from("gallery")
        .update({ is_visible: !image.is_visible })
        .eq("id", image.id);

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

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                placeholder="Enter image title"
                required
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                placeholder="Enter image description"
                rows={3}
              />
            </div>
            
            <div>
              <Label>Alt Text</Label>
              <Input
                value={uploadForm.alt_text}
                onChange={(e) => setUploadForm({ ...uploadForm, alt_text: e.target.value })}
                placeholder="Descriptive text for accessibility"
              />
            </div>
            
            <div>
              <Label>Image File *</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                required
              />
            </div>
            
            <Button type="submit" disabled={uploadLoading} className="w-full">
              {uploadLoading ? "Uploading..." : "Upload Image"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
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
                          onCheckedChange={() => toggleVisibility(image)}
                        />
                        <span className="text-sm">Visible</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(image)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(image)}
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

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Image</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Alt Text</Label>
                  <Input
                    value={editForm.alt_text}
                    onChange={(e) => setEditForm({ ...editForm, alt_text: e.target.value })}
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
};

export default GalleryManager;
