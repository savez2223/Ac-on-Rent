import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface RentalFormProps {
  onSubmit: (formData: any) => void;
}

export const RentalForm = ({ onSubmit }: RentalFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    navigate("/thank-you");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleInputChange}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="address">Delivery Address</Label>
        <Input
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleInputChange}
          className="mt-1.5"
        />
      </div>
      <Button type="submit" className="w-full">
        Submit 
      </Button>
    </form>
  );
};