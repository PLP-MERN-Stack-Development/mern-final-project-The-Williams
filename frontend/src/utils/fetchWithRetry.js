export const fetchWithRetry = async (url, options = {}, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'API request failed');
            }
            return response.json();
        } catch (error) {
            if (i < retries - 1) await new Promise(r => setTimeout(r, 2 ** i * 1000));
            else throw error;
        }
    }
};
