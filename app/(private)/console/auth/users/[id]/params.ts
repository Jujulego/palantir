export interface ConsoleUsersIdParams {
  readonly id: string;
}

export async function decodeId(params: Promise<ConsoleUsersIdParams>): Promise<string> {
  return decodeURIComponent((await params).id);
}
