export interface BreadcrumbProps {
  className?: string;
  names: string[];
  values: string[];
  types: string[];
  onNameClick?: (value: string, type: string) => void;
}
