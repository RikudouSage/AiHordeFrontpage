export interface PrivacyPolicyItem {
  text: string;
  section: string;
  subsection: string | null;
  context?: {
    [key: string]: {
      valueType: 'date';
      value: string;
    };
  };
}
