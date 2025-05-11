import { ref, push, set } from "firebase/database";
import { db } from "../firebase-config";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OldAcBuying } from "@/components/sell/OldAcBuying";
import { uploadBytes, ref as storageRef, getStorage } from "firebase/storage"; // Import necessary methods for Firebase Storage

const SellAppliance = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const applianceData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      applianceType: formData.get("applianceType"),
      brand: formData.get("brand"),
      model: formData.get("model"),
      age: formData.get("age"),
      condition: formData.get("condition"),
      price: formData.get("price"),
      description: formData.get("description"),
    };

    try {
      // Reference to the appliances collection in Firebase
      const applianceRef = ref(db, "applianceListings");

      // Create a new appliance entry in Firebase
      const newApplianceRef = push(applianceRef);
      await set(newApplianceRef, applianceData);

      // Handle the image upload if there are images

      // Display success message (using toast or another method)
      toast({
        title: "Success!",
        description: "Your appliance listing has been submitted successfully.",
      });

      // Reset the form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting appliance data:", error);
      toast({
        title: "Error",
        description:
          "There was an issue submitting your form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8 text-center">
              Sell Your Appliance
            </h1>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        name="phone"
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {/* Location Field */}
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        name="location"
                        id="location"
                        placeholder="Enter your location"
                        required
                      />
                    </div>

                    {/* Appliance Type */}
                    <div>
                      <Label htmlFor="applianceType">Appliance Type</Label>
                      <Select name="applianceType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select appliance type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900">
                          <SelectItem value="window-ac">Window AC</SelectItem>
                          <SelectItem value="split-ac">Split AC</SelectItem>
                          <SelectItem value="portable-ac">
                            Portable AC
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Brand Field */}
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        name="brand"
                        id="brand"
                        placeholder="Enter brand name"
                        required
                      />
                    </div>

                    {/* Model Field */}
                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Input
                        name="model"
                        id="model"
                        placeholder="Enter model number"
                        required
                      />
                    </div>

                    {/* Age Field */}
                    <div>
                      <Label htmlFor="age">Age of Appliance</Label>
                      <Input
                        name="age"
                        id="age"
                        type="number"
                        placeholder="Age in years"
                        min="0"
                        required
                      />
                    </div>

                    {/* Condition Field */}
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select name="condition" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900">
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Field */}
                    <div>
                      <Label htmlFor="price">Expected Price (₹)</Label>
                      <Input
                        name="price"
                        id="price"
                        type="number"
                        placeholder="Enter your expected price"
                        min="0"
                        required
                      />
                    </div>

                    {/* Description Field */}
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        name="description"
                        id="description"
                        placeholder="Describe your appliance's features and condition"
                        className="h-32"
                        required
                      />
                    </div>

                    {/* Upload Images Field */}
                    <div>
                      <Label htmlFor="images">Upload Images</Label>
                      <Input
                        name="images"
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        required
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Upload up to 5 images of your appliance
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Listing"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Old AC Buying Section */}
        <OldAcBuying />
      </main>
      <Footer />
    </div>
  );
};

export default SellAppliance;
