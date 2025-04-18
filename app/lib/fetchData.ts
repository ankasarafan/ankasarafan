const CACHE_DURATION = 0 * 0 * 0 * 0; // 1 day

// Simple in-memory cache for server-side
let serverCache: {
  data: any;
  timestamp: number;
} | null = null;

export async function fetchDataWithCache() {
  const currentTime = Date.now();

  // Try to get from cache
  if (typeof window !== 'undefined') {
    // Browser environment - try localStorage
    try {
      const cachedItem = localStorage?.getItem('api_cache');
      if (cachedItem) {
        const { data, timestamp } = JSON.parse(cachedItem);
        if (currentTime - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      console.warn("LocalStorage cache access failed", e);
    }
  } else {
    // Server environment - use in-memory cache
    if (serverCache && currentTime - serverCache.timestamp < CACHE_DURATION) {
      return serverCache.data;
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch("https://akulakasa.pages.dev/data.json", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Save to cache
    if (typeof window !== 'undefined') {
      try {
        localStorage?.setItem('api_cache', JSON.stringify({
          data,
          timestamp: currentTime
        }));
      } catch (e) {
        console.warn("Failed to save to localStorage", e);
      }
    } else {
      serverCache = { data, timestamp: currentTime };
    }
    
    return data;
  } catch (error) {
    console.error("Failed to fetch fresh data:", error);
    
    // Try to return stale cache
    if (typeof window !== 'undefined') {
      try {
        const cachedItem = localStorage?.getItem('api_cache');
        if (cachedItem) {
          console.warn("Returning stale browser cache");
          return JSON.parse(cachedItem).data;
        }
      } catch (e) {
        console.warn("Failed to read stale browser cache", e);
      }
    } else if (serverCache) {
      console.warn("Returning stale server cache");
      return serverCache.data;
    }
    
    throw new Error("Failed to fetch data and no valid cache available");
  }
}