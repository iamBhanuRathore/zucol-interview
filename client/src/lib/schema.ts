export interface PdfSchema {
  id: number;
  name: string;
  description: string;
  url?: string;
  pageNo?: string;
  pages: number;
  viewed: number;
}

export type PdfArraySchema = PdfSchema[];
