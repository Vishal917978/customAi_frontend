import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

interface Plan {
  name: string;
  price: string; // ₹399 / month
  description: string;
  features: string[];
}

interface SubscriptionPageProps {
  onClose: () => void; // function to go back to chat
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const SubscriptionPage = ({ onClose }: SubscriptionPageProps) => {
  const [selectedTab, setSelectedTab] = useState<"Personal" | "Business">("Personal");

  const personalPlans: Plan[] = [
    { name: "Free", price: "0", description: "Intelligence for everyday tasks", features: ["Access to GPT-5"] },
    { name: "Go", price: "399", description: "More access to popular features", features: ["Expanded messaging and uploads"] },
    { name: "Plus", price: "1999", description: "Advanced intelligence", features: ["Advanced reasoning", "Longer memory"] },
    { name: "Pro", price: "19900", description: "Full access to everything", features: ["Unlimited everything"] },
  ];

  const handlePlanClick = async (plan: Plan) => {
    if (plan.name === "Free") {
      alert("You already have the Free plan!");
      return;
    }

    try {
      // 🔹 1. Create Order
      const token = localStorage.getItem("token"); // assuming you store login token
      const res = await axios.post(
        "http://localhost:5000/payment/create-order",
        { amount: plan.price, plan_name: plan.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order } = res.data;

      // 🔹 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_xxxxx", // frontend key
        amount: order.amount,
        currency: order.currency,
        name: "My App Subscription",
        description: `Subscribe to ${plan.name} plan`,
        order_id: order.id,
        handler: async function (response: any) {
          // 🔹 3. Verify payment on backend
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan_name: plan.name,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyRes.data.success) {
              alert(`🎉 Payment successful! Subscribed to ${plan.name}`);
            } else {
              alert("❌ Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("❌ Error verifying payment");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error creating order", err);
      alert("❌ Failed to create order. Try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Upgrade your plan</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {["Personal", "Business"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab as "Personal" | "Business")}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedTab === tab ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-4 gap-6">
        {personalPlans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-lg shadow-lg flex flex-col justify-between transition hover:shadow-2xl ${
              plan.name === "Go" ? "bg-indigo-700 text-white" : "bg-gray-900 text-white"
            }`}
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="mb-4">₹{plan.price} / month</p>
              <p className="mb-4">{plan.description}</p>
              <ul className="mb-4 space-y-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm flex items-center gap-2">
                    <span>✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className="w-full mt-auto"
              onClick={() => handlePlanClick(plan)}
              variant={plan.name === "Go" ? "default" : "outline"}
            >
              {plan.name === "Free" ? "Current Plan" : `Upgrade to ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" onClick={onClose}>
          Back to Chat
        </Button>
      </div>
    </div>
  );
};
