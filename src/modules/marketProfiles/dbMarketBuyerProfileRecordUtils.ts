import { z } from "zod";
import PocketBase from "pocketbase";

const marketBuyerProfileRecordSchema = z.object({
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
export type TMarketBuyerProfileRecord = z.infer<typeof marketBuyerProfileRecordSchema>;
export type TMarketBuyerProfileRecordFormData = Omit<
  TMarketBuyerProfileRecord,
  "collectionId" | "collectionName" | "id" | "imageUrl" | "created" | "updated"
>;

const collectionName = "marketBuyerProfiles";

export const createMarketBuyerProfileRecord = async (p: {
  pb: PocketBase;
  data: TMarketBuyerProfileRecordFormData;
}) => {
  try {
    const resp = await p.pb.collection(collectionName).create(p.data);
    return marketBuyerProfileRecordSchema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const updateMarketBuyerProfileRecord = async (p: {
  pb: PocketBase;
  data: TMarketBuyerProfileRecord;
}) => {
  try {
    const resp = await p.pb.collection(collectionName).update(p.data.id, p.data);
    return marketBuyerProfileRecordSchema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const listMarketBuyerProfileRecords = async (p: { pb: PocketBase }) => {
  try {
    const initData = await p.pb.collection(collectionName).getFullList({ sort: "-created" });

    const data = initData
      .map((x) => marketBuyerProfileRecordSchema.safeParse(x))
      .filter((x) => x.success)
      .map((x) => x.data);
    return { success: true, data } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};
export const getMarketBuyerProfileRecordById = async (p: { pb: PocketBase; id: string }) => {
  try {
    const initData = await p.pb.collection(collectionName).getOne(p.id);

    return marketBuyerProfileRecordSchema.safeParse(initData);
  } catch (error) {
    return { success: false, error } as const;
  }
};

export const subscribeToMarketBuyerProfileRecord = async (p: {
  pb: PocketBase;
  id: string;
  onChange: (x: TMarketBuyerProfileRecord | null) => void;
  onError: () => void;
}) => {
  try {
    await p.pb.collection(collectionName).subscribe(p.id, (e) => {
      const parseResp = marketBuyerProfileRecordSchema.safeParse(e.record);

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

export const smartSubscribeToMarketBuyerProfileRecord = async (p: {
  pb: PocketBase;
  id: string;
  onChange: (x: TMarketBuyerProfileRecord | null) => void;
  onError: () => void;
}) => {
  const resp = await getMarketBuyerProfileRecordById(p);

  p.onChange(resp.success ? resp.data : null);

  return subscribeToMarketBuyerProfileRecord({
    pb: p.pb,
    id: p.id,
    onChange: (x) => p.onChange(x),
    onError: p.onError,
  });
};

export const subscribeToMarketBuyerProfileRecords = async (p: {
  pb: PocketBase;
  initData: TMarketBuyerProfileRecord[];
  onChange: (x: TMarketBuyerProfileRecord[]) => void;
  onError: () => void;
}) => {
  let records = [...p.initData];
  try {
    const unsub = p.pb.collection(collectionName).subscribe("*", (e) => {
      if (e.action === "create") {
        const parseResp = marketBuyerProfileRecordSchema.safeParse(e.record);
        if (parseResp.success) records.push(parseResp.data);
      }
      if (e.action === "update") {
        const parseResp = marketBuyerProfileRecordSchema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
        records.push(parseResp.data);
      }
      if (e.action === "delete") {
        const parseResp = marketBuyerProfileRecordSchema.safeParse(e.record);
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

export const smartSubscribeToMarketBuyerProfileRecords = async (p: {
  pb: PocketBase;
  onChange: (x: TMarketBuyerProfileRecord[]) => void;
  onError: () => void;
}) => {
  const listMarketBuyerProfileRecordsResp = await listMarketBuyerProfileRecords(p);
  if (!listMarketBuyerProfileRecordsResp.success) {
    p.onError();
    return listMarketBuyerProfileRecordsResp;
  }

  let allRecords = listMarketBuyerProfileRecordsResp.data;
  p.onChange(allRecords);

  const subscribeResp = await subscribeToMarketBuyerProfileRecords({
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
