import { RequestHistory } from '@prisma/client';

export const saveHistoryToLocalStorage = (history: RequestHistory) => {
    const existingHistory = getHistoryFromLocalStorage();
    const updatedHistory = [...existingHistory, history];
    localStorage.setItem('http-history', JSON.stringify(updatedHistory));
};

export const getHistoryFromLocalStorage = () => {
    const history: RequestHistory[] = localStorage.getItem('http-history')
        ? JSON.parse(localStorage.getItem('http-history') || '[]')
        : [];
    return history;
};

export const deleteHistoryFromLocalStorage = () => {
    localStorage.removeItem('http-history');
};

export const deleteHistoryItemFromLocalStorage = (id: string) => {
    const existingHistory: RequestHistory[] = getHistoryFromLocalStorage();
    const updatedHistory = existingHistory.filter((h: RequestHistory) => h.id !== id);
    localStorage.setItem('http-history', JSON.stringify(updatedHistory));
};

export const deleteHistoryItemFromLocalStorageByDate = (dateStr: string): RequestHistory[] => {
    const existingHistory: RequestHistory[] = getHistoryFromLocalStorage();

    const targetDate = new Date(dateStr);
    targetDate.setHours(0, 0, 0, 0);

    const updatedHistory = existingHistory.filter((h) => {
        const entryDate = new Date(h.created_at);
        entryDate.setHours(0, 0, 0, 0);

        return !(
            entryDate.getFullYear() === targetDate.getFullYear() &&
            entryDate.getMonth() === targetDate.getMonth() &&
            entryDate.getDate() === targetDate.getDate()
        );
    });

    localStorage.setItem('http-history', JSON.stringify(updatedHistory));

    return updatedHistory;
};
