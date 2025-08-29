import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"Personal" | "Business">("Personal");

  const personalPlans: Plan[] = [
    {
      name: "Free",
      price: "₹0 / month",
      description: "Intelligence for everyday tasks",
      features: [
        "Access to GPT-5",
        "Limited file uploads",
        "Limited and slower image generation",
        "Limited memory and context",
        "Limited deep research",
      ],
    },
    {
      name: "Go",
      price: "₹399 / month",
      description: "More access to popular features",
      features: [
        "Access to GPT-5",
        "Expanded messaging and uploads",
        "Expanded and faster image creation",
        "Longer memory and context",
        "Limited deep research",
        "Projects, tasks, custom GPTs",
      ],
    },
    {
      name: "Plus",
      price: "₹1,999 / month",
      description: "More access to advanced intelligence",
      features: [
        "GPT-5 with advanced reasoning",
        "Expanded messaging and uploads",
        "Expanded and faster image creation",
        "Expanded memory and context",
        "Expanded deep research and agent mode",
        "Projects, tasks, custom GPTs",
        "Sora video generation",
      ],
    },
    {
      name: "Pro",
      price: "₹19,900 / month",
      description: "Full access to the best of ChatGPT",
      features: [
        "GPT-5 with pro reasoning",
        "Unlimited messages and uploads",
        "Unlimited and faster image creation",
        "Maximum memory and context",
        "Maximum deep research and agent mode",
        "Expanded projects, tasks, and custom GPTs",
        "Expanded Sora video generation",
      ],
    },
  ];

  const handlePlanClick = (plan: string) => {
    alert(`You selected the ${plan} plan!`);
    // You can integrate payment here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Upgrade your plan</h1>

      {/* Toggle Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {["Personal", "Business"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab as "Personal" | "Business")}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedTab === tab
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Plans Grid */}
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
              <p className="mb-4">{plan.price}</p>
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
              onClick={() => handlePlanClick(plan.name)}
              variant={plan.name === "Go" ? "default" : "outline"}
            >
              {plan.name === "Free" ? "Current Plan" :` Upgrade to ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Chat
        </Button>
      </div>
    </div>
  );
};