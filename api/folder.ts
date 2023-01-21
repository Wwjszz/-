export interface File {
  id: number;
  filePath: string;
}

export interface Folder {
  name: string;
  children: Folder[] | File[];
}
