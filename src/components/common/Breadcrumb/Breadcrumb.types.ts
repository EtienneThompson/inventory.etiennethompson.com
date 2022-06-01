export interface BreadcrumbProps {
  className?: string;
  names: string[];
  values: string[];
  onNameClick?: (value: string) => void;
}
