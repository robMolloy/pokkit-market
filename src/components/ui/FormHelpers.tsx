export const FormSection = (p: { children: React.ReactNode }) => {
  return <div className="rounded-lg border p-4">{p.children}</div>;
};

export const FormInputRowCollapse = (p: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:*:flex-1">{p.children}</div>
  );
};
