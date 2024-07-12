export interface HordeDocument {
  html?: string;
  markdown?: string;
}

export interface HtmlHordeDocument extends HordeDocument {
  html: string;
}
