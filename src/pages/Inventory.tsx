
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Filter, 
  SlidersHorizontal 
} from "lucide-react";
import ProductModal from "@/components/ProductModal";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { Card, CardContent } from "@/components/ui/card";

// Sample data for inventory
const sampleProducts = [
  { 
    id: 1, 
    name: "Hydrating Face Cream", 
    image: "https://i.ibb.co/SXRtZd0S/p1.jpg", 
    category: "Moisturizer", 
    price: 29.99, 
    stock: 42, 
    sku: "FC-001" 
  },
  { 
    id: 2, 
    name: "Vitamin C Serum", 
    image: "https://i.ibb.co/vxvMkNn6/1-19.webp", 
    category: "Serum", 
    price: 39.99, 
    stock: 18, 
    sku: "VS-002" 
  },
  { 
    id: 3, 
    name: "Gentle Cleansing Foam", 
    image: "https://i.ibb.co/QF5Y0LYY/face-wash.webp" , 
    category: "Cleanser", 
    price: 19.99, 
    stock: 53, 
    sku: "CL-003" 
  },
  { 
    id: 4, 
    name: "Exfoliating Scrub", 
    image: "https://i.ibb.co/PGMKMSTX/scrub.webp", 
    category: "Exfoliant", 
    price: 24.99, 
    stock: 27, 
    sku: "EX-004" 
  },
  { 
    id: 5, 
    name: "Night Repair Cream", 
    image: "https://i.ibb.co/2YHGRWwB/night-gel.jpg", 
    category: "Moisturizer", 
    price: 49.99, 
    stock: 8, 
    sku: "NC-005" 
  },
  { 
    id: 6, 
    name: "Hyaluronic Acid Essence", 
    image: "https://i.ibb.co/JYC8Fgk/hyacid.jpg", 
    category: "Essence", 
    price: 34.99, 
    stock: 22, 
    sku: "HA-006" 
  },
  { 
    id: 7, 
    name: "Clay Mask", 
    image: "https://i.ibb.co/wrjkDmxZ/mask.webp", 
    category: "Mask", 
    price: 21.99, 
    stock: 31, 
    sku: "CM-007" 
  },
];

export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  description?: string;
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Sort
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell><span className="text-sm text-gray-500">{product.sku}</span></TableCell>
                      <TableCell className="text-right">₹{product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.stock < 10 
                            ? "bg-red-100 text-red-800" 
                            : product.stock < 20 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-green-100 text-green-800"
                        }`}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditClick(product)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <ProductModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddProduct}
          mode="add"
        />
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && selectedProduct && (
        <ProductModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          }}
          onSave={handleEditProduct}
          mode="edit"
          product={selectedProduct}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && selectedProduct && (
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleDeleteProduct}
          itemName={selectedProduct.name}
        />
      )}
    </div>
  );
};

export default Inventory;
