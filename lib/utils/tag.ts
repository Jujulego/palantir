/**
 * Represents a colored tag
 */
export interface Tag {
  readonly label: string;
  readonly color?: 'info' | 'success' | 'warning' | 'error';
}
