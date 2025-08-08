import { create } from "zustand";
import { TMarketSellerProfileRecord } from "./dbMarketSellerProfileRecordUtils";

type TState = TMarketSellerProfileRecord[] | undefined | null;

const useInitMarketSellerProfileRecordsStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: undefined,
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));

export const useMarketSellerProfileRecordsStore = () => {
  const store = useInitMarketSellerProfileRecordsStore();

  return { ...store };
};
