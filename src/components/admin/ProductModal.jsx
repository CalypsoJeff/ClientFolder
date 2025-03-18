/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Plus, Minus, X } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "Custom"];

const ProductModal = ({ isOpen, onClose, onSubmit, product, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
    brand: "",
    material: "",
    images: [],
    sizes: [{ size: "S", colors: [{ color: "", stock: 0 }] }],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        discount: product.discount || 0,
        category: product.category?._id || "",
        brand: product.brand || "",
        material: product.material || "",
        images: product.images || [],
        sizes:
          product.sizes?.length > 0
            ? product.sizes
            : [{ size: "S", colors: [{ color: "", stock: 0 }] }],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        discount: 0,
        category: "",
        brand: "",
        material: "",
        images: [],
        sizes: [{ size: "S", colors: [{ color: "", stock: 0 }] }],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSizeChange = (sizeIndex, value) => {
    const newSizes = [...formData.sizes];
    newSizes[sizeIndex].size = value;
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleColorChange = (sizeIndex, colorIndex, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[sizeIndex].colors[colorIndex][field] = value;
    setFormData({ ...formData, sizes: newSizes });
  };

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [
        ...formData.sizes,
        { size: "S", colors: [{ color: "", stock: 0 }] },
      ],
    });
  };

  const removeSize = (sizeIndex) => {
    const newSizes = formData.sizes.filter((_, index) => index !== sizeIndex);
    setFormData({ ...formData, sizes: newSizes });
  };

  const addColor = (sizeIndex) => {
    const newSizes = [...formData.sizes];
    newSizes[sizeIndex].colors.push({ color: "", stock: 0 });
    setFormData({ ...formData, sizes: newSizes });
  };

  const removeColor = (sizeIndex, colorIndex) => {
    const newSizes = [...formData.sizes];
    newSizes[sizeIndex].colors = newSizes[sizeIndex].colors.filter(
      (_, index) => index !== colorIndex
    );
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent default form submission
    onSubmit(formData); // ✅ Call with formData instead of event
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="">
                        No categories available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </div>

            {/* Size and Color Variants */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Sizes and Colors</Label>
                <Button
                  type="button"
                  onClick={addSize}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Size
                </Button>
              </div>

              <div className="space-y-4">
                {formData.sizes.map((sizeData, sizeIndex) => (
                  <Card key={sizeIndex}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-1/3">
                          <Select
                            value={sizeData.size}
                            onValueChange={(value) =>
                              handleSizeChange(sizeIndex, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              {AVAILABLE_SIZES.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={() => addColor(sizeIndex)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="w-4 h-4 mr-1" /> Add Color
                          </Button>
                          {formData.sizes.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeSize(sizeIndex)}
                              variant="destructive"
                              size="sm"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {sizeData.colors.map((colorData, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="flex gap-2 items-center"
                          >
                            <Input
                              placeholder="Color"
                              value={colorData.color}
                              onChange={(e) =>
                                handleColorChange(
                                  sizeIndex,
                                  colorIndex,
                                  "color",
                                  e.target.value
                                )
                              }
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              placeholder="Stock"
                              value={colorData.stock}
                              onChange={(e) =>
                                handleColorChange(
                                  sizeIndex,
                                  colorIndex,
                                  "stock",
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-24"
                              min="0"
                            />
                            {sizeData.colors.length > 1 && (
                              <Button
                                type="button"
                                onClick={() =>
                                  removeColor(sizeIndex, colorIndex)
                                }
                                variant="destructive"
                                size="sm"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{product ? "Update" : "Add"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
