import React from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function OrderTimeline({ currentStage }) {
  const stages = [
    { name: "Received", description: "Order received and logged" },
    { name: "Washing", description: "Items being washed" },
    { name: "Drying", description: "Items being dried" },
    { name: "Ironing", description: "Items being ironed" },
    { name: "Packaging", description: "Items being packaged" },
    { name: "Ready", description: "Ready for pickup" },
  ];

  return (
    <div className="space-y-6">
      {stages.map((stage, index) => {
        const isCompleted = index < currentStage;
        const isCurrent = index === currentStage;

        return (
          <div key={index} className="flex items-start space-x-4">
            {/* Timeline Icon + Connector */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" strokeWidth={2} />
                ) : (
                  <Circle className="w-6 h-6" strokeWidth={2} />
                )}
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`w-0.5 h-12 ${
                    isCompleted ? "bg-green-500" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>

            {/* Stage Details */}
            <div className="flex-1 pb-8">
              <h3
                className={`font-medium ${
                  isCurrent
                    ? "text-blue-600"
                    : isCompleted
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {stage.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{stage.description}</p>

              {isCurrent && (
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                    Current Stage
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
