import { Check } from "lucide-react";
import React, { useState } from "react";

const statusClassesMap = {
  completed: `bg-secondary`,
  current: `bg-primary text-primary-foreground`,
  upcoming: `bg-background `,
};

export const StepProgress = (p: {
  value: number;
  onChange: (x: number) => void;
  steps: { label: string }[];
}) => {
  const [innerValue, setInnerValue] = useState(0);

  React.useEffect(() => p.onChange(innerValue), [innerValue]);
  React.useEffect(() => setInnerValue(p.value), [p.value]);

  return (
    <div className="flex items-center px-4 pb-4">
      {p.steps.map((step, index) => {
        const status: keyof typeof statusClassesMap =
          innerValue === index ? "current" : index < innerValue ? "completed" : "upcoming";

        return (
          <React.Fragment key={step.label}>
            <div className="relative flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200 ${statusClassesMap[status]}`}
              >
                {status === "completed" ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
              </div>
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap text-center text-xs font-medium ${{ completed: "", current: "", upcoming: "text-muted-foreground" }[status]}`}
              >
                {step.label}
              </span>
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
  );
};
