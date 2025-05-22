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
    console.log(id);
    const existingHistory: RequestHistory[] = getHistoryFromLocalStorage();
    console.log(existingHistory);
    const updatedHistory = existingHistory.filter((h: RequestHistory) => h.id !== id);
    console.log(updatedHistory);
    localStorage.setItem('http-history', JSON.stringify(updatedHistory));
    console.log(localStorage.getItem('http-history'));
};
