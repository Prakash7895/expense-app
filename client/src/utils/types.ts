export interface FormFields {
  name: string;
  type: 'text' | 'select' | 'password';
  className?: string;
  label: string;
  isDisabled?: boolean;
  subType?: 'number';
  defaultValue?: string;
  options?: { value: string; label: string }[];
}
