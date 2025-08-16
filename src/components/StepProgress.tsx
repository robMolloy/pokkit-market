import { Check } from "lucide-react";
import React, { useState } from "react";

const statusClassesMap = {
  completed: `bg-secondary`,
  current: `bg-primary text-primary-foreground`,
  upcoming: `bg-background `,
};

export const StepProgress = (p: { steps: { label: string }[] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <div className="flex items-center">
        {p.steps.map((step, index) => {
          const status: keyof typeof statusClassesMap =
            currentStep === index ? "current" : index < currentStep ? "completed" : "upcoming";

          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center">
                <div
                  className={`"relative duration-200" flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${statusClassesMap[status]}`}
                >
                  {status === "completed" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {/* <span
                  className={`mt-2 text-xs font-medium ${
                    { completed: "", current: "", upcoming: "text-muted-foreground" }[status]
                  }`}
                >
                  {step.label}
                </span> */}
              </div>
              {index < p.steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 transition-colors duration-200 ${
                    status === "completed" ? "bg-primary" : "bg-primary/25"
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
    </>
  );
};
