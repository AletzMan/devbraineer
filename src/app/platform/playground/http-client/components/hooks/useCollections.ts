import {
    addToCollectionService,
    CollectionsResponse,
    deleteCollectionByIdService,
    deleteCollectionService,
    deleteCollectionsService,
    getCollectionsService,
} from '@/services/collection-request.service';
import { RequestHistory } from '@prisma/client';
import { useEffect, useMemo, useState } from 'react';
import { useHTTPClientStore } from '../hooks/storeHTTPClient';

export const useCollections = () => {
    const { setOpenModal, setEntry, collectionName, setCollectionName, entry } = useHTTPClientStore();
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

    const deleteCollection = async (name: string) => {
        const deleted = await deleteCollectionService(name);
        if (deleted) {
            setCollections((prev) => prev.filter((collection) => collection.name !== name));
        }
    };

    const deleteCollections = async () => {
        const deleted = await deleteCollectionsService();
        if (deleted) {
            setCollections([]);
        }
    };

    const deleteRequestById = async (id: string) => {
        const deleted = await deleteCollectionByIdService(id);
        console.log('deleted', deleted);
        if (deleted) {
            setCollections((prev) =>
                prev.map((collection) => ({
                    ...collection,
                    requests: collection.requests.filter((request) => request.id !== id),
                }))
            );
        }
    };

    const saveCollection = async () => {
        if (!entry) return;
        const response = await addToCollectionService(entry, collectionName);
        if (response) {
            setCollections((prev) => [...prev, response]);
            setOpenModal(false);
            setCollectionName('');
        }
    };

    return {
        groupedCollections,
        deleteCollection,
        deleteCollections,
        deleteRequestById,
        saveCollection,
    };
};
