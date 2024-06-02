export interface FaqItem {
  question: string;
  answer: string;
  section: string | null;
}

export type SortedFaqItems = Map<string, FaqItem[]>;
// export interface SortedFaqItems {
//   [section: string]: FaqItem[];
// }
