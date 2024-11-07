export class FetchError extends Error {
  // Constructor
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(`${status}: ${message}`);
  }
}

export async function jsonFetcher<D>(url: string | URL): Promise<D> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new FetchError(res.status, await res.text());
  }

  return await res.json();
}