import { useState, useEffect, useCallback } from 'react';

interface UseSavedToolsReturn {
    savedTools: Record<string, boolean>;
    isLoading: boolean;
    error: Error | null;
    checkIfSaved: (toolId: string) => boolean;
    setSavedTools: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    refetchSavedTools: () => Promise<void>;
}

export function useSavedTools(): UseSavedToolsReturn {
    const [savedTools, setSavedTools] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchSavedTools = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/tools/saved/check');
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            console.log('Fetched saved tools:', data.savedTools); // Debug log
            setSavedTools(data.savedTools);
        } catch (err) {
            console.error('Error fetching saved tools:', err);
            setError(err instanceof Error ? err : new Error('Failed to fetch saved tools'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSavedTools();
    }, [fetchSavedTools]);

    const checkIfSaved = useCallback((toolId: string): boolean => {
        return !!savedTools[toolId];
    }, [savedTools]);

    return {
        savedTools,
        isLoading,
        error,
        checkIfSaved,
        setSavedTools,
        refetchSavedTools: fetchSavedTools
    };
} 