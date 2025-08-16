import { Check } from "lucide-react";
import React, { useState } from "react";

const baseClasses =
  "relative flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm transition-all duration-200";
const statusClassesMap = {
  completed: `${baseClasses} bg-green-500 border-green-500 text-white`,
  current: `${baseClasses} bg-blue-500 border-blue-500 text-white`,
  upcoming: `${baseClasses} bg-gray-100 border-gray-300 text-gray-500`,
};

export const StepProgress = (p: { steps: { label: string }[] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="mx-auto w-full max-w-4xl p-8">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Form Progress</h2>
        <p className="text-gray-600">Complete each step to proceed through the form</p>
      </div>

      <div className="mb-8 flex items-center">
        {p.steps.map((step, index) => {
          const status: keyof typeof statusClassesMap =
            currentStep === index ? "current" : index < currentStep ? "completed" : "upcoming";

          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center">
                <div className={statusClassesMap[status]}>
                  {status === "completed" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    status === "completed"
                      ? "text-green-600"
                      : status === "current"
                        ? "text-blue-600"
                        : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < p.steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-colors duration-200 ${
                    status === "completed" ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep >= p.steps.length}
          className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Complete Current Step
        </button>

        <button
          onClick={() => setCurrentStep(0)}
          className="rounded-lg bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
};
