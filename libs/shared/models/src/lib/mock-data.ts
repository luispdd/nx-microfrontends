import {
  TableRow,
  ComponentShowcase,
  CountryItem,
  ProductItem,
  TreeNodeItem,
  TimelineEventItem
} from './interfaces';

export const MOCK_COUNTRIES: CountryItem[] = [
  { name: 'United States', code: 'US', capital: 'Washington, D.C.', region: 'Americas' },
  { name: 'Germany', code: 'DE', capital: 'Berlin', region: 'Europe' },
  { name: 'France', code: 'FR', capital: 'Paris', region: 'Europe' },
  { name: 'United Kingdom', code: 'GB', capital: 'London', region: 'Europe' },
  { name: 'Japan', code: 'JP', capital: 'Tokyo', region: 'Asia' },
  { name: 'Canada', code: 'CA', capital: 'Ottawa', region: 'Americas' },
  { name: 'Spain', code: 'ES', capital: 'Madrid', region: 'Europe' },
  { name: 'Italy', code: 'IT', capital: 'Rome', region: 'Europe' },
  { name: 'Australia', code: 'AU', capital: 'Canberra', region: 'Oceania' },
  { name: 'Brazil', code: 'BR', capital: 'Brasília', region: 'Americas' },
  { name: 'Netherlands', code: 'NL', capital: 'Amsterdam', region: 'Europe' },
  { name: 'Sweden', code: 'SE', capital: 'Stockholm', region: 'Europe' },
  { name: 'Switzerland', code: 'CH', capital: 'Bern', region: 'Europe' },
  { name: 'South Korea', code: 'KR', capital: 'Seoul', region: 'Asia' },
  { name: 'Singapore', code: 'SG', capital: 'Singapore', region: 'Asia' },
  { name: 'Mexico', code: 'MX', capital: 'Mexico City', region: 'Americas' },
  { name: 'India', code: 'IN', capital: 'New Delhi', region: 'Asia' },
  { name: 'Norway', code: 'NO', capital: 'Oslo', region: 'Europe' },
  { name: 'Ireland', code: 'IE', capital: 'Dublin', region: 'Europe' },
  { name: 'New Zealand', code: 'NZ', capital: 'Wellington', region: 'Oceania' },
  { name: 'Denmark', code: 'DK', capital: 'Copenhagen', region: 'Europe' },
  { name: 'Finland', code: 'FI', capital: 'Helsinki', region: 'Europe' },
  { name: 'Portugal', code: 'PT', capital: 'Lisbon', region: 'Europe' },
  { name: 'Belgium', code: 'BE', capital: 'Brussels', region: 'Europe' },
  { name: 'Austria', code: 'AT', capital: 'Vienna', region: 'Europe' }
];

export const MOCK_CATEGORIES: string[] = [
  'Engineering',
  'Marketing',
  'Sales',
  'Design',
  'Finance',
  'Human Resources',
  'DevOps',
  'Product Management'
];

const FIRST_NAMES = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Sophia', 'Ethan', 'Ava', 'Mason', 'Isabella', 'Lucas',
  'Mia', 'Oliver', 'Amelia', 'Aiden', 'Harper', 'James', 'Evelyn', 'Benjamin', 'Abigail', 'Alexander'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

const ROLES = [
  'Senior Architect', 'Lead Developer', 'UX Specialist', 'Product Manager',
  'QA Analyst', 'Security Engineer', 'Data Scientist', 'DevOps Specialist'
];

export const MOCK_TABLE_DATA: TableRow[] = Array.from({ length: 100 }, (_, i) => {
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length];
  const country = MOCK_COUNTRIES[i % MOCK_COUNTRIES.length].name;
  const department = MOCK_CATEGORIES[i % 5];
  const role = ROLES[i % ROLES.length];
  const status: 'active' | 'inactive' | 'pending' = (['active', 'inactive', 'pending'] as const)[i % 3];

  return {
    id: i + 1,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@company.com`,
    department,
    role,
    salary: 65000 + ((i * 1370) % 75000),
    country,
    startDate: new Date(2020 + (i % 5), i % 12, (i % 28) + 1).toISOString().split('T')[0],
    status
  };
});

export const MOCK_PRODUCTS: ProductItem[] = [
  { id: '1000', code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', price: 65, rating: 5, inventoryStatus: 'INSTOCK' },
  { id: '1001', code: 'nvklal433', name: 'Black Watch', category: 'Accessories', price: 72, rating: 4, inventoryStatus: 'INSTOCK' },
  { id: '1002', code: 'zz21cz3c1', name: 'Blue Band', category: 'Fitness', price: 79, rating: 3, inventoryStatus: 'LOWSTOCK' },
  { id: '1003', code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', price: 29, rating: 5, inventoryStatus: 'INSTOCK' },
  { id: '1004', code: 'h456wer53', name: 'Bracelet', category: 'Accessories', price: 15, rating: 4, inventoryStatus: 'INSTOCK' },
  { id: '1005', code: 'av2231fwg', name: 'Brown Purse', category: 'Accessories', price: 120, rating: 4, inventoryStatus: 'OUTOFSTOCK' },
  { id: '1006', code: 'bib36pfvm', name: 'Chakra Bracelet', category: 'Accessories', price: 32, rating: 3, inventoryStatus: 'LOWSTOCK' },
  { id: '1007', code: 'mbvjkgip5', name: 'Galaxy Earrings', category: 'Accessories', price: 45, rating: 5, inventoryStatus: 'INSTOCK' },
  { id: '1008', code: 'vbb124btr', name: 'Game Controller', category: 'Electronics', price: 99, rating: 4, inventoryStatus: 'LOWSTOCK' },
  { id: '1009', code: 'cm230f032', name: 'Gaming Set', category: 'Electronics', price: 299, rating: 5, inventoryStatus: 'INSTOCK' }
];

export const MOCK_TREE_NODES: TreeNodeItem[] = [
  {
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
      {
        key: '0-0',
        label: 'Work',
        data: 'Work Folder',
        icon: 'pi pi-fw pi-cog',
        children: [
          { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
          { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
        ]
      },
      {
        key: '0-1',
        label: 'Home',
        data: 'Home Folder',
        icon: 'pi pi-fw pi-home',
        children: [
          { key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for Electricity' }
        ]
      }
    ]
  },
  {
    key: '1',
    label: 'Pictures',
    data: 'Pictures Folder',
    icon: 'pi pi-fw pi-image',
    children: [
      { key: '1-0', label: 'barcelona.jpg', icon: 'pi pi-fw pi-image', data: 'Barcelona Sunset' },
      { key: '1-1', label: 'logo.png', icon: 'pi pi-fw pi-image', data: 'PrimeNG / Angular Logo' }
    ]
  },
  {
    key: '2',
    label: 'Movies',
    data: 'Movies Folder',
    icon: 'pi pi-fw pi-video',
    children: [
      { key: '2-0', label: 'Al-Pacino.mp4', icon: 'pi pi-fw pi-video', data: 'Godfather' },
      { key: '2-1', label: 'Robert-De-Niro.mp4', icon: 'pi pi-fw pi-video', data: 'Taxi Driver' }
    ]
  }
];

export const MOCK_TIMELINE_EVENTS: TimelineEventItem[] = [
  { status: 'Ordered', date: '15/10/2026 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', description: 'Order #20491 successfully placed' },
  { status: 'Processing', date: '15/10/2026 14:00', icon: 'pi pi-cog', color: '#673AB7', description: 'Payment verified and items packed' },
  { status: 'Shipped', date: '15/10/2026 16:15', icon: 'pi pi-envelope', color: '#FF9800', description: 'Handed over to carrier courier' },
  { status: 'Delivered', date: '16/10/2026 10:00', icon: 'pi pi-check', color: '#607D8B', description: 'Package delivered to recipient' }
];

export const COMPONENT_SHOWCASES: ComponentShowcase[] = [
  { id: '1', name: 'Button', description: 'Interactive button component', category: 'form' },
  { id: '2', name: 'Data Grid', description: 'Advanced data table', category: 'data' },
  { id: '3', name: 'Modal', description: 'Overlay dialog window', category: 'overlay' }
];
