export interface BreadcrumbProps {
  className?: string;
  names: string[];
  values: string[];
  onNameClick?: (name: string) => void;
}
