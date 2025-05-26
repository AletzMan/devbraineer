import {
    addToCollectionService,
    CollectionsResponse,
    deleteCollectionByIdService,
    deleteCollectionService,
    deleteCollectionsService,
    getCollectionsService,
} from '@/services/collection-request.service';
import { useEffect, useMemo, useState } from 'react';
import { useHTTPClientStore } from '../hooks/storeHTTPClient';

export const useCollections = () => {
    const { setOpenModal, collectionName, setCollectionName, request } = useHTTPClientStore();
    const [collections, setCollections] = useState<CollectionsResponse[]>([]);

    useEffect(() => {
        const getAllCollections = async () => {
            const response = await getCollectionsService();
            if (response) {
                setCollections(response);
            }
        };
        getAllCollections();
    }, []);

    const groupedCollections = useMemo(() => {
        const groups: { [key: string]: CollectionsResponse } = {};
        collections.forEach((collection) => {
            const dateKey = collection.name;
            if (!groups[dateKey]) {
                groups[dateKey] = {
                    name: collection.name,
                    id: collection.id,
                    userId: collection.userId,
                    created_at: collection.created_at,
                    requests: [],
                };
            }
            groups[dateKey].requests = [...groups[dateKey].requests, ...collection.requests];
        });
        const sortedGroupKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));
        return sortedGroupKeys.map((name) => ({
            name,
            id: groups[name].id,
            created_at: groups[name].created_at,
            requests: groups[name].requests,
        }));
    }, [collections]);

    const deleteCollection = async (name: string): Promise<boolean> => {
        const deleted = await deleteCollectionService(name);
        if (deleted) {
            setCollections((prev) => prev.filter((collection) => collection.name !== name));
            return true;
        }
        return false;
    };

    const deleteCollections = async (): Promise<boolean> => {
        const deleted = await deleteCollectionsService();
        if (deleted) {
            setCollections([]);
            return true;
        }
        return false;
    };

    const deleteRequestById = async (id: string): Promise<boolean> => {
        const deleted = await deleteCollectionByIdService(id);
        console.log('deleted', deleted);
        if (deleted) {
            setCollections((prev) =>
                prev.map((collection) => ({
                    ...collection,
                    requests: collection.requests.filter((request) => request.id !== id),
                }))
            );
            return true;
        }
        return false;
    };

    const saveCollection = async (): Promise<boolean> => {
        if (!request) return false;
        const response = await addToCollectionService(request, collectionName);
        if (response) {
            setCollections((prev) => [...prev, response]);
            setOpenModal(false);
            setCollectionName('');
            return true;
        }
        return false;
    };

    const createCollection = async (): Promise<boolean> => {
        const response = await addToCollectionService(undefined, collectionName);
        if (response) {
            setCollections((prev) => [...prev, response]);
            setOpenModal(false);
            setCollectionName('');
            return true;
        }
        return false;
    };

    return {
        groupedCollections,
        deleteCollection,
        deleteCollections,
        deleteRequestById,
        saveCollection,
        createCollection,
    };
};
