import { RequestHistory } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
    | 'add-collection'
    | 'save-collection'
    | 'delete-collection'
    | 'delete-history'
    | 'delete-all-history'
    | 'delete-all-collections'
    | 'delete-history-by-date'
    | 'delete-collection-by-id';

export interface HTTPClientStore {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    collectionName: string;
    setCollectionName: (name: string) => void;
    request: RequestHistory | null;
    setRequest: (entry: RequestHistory | null) => void;
    typeModal: ModalType;
    setTypeModal: (type: ModalType) => void;
}

export const useHTTPClientStore = create<HTTPClientStore>((set) => ({
    openModal: false,
    setOpenModal: (open: boolean) => set({ openModal: open }),
    collectionName: '',
    setCollectionName: (name: string) => set({ collectionName: name }),
    request: null,
    setRequest: (entry: RequestHistory | null) => set({ request: entry }),
    typeModal: 'save-collection',
    setTypeModal: (type: ModalType) =>
        set({
            typeModal: type,
        }),
}));

interface HistoryStore {
    history: RequestHistory[];
    setHistory: (history: RequestHistory[]) => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
    history: [],
    setHistory: (history: RequestHistory[]) => set({ history: history }),
}));
