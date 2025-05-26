import {
    deleteHistoryFromLocalStorage,
    deleteHistoryItemFromLocalStorage,
    deleteHistoryItemFromLocalStorageByDate,
    getHistoryFromLocalStorage,
} from '@/lib/storage';
import { RequestHistory } from '@prisma/client';
import { useEffect, useMemo } from 'react';
import { useHistoryStore } from './storeHTTPClient';

export const useHistory = () => {
    const { history, setHistory } = useHistoryStore();

    useEffect(() => {
        const getHistory = async () => {
            const history = await getHistoryFromLocalStorage();
            setHistory(history);
        };
        getHistory();
    }, []);

    const formatDisplayDate = (dateString: string) => {
        const today = new Date();
        const entryDate = new Date(dateString);

        // Resetear horas para comparaci
        today.setHours(0, 0, 0, 0);
        entryDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - entryDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        const dayOfWeekFormatter = new Intl.DateTimeFormat('es-ES', { weekday: 'long' });
        const dayAndMonthFormatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
        const fullDateFormatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

        if (diffDays === 0) {
            return 'Hoy';
        } else if (diffDays === 1) {
            return 'Ayer';
        } else if (diffDays > 1 && diffDays <= 6) {
            const todayDay = today.getDay();
            const entryDay = entryDate.getDay();
            const dayDifferenceInWeek = todayDay - entryDay;

            if (dayDifferenceInWeek > 0 && dayDifferenceInWeek < 7) {
                return dayOfWeekFormatter.format(entryDate);
            } else if (dayDifferenceInWeek < 0) {
            }
        }

        if (entryDate.getFullYear() === new Date().getFullYear()) {
            return dayAndMonthFormatter.format(entryDate);
        }

        return fullDateFormatter.format(entryDate);
    };

    const formatDateToYYYYMMDD = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const groupedHistory = useMemo(() => {
        const groups: { [key: string]: RequestHistory[] } = {};
        history.forEach((entry) => {
            const dateKey = formatDateToYYYYMMDD(entry.created_at.toString());
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(entry);
        });
        const sortedGroupKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));
        return sortedGroupKeys.map((date) => ({
            date: date,
            displayDate: formatDisplayDate(date),
            entries: groups[date],
        }));
    }, [history]);

    const deleteHistoryItem = (id: string): boolean => {
        deleteHistoryItemFromLocalStorage(id);
        const updatedHistory = history.filter((h) => h.id !== id);
        if (updatedHistory) {
            setHistory(updatedHistory);
            return true;
        }
        return false;
    };

    const deleteHistory = (): boolean => {
        deleteHistoryFromLocalStorage();
        setHistory([]);
        return true;
    };

    const deleteHistoryByDate = (date: string): boolean => {
        const updatedHistory = deleteHistoryItemFromLocalStorageByDate(date);
        if (updatedHistory) {
            setHistory(updatedHistory);
            return true;
        }
        return false;
    };

    return {
        history,
        setHistory,
        deleteHistoryItem,
        deleteHistory,
        deleteHistoryByDate,
        groupedHistory,
    };
};
