interface RequestOptions {
  timeoutMs?: number;
  retries?: number;
  cacheKey?: string;
  cacheTtlMs?: number;
}

const memoryCache = new Map<string, { expiresAt: number; value: unknown }>();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getJson<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const timeoutMs = options.timeoutMs ?? 3000;
  const retries = options.retries ?? 1;

  if (options.cacheKey) {
    const cached = memoryCache.get(options.cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value as T;
    }
  }

  let attempt = 0;
  let lastError: unknown;

  while (attempt <= retries) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      window.clearTimeout(timer);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
      }

      const json = (await response.json()) as T;

      if (options.cacheKey) {
        memoryCache.set(options.cacheKey, {
          expiresAt: Date.now() + (options.cacheTtlMs ?? 60_000),
          value: json,
        });
      }

      return json;
    } catch (error) {
      window.clearTimeout(timer);
      lastError = error;
      attempt += 1;
      if (attempt <= retries) {
        await delay(250 * attempt);
      }
    }
  }

  throw lastError;
}
