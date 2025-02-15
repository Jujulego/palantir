export class FetchError extends Error {
  // Constructor
  constructor(
    readonly status: number,
    readonly content: string,
  ) {
    super(`${status}: ${content}`);
  }
}

export async function jsonFetch<D>(url: string | URL, options?: RequestInit): Promise<D> {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new FetchError(res.status, await res.text());
  }

  return await res.json();
}
