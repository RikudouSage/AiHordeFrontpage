export interface GuiItem {
  name: string;
  description: string;
  image: string;
  link: string;
  downloadButtonText?: string | null;
  categories: string | string[];
}
