"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const DatePicker = (p: {
  value: Date | undefined;
  onChange: (x: Date | undefined) => void;
  placeholder?: string;
  id?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [innerValue, setInnerValue] = React.useState<Date | undefined>(p.value);

  React.useEffect(() => p.onChange(innerValue), [innerValue]);
  React.useEffect(() => setInnerValue(p.value), [p.value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id={p.id} className="w-full justify-between font-normal">
          <div className={innerValue ? "" : "text-muted-foreground"}>
            {innerValue ? innerValue.toLocaleDateString() : p.placeholder}
          </div>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={innerValue}
          captionLayout="dropdown"
          onSelect={(date) => {
            setInnerValue(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
