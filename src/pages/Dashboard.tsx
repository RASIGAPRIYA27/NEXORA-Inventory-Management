
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Dashboard = () => {
  // Sample data
  const salesData = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 900 },
    { month: "Mar", sales: 1500 },
    { month: "Apr", sales: 1800 },
    { month: "May", sales: 2000 },
    { month: "Jun", sales: 2400 },
  ];

  const recentProductsData = [
    { id: 1, name: "Hydrating Face Cream", category: "Moisturizer", stock: 42, price: 29.99 },
    { id: 2, name: "Vitamin C Serum", category: "Serum", stock: 18, price: 39.99 },
    { id: 3, name: "Gentle Cleansing Foam", category: "Cleanser", stock: 53, price: 19.99 },
    { id: 4, name: "Exfoliating Scrub", category: "Exfoliant", stock: 27, price: 24.99 },
    { id: 5, name: "Night Repair Cream", category: "Moisturizer", stock: 8, price: 49.99 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+2 added today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,958</div>
            <p className="text-xs text-muted-foreground">+$1,234 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48,295</div>
            <p className="text-xs text-muted-foreground">+9% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Need reordering</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer className="h-96" config={{ sales: { theme: { light: "#8B5CF6" } } }}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
              </BarChart>
              <ChartTooltip />
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProductsData.filter(item => item.stock < 20).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${product.stock < 10 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">${product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProductsData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
