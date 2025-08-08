import { create } from "zustand";
import { TMarketBuyerProfileRecord } from "./dbMarketBuyerProfileRecordUtils";

type TState = TMarketBuyerProfileRecord | undefined | null;

const useInitMarketBuyerProfileRecordStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: undefined,
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));

export const useMarketBuyerProfileRecordStore = () => {
  const store = useInitMarketBuyerProfileRecordStore();

  return { ...store };
};
