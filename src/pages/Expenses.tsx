
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
  Calendar,
  Search,
  Edit,
  Trash,
  ArrowUpDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseModal from "@/components/ExpenseModal";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for expenses
const sampleExpenses = [
  { 
    id: 1, 
    date: "2025-04-01", 
    category: "Inventory Purchase", 
    description: "Bulk order of face creams", 
    amount: 2500.00 
  },
  { 
    id: 2, 
    date: "2025-04-05", 
    category: "Marketing", 
    description: "Instagram ad campaign", 
    amount: 500.00 
  },
  { 
    id: 3, 
    date: "2025-04-10", 
    category: "Utilities", 
    description: "Electricity bill", 
    amount: 150.00 
  },
  { 
    id: 4, 
    date: "2025-04-15", 
    category: "Inventory Purchase", 
    description: "New serum formulation", 
    amount: 1800.00 
  },
  { 
    id: 5, 
    date: "2025-04-20", 
    category: "Packaging", 
    description: "Eco-friendly packaging materials", 
    amount: 950.00 
  },
  { 
    id: 6, 
    date: "2025-04-22", 
    category: "Shipping", 
    description: "Monthly shipping service fee", 
    amount: 330.00 
  },
  { 
    id: 7, 
    date: "2025-04-28", 
    category: "Staff", 
    description: "Part-time staff salary", 
    amount: 1200.00 
  },
];

const expensesByCategory = [
  { category: "Inventory Purchase", amount: 4300 },
  { category: "Marketing", amount: 500 },
  { category: "Utilities", amount: 150 },
  { category: "Packaging", amount: 950 },
  { category: "Shipping", amount: 330 },
  { category: "Staff", amount: 1200 },
];

export interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
}

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const filteredExpenses = expenses.filter(expense => 
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    const newId = Math.max(...expenses.map(e => e.id), 0) + 1;
    setExpenses([...expenses, { ...newExpense, id: newId }]);
    setIsAddModalOpen(false);
  };

  const handleEditExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(e => e.id === updatedExpense.id ? updatedExpense : e));
    setIsEditModalOpen(false);
    setSelectedExpense(null);
  };

  const handleDeleteExpense = () => {
    if (selectedExpense) {
      setExpenses(expenses.filter(e => e.id !== selectedExpense.id));
      setIsDeleteDialogOpen(false);
      setSelectedExpense(null);
    }
  };

  const handleEditClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer className="h-80" config={{ expenses: { theme: { light: "#8B5CF6" } } }}>
              <BarChart data={expensesByCategory}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
              </BarChart>
              <ChartTooltip />
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-muted/50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-muted-foreground">Total Expenses</dt>
                <dd className="mt-2 text-3xl font-semibold">${totalExpenses.toFixed(2)}</dd>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-muted-foreground">Highest Category</dt>
                <dd className="mt-2 text-3xl font-semibold">Inventory</dd>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg sm:col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">This Month vs Last Month</dt>
                <dd className="mt-2 text-3xl font-semibold text-green-600">+12.5%</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Search expenses..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Calendar className="mr-2 h-4 w-4" /> Filter by Date
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditClick(expense)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteClick(expense)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No expenses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <ExpenseModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddExpense}
          mode="add"
        />
      )}

      {/* Edit Expense Modal */}
      {isEditModalOpen && selectedExpense && (
        <ExpenseModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedExpense(null);
          }}
          onSave={handleEditExpense}
          mode="edit"
          expense={selectedExpense}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && selectedExpense && (
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedExpense(null);
          }}
          onConfirm={handleDeleteExpense}
          itemName={"expense for " + selectedExpense.description}
        />
      )}
    </div>
  );
};

export default Expenses;
