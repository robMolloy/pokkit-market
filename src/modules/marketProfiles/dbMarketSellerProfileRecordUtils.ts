import { z } from "zod";
import PocketBase from "pocketbase";

const marketSellerProfileRecordSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  userId: z.string(),
  created: z.string(),
  updated: z.string(),
});
export type TMarketSellerProfileRecord = z.infer<typeof marketSellerProfileRecordSchema>;
export type TMarketSellerProfileRecordFormData = Omit<
  TMarketSellerProfileRecord,
  "collectionId" | "collectionName" | "imageUrl" | "created" | "updated"
> & { image: File };

const collectionName = "marketSellerProfiles";

export const createMarketSellerProfileRecord = async (p: {
  pb: PocketBase;
  data: TMarketSellerProfileRecordFormData;
}) => {
  try {
    const { image: imageUrl, ...data } = p.data;
    const resp = await p.pb.collection(collectionName).create({ imageUrl, ...data });
    return marketSellerProfileRecordSchema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const updateMarketSellerProfileRecord = async (p: {
  pb: PocketBase;
  data: TMarketSellerProfileRecordFormData;
}) => {
  try {
    const { image: imageUrl, ...data } = p.data;
    const resp = await p.pb.collection(collectionName).update(p.data.id, { imageUrl, ...data });
    return marketSellerProfileRecordSchema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const listMarketSellerProfileRecords = async (p: { pb: PocketBase }) => {
  try {
    const initData = await p.pb.collection(collectionName).getFullList({ sort: "-created" });

    const data = initData
      .map((x) => marketSellerProfileRecordSchema.safeParse(x))
      .filter((x) => x.success)
      .map((x) => x.data);
    return { success: true, data } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};
export const getMarketSellerProfileRecordById = async (p: { pb: PocketBase; id: string }) => {
  try {
    const initData = await p.pb.collection(collectionName).getOne(p.id);

    return marketSellerProfileRecordSchema.safeParse(initData);
  } catch (error) {
    return { success: false, error } as const;
  }
};

export const subscribeToMarketSellerProfileRecord = async (p: {
  pb: PocketBase;
  id: string;
  onChange: (x: TMarketSellerProfileRecord | null) => void;
  onError: () => void;
}) => {
  try {
    await p.pb.collection(collectionName).subscribe(p.id, (e) => {
      const parseResp = marketSellerProfileRecordSchema.safeParse(e.record);

      return p.onChange(parseResp.success ? parseResp.data : null);
    });

    return {
      success: true,
      data: { unsub: () => p.pb.collection(collectionName).unsubscribe(p.id) },
    } as const;
  } catch (error) {
    p.onError();
    return { success: false, error } as const;
  }
};

export const smartSubscribeToMarketSellerProfileRecord = async (p: {
  pb: PocketBase;
  id: string;
  onChange: (x: TMarketSellerProfileRecord | null) => void;
  onError: () => void;
}) => {
  const resp = await getMarketSellerProfileRecordById(p);

  p.onChange(resp.success ? resp.data : null);

  return subscribeToMarketSellerProfileRecord({
    pb: p.pb,
    id: p.id,
    onChange: (x) => p.onChange(x),
    onError: p.onError,
  });
};

export const subscribeToMarketSellerProfileRecords = async (p: {
  pb: PocketBase;
  initData: TMarketSellerProfileRecord[];
  onChange: (x: TMarketSellerProfileRecord[]) => void;
  onError: () => void;
}) => {
  let records = [...p.initData];
  try {
    const unsub = p.pb.collection(collectionName).subscribe("*", (e) => {
      if (e.action === "create") {
        const parseResp = marketSellerProfileRecordSchema.safeParse(e.record);
        if (parseResp.success) records.push(parseResp.data);
      }
      if (e.action === "update") {
        const parseResp = marketSellerProfileRecordSchema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
        records.push(parseResp.data);
      }
      if (e.action === "delete") {
        const parseResp = marketSellerProfileRecordSchema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
      }
      p.onChange([...records]);
    });

    return { success: true, data: unsub } as const;
  } catch (error) {
    p.onError();
    return { success: false, error } as const;
  }
};

export const smartSubscribeToMarketSellerProfileRecords = async (p: {
  pb: PocketBase;
  onChange: (x: TMarketSellerProfileRecord[]) => void;
  onError: () => void;
}) => {
  const listMarketSellerProfileRecordsResp = await listMarketSellerProfileRecords(p);
  if (!listMarketSellerProfileRecordsResp.success) {
    p.onError();
    return listMarketSellerProfileRecordsResp;
  }

  let allRecords = listMarketSellerProfileRecordsResp.data;
  p.onChange(allRecords);

  const subscribeResp = await subscribeToMarketSellerProfileRecords({
    pb: p.pb,
    initData: allRecords,
    onChange: (x) => {
      allRecords = x;
      p.onChange(allRecords);
    },
    onError: p.onError,
  });

  return subscribeResp;
};
