
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import ExpenseModal from "@/components/ExpenseModal";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { toast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

export interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
}

const mockExpenses: Expense[] = [
  {
    id: 1,
    date: "2024-01-15",
    category: "Inventory Purchase",
    description: "Purchase of raw materials",
    amount: 500.00,
  },
  {
    id: 2,
    date: "2024-01-20",
    category: "Marketing",
    description: "Facebook Ads campaign",
    amount: 300.00,
  },
  {
    id: 3,
    date: "2024-01-25",
    category: "Utilities",
    description: "Electricity bill",
    amount: 150.00,
  },
  {
    id: 4,
    date: "2024-02-01",
    category: "Packaging",
    description: "Boxes and tape",
    amount: 75.00,
  },
  {
    id: 5,
    date: "2024-02-05",
    category: "Shipping",
    description: "Shipping fees for January",
    amount: 200.00,
  },
  {
    id: 6,
    date: "2024-02-10",
    category: "Staff",
    description: "Salaries for part-time staff",
    amount: 1200.00,
  },
  {
    id: 7,
    date: "2024-02-15",
    category: "Rent",
    description: "Office space rent",
    amount: 1800.00,
  },
  {
    id: 8,
    date: "2024-02-20",
    category: "Other",
    description: "Miscellaneous expenses",
    amount: 100.00,
  },
];

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      id: expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1,
      ...expense,
    };
    setExpenses([...expenses, newExpense]);
    toast({
      title: "Success!",
      description: "Expense added successfully.",
    });
  };

  const editExpense = (expense: Expense) => {
    const updatedExpenses = expenses.map((e) => (e.id === expense.id ? expense : e));
    setExpenses(updatedExpenses);
    toast({
      title: "Success!",
      description: "Expense updated successfully.",
    });
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    toast({
      title: "Success!",
      description: "Expense deleted successfully.",
    });
  };

  const onSave = (expenseData: Expense | Omit<Expense, "id">) => {
    if (mode === "add") {
      addExpense(expenseData as Omit<Expense, "id">);
    } else {
      editExpense(expenseData as Expense);
    }
    closeModal();
  };

  const onDeleteConfirm = () => {
    if (expenseToDelete) {
      deleteExpense(expenseToDelete.id);
      closeDeleteModal();
    }
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Transform data for Recharts - Group by category and sum amounts
  const chartData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.name === expense.category);
    if (existingCategory) {
      existingCategory.amount += expense.amount;
    } else {
      acc.push({ name: expense.category, amount: expense.amount });
    }
    return acc;
  }, [] as { name: string; amount: number }[]);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">Expenses</CardTitle>
        <Input
          type="search"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md mr-4"
        />
        <Button onClick={() => {
          openModal();
          setMode("add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Expenses Overview</CardTitle>
            <CardDescription>A summary of all your expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>₹{expense.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          openModal();
                          setMode("edit");
                          setSelectedExpense(expense);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          openDeleteModal();
                          setExpenseToDelete(expense);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredExpenses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No expenses found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell>₹{expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses Chart</CardTitle>
            <CardDescription>Visual representation of expenses.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer 
              config={{
                expense: {
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))"
                  }
                }
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={5}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                  />
                  <Legend />
                  <Bar 
                    dataKey="amount" 
                    fill="var(--color-expense)" 
                    name="Amount" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <ExpenseModal
        open={isModalOpen}
        onClose={closeModal}
        onSave={onSave}
        mode={mode}
        expense={selectedExpense}
      />

      <DeleteConfirmDialog
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={onDeleteConfirm}
        itemName={expenseToDelete?.description || "this expense"}
      />
    </div>
  );
};

export default Expenses;
