
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  years: [2023, 2024, 2025, 2026],
  selectedYear: 2025,
  members: [
    {
      id: 'm1',
      fullName: 'Rajendranath Das',
      phoneNumber: '9876543210',
      address: 'Kolkata, WB',
      role: 'Secretary',
      wifeName: 'Lakshmi Das',
      joinDate: '2023-01-15',
      creditScore: 95,
      totalLifetimeContribution: 5000,
      createdDate: '2023-01-15',
      dpUrl: 'https://picsum.photos/seed/m1/200'
    },
    {
      id: 'm2',
      fullName: 'Girish Chandra Ranu',
      phoneNumber: '9876543211',
      address: 'Kolkata, WB',
      role: 'President',
      wifeName: 'Saraswati Ranu',
      joinDate: '2023-01-15',
      creditScore: 98,
      totalLifetimeContribution: 7000,
      createdDate: '2023-01-15',
      dpUrl: 'https://picsum.photos/seed/m2/200'
    }
  ],
  contributions: [
    { id: 'c1', donorName: 'Rajendranath Das', memberId: 'm1', amount: 1500, date: '2025-02-01', year: 2025, paymentMode: 'QR', note: 'Annual Chanda' },
    { id: 'c2', donorName: 'Local Shop Owner', amount: 500, date: '2025-02-02', year: 2025, paymentMode: 'Cash', note: 'External Donation' }
  ],
  expenses: [
    { id: 'e1', category: 'Decoration', description: 'Pandals and Flowers', amount: 3000, date: '2025-02-05', year: 2025, addedBy: 'Admin' }
  ],
  budgets: [
    { id: 'b1', category: 'Decoration', plannedAmount: 5000, year: 2025 },
    { id: 'b2', category: 'Prasad', plannedAmount: 2000, year: 2025 }
  ],
  committee: [
    { id: 'com1', name: 'Rajendranath Das', role: 'Secretary' },
    { id: 'com2', name: 'Girish Chandra Ranu', role: 'President' },
    { id: 'com3', name: 'Saikat Saha', role: 'Vice Secretary' },
    { id: 'com4', name: 'Pinku Singha', role: 'Vice President' },
    { id: 'com5', name: 'Sisir Hore', role: 'Cashier' }
  ],
  settings: {
    name: 'Annapurna Boys Saraswati Puja Committee',
    establishedYear: 2023,
    contact: {
      phone: '+91 98765 43210',
      email: 'committee@annapurnaboys.org',
      address: 'Near Main Market, Ward 12, West Bengal'
    },
    bankDetails: {
      accountHolder: 'Annapurna Boys Committee',
      accountNumber: '123456789012',
      ifsc: 'SBIN0001234',
      branch: 'Main Branch',
    },
    rules: [
      'All members must contribute by the first week of February.',
      'Expenses above 1000 INR require Secretary approval.',
      'Committee meetings are held every Sunday evening.',
      'Transparency is mandatory for all financial entries.'
    ]
  }
};

export const THEME = {
  primary: '#D22B2B', // Red
  secondary: '#FFD700', // Yellow/Gold
  accent: '#FFF5E1', // Soft Cream
  text: '#1F2937',
};
