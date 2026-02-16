
export interface Member {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  role: string;
  wifeName: string;
  dpUrl?: string;
  wifePhotoUrl?: string;
  joinDate: string;
  creditScore: number;
  totalLifetimeContribution: number;
  createdDate: string;
}

export interface Contribution {
  id: string;
  memberId?: string; // If undefined, it's an external donation
  donorName: string;
  amount: number;
  date: string;
  year: number;
  paymentMode: 'Cash' | 'Bank' | 'QR';
  note?: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  year: number;
  addedBy: string;
}

export interface Budget {
  id: string;
  category: string;
  plannedAmount: number;
  year: number;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
}

export interface ClubSettings {
  name: string;
  logoUrl?: string;
  establishedYear: number;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  bankDetails: {
    accountHolder: string;
    accountNumber: string;
    ifsc: string;
    branch: string;
    qrUrl?: string;
  };
  rules: string[];
}

export interface AppState {
  years: number[];
  selectedYear: number;
  members: Member[];
  contributions: Contribution[];
  expenses: Expense[];
  budgets: Budget[];
  committee: CommitteeMember[];
  settings: ClubSettings;
}
