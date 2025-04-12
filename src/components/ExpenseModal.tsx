
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Expense } from "@/pages/Expenses";

interface ExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: Expense | Omit<Expense, "id">) => void;
  mode: "add" | "edit";
  expense?: Expense;
}

const ExpenseModal = ({ open, onClose, onSave, mode, expense }: ExpenseModalProps) => {
  const [formData, setFormData] = useState<Omit<Expense, "id"> & { id?: number }>({
    date: new Date().toISOString().split('T')[0],
    category: "",
    description: "",
    amount: 0
  });

  useEffect(() => {
    if (mode === "edit" && expense) {
      setFormData({ 
        ...expense,
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [mode, expense]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Expense" : "Edit Expense"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="Inventory Purchase">Inventory Purchase</option>
                <option value="Marketing">Marketing</option>
                <option value="Utilities">Utilities</option>
                <option value="Packaging">Packaging</option>
                <option value="Shipping">Shipping</option>
                <option value="Staff">Staff</option>
                <option value="Rent">Rent</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount ($)
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
