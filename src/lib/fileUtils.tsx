import { PocketBase } from "@/config/pocketbaseConfig";
import { useEffect, useState } from "react";

export const useFileUrl = (file: File | null | undefined) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return setUrl(null);

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
};

export const getFileFromUrl = async (p: { fileUrl: string; fileName: string }) => {
  try {
    const response = await fetch(p.fileUrl);
    if (!response.ok) return { success: false, error: response.statusText as unknown } as const;

    const blob = await response.blob();
    const file = new File([blob], p.fileName, { type: blob.type, lastModified: Date.now() });

    return { success: true, data: file } as const;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw { success: false, error } as const;
  }
};

export const useFileFromPbRecordOnMount = (p: {
  pb: PocketBase;
  record?: { [key: string]: unknown } | null;
  fileUrl?: string;
  onSuccess?: (x: File) => void;
  onError?: () => void;
}) => {
  useEffect(() => {
    (async () => {
      const fileUrl = p.fileUrl;
      if (!fileUrl || !p.record) return;
      const fileResponse = await getFileFromUrl({
        fileUrl: p.pb.files.getURL(p.record, fileUrl),
        fileName: fileUrl,
      });
      if (fileResponse.success) return p.onSuccess?.(fileResponse.data);
      p.onError?.();
    })();
  }, []);
};
