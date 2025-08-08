import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

export const DefaultCard = (p: {
  onClick: () => void;
  imageUrl: string;
  imageAlt: string;
  header: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Card
      className="flex cursor-pointer flex-col gap-4 overflow-hidden border-0 shadow-md transition-shadow duration-300 hover:bg-secondary hover:shadow-lg"
      onClick={() => p.onClick()}
    >
      {p.imageUrl && (
        <div className="overflow-hidden">
          <img
            src={p.imageUrl}
            alt={p.imageAlt}
            className="max-h-64 w-full object-cover transition-transform"
          />
        </div>
      )}
      {p.header && <CardHeader className="flex flex-col gap-2 py-0">{p.header}</CardHeader>}
      {p.children && <CardContent className="pt-0">{p.children}</CardContent>}
    </Card>
  );
};
