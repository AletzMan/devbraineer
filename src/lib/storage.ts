import { RequestHistory } from '@prisma/client';

export const saveHistoryToLocalStorage = (history: RequestHistory) => {
    const existingHistory = getHistoryFromLocalStorage();
    const updatedHistory = [...existingHistory, history];
    localStorage.setItem('http-history', JSON.stringify(updatedHistory));
};

export const getHistoryFromLocalStorage = () => {
    const history = localStorage.getItem('http-history');
    return history ? JSON.parse(history) : [];
};
