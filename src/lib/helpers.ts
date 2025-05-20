export const SmallDateLocal: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric', // Para usar el formato de 12 horas (AM/PM)
};
export const SmallDateLocalAndTime: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
};

export const FormattedDate = (date: string) => {
    const newNotFormattedDate = date.split('T');
    const newDate = newNotFormattedDate[0].split('-');
    const day = Number(newDate[2]) + 1;
    const month = newDate[1];
    const year = newDate[0];
    const birthday = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const age = currentTime - birthday;
    const formatted = new Date(`${year}-${month}-${day}`).toLocaleDateString(
        'es-MX',
        SmallDateLocal
    );
    return `${formatted} `;
};

export const getFavicon = (url: string): string => {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (e) {
        return '';
    }
};

export const generateThumbnailUrl = (url: string): string => {
    try {
        const websiteUrl = new URL(url);
        return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
    } catch (e) {
        return 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Fallback
    }
};

export const getBaseDomain = (url: string): string => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname;
    } catch (e) {
        return url;
    }
};
