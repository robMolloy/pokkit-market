import { create } from "zustand";
import { TMarketBuyerProfileRecord } from "./dbMarketBuyerProfileRecordUtils";

type TState = TMarketBuyerProfileRecord[] | undefined | null;

const useInitMarketBuyerProfileRecordsStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: undefined,
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));

export const useMarketBuyerProfileRecordsStore = () => {
  const store = useInitMarketBuyerProfileRecordsStore();

  return { ...store };
};
