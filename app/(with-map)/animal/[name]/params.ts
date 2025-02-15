export interface WithMapAnimalNameParams {
  readonly name: string;
}

export async function decodeName(params: Promise<WithMapAnimalNameParams>): Promise<string> {
  return decodeURIComponent((await params).name);
}
