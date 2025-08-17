import * as React from "react";

import { cn } from "@/lib/utils";
import { useFileUrl } from "@/lib/fileUtils";
import { CustomIcon } from "../CustomIcon";
import { Button } from "./button";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

type TInputParams = Parameters<typeof Input>[0];

export const TextInput = ({
  onInput,
  value,
  ...p
}: Omit<TInputParams, "type" | "onInput" | "value"> & {
  value: string;
  onInput: (x: string) => void;
}) => {
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => setInternalValue(value), [value]);
  React.useEffect(() => onInput(internalValue), [internalValue]);

  return (
    <Input
      type="text"
      {...p}
      value={value}
      onInput={(e) => {
        const newValue = (e.target as unknown as { value: string }).value;
        setInternalValue(newValue);
      }}
    />
  );
};

export const FileInput = ({
  onInput,
  value,
  ...p
}: Omit<TInputParams, "type" | "onInput" | "value"> & {
  value: File | undefined;
  onInput: (x: File | undefined) => void;
}) => {
  const [internalValue, setInternalValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => setInternalValue(value), [value]);
  React.useEffect(() => onInput(internalValue), [internalValue]);

  React.useEffect(() => {
    if (inputRef.current && !internalValue) inputRef.current.value = "";
  }, [internalValue]);

  return (
    <Input
      {...p}
      type="file"
      ref={inputRef}
      onInput={(e) => {
        const file = (e.target as unknown as { files: File[] }).files[0];
        onInput(file);
      }}
    />
  );
};

export const FileInputDrop = (p: {
  id: string;
  children: React.ReactNode;
  value: File | undefined;
  onInput: (x: File | undefined) => void;
}) => {
  const [innerValue, setInnerValue] = React.useState<File | undefined>(p.value);
  const [isDragActive, setIsDragActive] = React.useState(false);

  React.useEffect(() => setInnerValue(p.value), [p.value]);
  React.useEffect(() => p.onInput(innerValue), [innerValue]);

  const onDragEnter = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragLeave = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const onDragOver = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFile = Array.from(e.dataTransfer.files)[0];
    setInnerValue(droppedFile);
  }, []);

  const fileUrl = useFileUrl(innerValue);

  return (
    <>
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive ? "bg-secondary" : ""
        } `}
      >
        <input
          type="file"
          onChange={(e) => setInnerValue(e.target.files?.[0])}
          className="hidden"
          id={p.id}
        />
        <div className="cursor-pointer">
          <div className="mx-auto mb-4 flex items-center justify-center">
            {fileUrl ? (
              <div className="relative">
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-0 top-0 h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setInnerValue(undefined);
                  }}
                >
                  <CustomIcon iconName="X" size="xs" />
                </Button>
                <img className="h-24" src={fileUrl} />
              </div>
            ) : (
              <CustomIcon iconName="Image" size="4xl" />
            )}
          </div>
          <br />
          <div>{isDragActive ? "Drop files here" : "Drop files here or click to browse"}</div>
          <br />
          <div>{p.children}</div>
        </div>
      </div>
    </>
  );
};
