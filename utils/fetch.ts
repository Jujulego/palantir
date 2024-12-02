export class FetchError extends Error {
  // Constructor
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(`${status}: ${message}`);
  }
}

export async function jsonFetch<D>(url: string | URL, options?: RequestInit): Promise<D> {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new FetchError(res.status, await res.text());
  }

  return await res.json();
}