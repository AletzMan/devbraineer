import { RequestHistory } from '@prisma/client';
import { create } from 'zustand';

export interface HTTPClientStore {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    collectionName: string;
    setCollectionName: (name: string) => void;
    entry: RequestHistory | null;
    setEntry: (entry: RequestHistory | null) => void;
    typeModal:
        | 'save-collection'
        | 'delete-collection'
        | 'delete-history'
        | 'delete-all-history'
        | 'delete-all-collections'
        | 'delete-history-by-date'
        | 'delete-collection-by-id';
    setTypeModal: (
        type:
            | 'save-collection'
            | 'delete-collection'
            | 'delete-history'
            | 'delete-all-history'
            | 'delete-all-collections'
            | 'delete-history-by-date'
            | 'delete-collection-by-id'
    ) => void;
}

export const useHTTPClientStore = create<HTTPClientStore>((set) => ({
    openModal: false,
    setOpenModal: (open: boolean) => set({ openModal: open }),
    collectionName: '',
    setCollectionName: (name: string) => set({ collectionName: name }),
    entry: null,
    setEntry: (entry: RequestHistory | null) => set({ entry: entry }),
    typeModal: 'save-collection',
    setTypeModal: (
        type:
            | 'save-collection'
            | 'delete-collection'
            | 'delete-history'
            | 'delete-all-history'
            | 'delete-all-collections'
            | 'delete-history-by-date'
            | 'delete-collection-by-id'
    ) => set({ typeModal: type }),
}));
