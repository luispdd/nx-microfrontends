export interface PerformanceMetric {
  name: string; // 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB'
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  source: string; // 'mfe-material' | 'mfe-primeng' | 'mfe-native'
  timestamp: number;
}

export interface ComponentShowcase {
  id: string;
  name: string;
  description: string;
  category: 'form' | 'data' | 'navigation' | 'layout' | 'feedback' | 'overlay';
}

export interface TableRow {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  country: string;
  startDate: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface CountryItem {
  name: string;
  code: string;
  capital: string;
  region: string;
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
}

export interface TreeNodeItem {
  key?: string;
  label: string;
  data?: string;
  icon?: string;
  children?: TreeNodeItem[];
}

export interface TimelineEventItem {
  status: string;
  date: string;
  icon: string;
  color: string;
  description?: string;
}

