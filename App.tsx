
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  IndianRupee, 
  Settings, 
  Menu, 
  X, 
  Plus, 
  Search, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  LogOut,
  Calendar,
  Building2,
  ListChecks,
  Palette,
  Phone,
  Mail,
  MapPin,
  Lock,
  Camera,
  Trash2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AppState, Member, Contribution, Expense, Budget } from './types';
import { INITIAL_STATE, THEME } from './constants';

// --- Sub-Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-yellow-400 text-red-700 shadow-md font-bold' 
        : 'text-white hover:bg-white/10'
    }`}
  >
    <Icon size={20} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const Card = ({ title, value, icon: Icon, colorClass }: { title: string, value: string | number, icon: any, colorClass: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="text-white" size={24} />
    </div>
  </div>
);

// --- Settings Components ---

// Fix: Made children optional to avoid TypeScript errors when used in JSX
const SettingsCard = ({ title, icon: Icon, children, color }: { title: string, icon: any, children?: React.ReactNode, color: string }) => (
  <div className={`bg-white rounded-[32px] shadow-sm border-l-8 ${color} p-8 space-y-6 hover:shadow-lg transition-all duration-300`}>
    <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
      <div className={`p-3 rounded-2xl bg-gradient-to-br ${color.replace('border-', 'from-').replace('600', '500')} to-amber-400 text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-black text-gray-800 tracking-tight">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const SettingInput = ({ label, value, onChange, placeholder, type = "text", icon: Icon }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <div className="relative group">
      {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" />}
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-12' : 'px-4'} pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-4 focus:ring-red-50/50 focus:border-red-500 transition-all font-medium`}
      />
    </div>
  </div>
);

// --- Main Pages ---

const Dashboard = ({ state }: { state: AppState }) => {
  const yearData = useMemo(() => {
    const yearContributions = state.contributions.filter(c => c.year === state.selectedYear);
    const yearExpenses = state.expenses.filter(e => e.year === state.selectedYear);
    const totalColl = yearContributions.reduce((sum, c) => sum + c.amount, 0);
    const totalExp = yearExpenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = totalColl - totalExp;

    const chartData = [
      { name: 'Collection', amount: totalColl },
      { name: 'Expense', amount: totalExp },
    ];

    const topContributors = [...state.members]
      .sort((a, b) => b.totalLifetimeContribution - a.totalLifetimeContribution)
      .slice(0, 5);

    return { totalColl, totalExp, balance, chartData, topContributors };
  }, [state.contributions, state.expenses, state.selectedYear, state.members]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Overview for {state.selectedYear}</h2>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border">
          <Calendar size={18} className="text-red-600" />
          <span className="font-semibold">{state.selectedYear} Session</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Collection" value={`₹${yearData.totalColl}`} icon={IndianRupee} colorClass="bg-green-500" />
        <Card title="Total Expense" value={`₹${yearData.totalExp}`} icon={TrendingUp} colorClass="bg-red-500" />
        <Card title="Current Balance" value={`₹${yearData.balance}`} icon={ShieldCheck} colorClass="bg-blue-500" />
        <Card title="Member Count" value={state.members.length} icon={Users} colorClass="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Financial Summary</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearData.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {yearData.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Top Lifetime Contributors</h3>
          <div className="space-y-4">
            {yearData.topContributors.map((member, idx) => (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-red-600 font-bold border-2 border-yellow-400">
                    {member.fullName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{member.fullName}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
                <p className="font-bold text-red-600">₹{member.totalLifetimeContribution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberManagement = ({ state, onAddMember }: { state: AppState, onAddMember: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMembers = state.members.filter(m => 
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Member Directory</h2>
        <button 
          onClick={onAddMember}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors shadow-lg"
        >
          <Plus size={20} /> Add New Member
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by name or phone..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => (
          <div key={member.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full border border-yellow-300">
                Score: {member.creditScore}
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <img 
                  src={member.dpUrl || `https://ui-avatars.com/api/?name=${member.fullName}`} 
                  alt={member.fullName} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">{member.fullName}</h4>
                <p className="text-red-600 font-semibold text-sm uppercase tracking-wider">{member.role}</p>
              </div>
              <div className="w-full pt-4 space-y-2 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{member.phoneNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Wife Name:</span>
                  <span className="font-medium">{member.wifeName}</span>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-gray-500">Contribution:</span>
                  <span className="font-bold text-green-600">₹{member.totalLifetimeContribution}</span>
                </div>
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">
                View Profile <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FinanceSection = ({ state }: { state: AppState }) => {
  const [activeTab, setActiveTab] = useState<'chanda' | 'expense' | 'budget'>('chanda');

  const yearContributions = state.contributions.filter(c => c.year === state.selectedYear);
  const yearExpenses = state.expenses.filter(e => e.year === state.selectedYear);
  const yearBudgets = state.budgets.filter(b => b.year === state.selectedYear);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Financial Records</h2>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {(['chanda', 'expense', 'budget'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                activeTab === tab ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
              {activeTab === 'chanda' && (
                <tr>
                  <th className="px-6 py-4">Donor Name</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Mode</th>
                  <th className="px-6 py-4">Note</th>
                </tr>
              )}
              {activeTab === 'expense' && (
                <tr>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">By Admin</th>
                </tr>
              )}
              {activeTab === 'budget' && (
                <tr>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Planned</th>
                  <th className="px-6 py-4">Actual Spend</th>
                  <th className="px-6 py-4">Variance</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {activeTab === 'chanda' && yearContributions.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">{c.donorName}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">₹{c.amount}</td>
                  <td className="px-6 py-4">{c.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold">{c.paymentMode}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{c.note || '-'}</td>
                </tr>
              ))}
              {activeTab === 'expense' && yearExpenses.map(e => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">{e.category}</td>
                  <td className="px-6 py-4 text-gray-500">{e.description}</td>
                  <td className="px-6 py-4 text-red-600 font-bold">₹{e.amount}</td>
                  <td className="px-6 py-4">{e.date}</td>
                  <td className="px-6 py-4">{e.addedBy}</td>
                </tr>
              ))}
              {activeTab === 'budget' && yearBudgets.map(b => {
                const actual = yearExpenses.filter(e => e.category === b.category).reduce((sum, e) => sum + e.amount, 0);
                const variance = b.plannedAmount - actual;
                return (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{b.category}</td>
                    <td className="px-6 py-4 font-bold">₹{b.plannedAmount}</td>
                    <td className="px-6 py-4 text-orange-600">₹{actual}</td>
                    <td className="px-6 py-4 font-bold text-green-600">
                      {variance >= 0 ? `+₹${variance}` : `-₹${Math.abs(variance)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CommitteePage = ({ state }: { state: AppState }) => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-2xl font-bold text-gray-800">Current Committee Body</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {state.committee.map(member => (
        <div key={member.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold border-2 border-red-500">
            {member.name[0]}
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{member.name}</h4>
            <p className="text-red-600 text-sm font-semibold">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsPage = ({ state, setState }: { state: AppState, setState: React.Dispatch<React.SetStateAction<AppState>> }) => {
  const [newYear, setNewYear] = useState('');
  const [newRule, setNewRule] = useState('');

  const updateSetting = (key: string, value: any) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }));
  };

  const updateNestedSetting = (category: 'contact' | 'bankDetails', key: string, value: any) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [category]: { ...prev.settings[category], [key]: value }
      }
    }));
  };

  const handleAddYear = () => {
    const yearNum = parseInt(newYear);
    if (!isNaN(yearNum) && !state.years.includes(yearNum)) {
      setState(prev => ({ ...prev, years: [...prev.years, yearNum].sort() }));
      setNewYear('');
    }
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setState(prev => ({
        ...prev,
        settings: { ...prev.settings, rules: [...prev.settings.rules, newRule.trim()] }
      }));
      setNewRule('');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-20">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Main Control Center</h2>
        <p className="text-gray-500 font-medium">Configure and customize your committee system behavior</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Branding & Identity */}
        <SettingsCard title="Branding & Identity" icon={Palette} color="border-yellow-600">
          <SettingInput 
            label="Committee Name" 
            value={state.settings.name} 
            onChange={(val: string) => updateSetting('name', val)}
            icon={FileText}
          />
          <SettingInput 
            label="Established Year" 
            type="number"
            value={state.settings.establishedYear} 
            onChange={(val: number) => updateSetting('establishedYear', val)}
            icon={Calendar}
          />
          <SettingInput 
            label="Logo Image URL" 
            value={state.settings.logoUrl || ''} 
            onChange={(val: string) => updateSetting('logoUrl', val)}
            icon={Camera}
            placeholder="https://example.com/logo.png"
          />
        </SettingsCard>

        {/* Contact Information */}
        <SettingsCard title="Contact Information" icon={Phone} color="border-red-600">
          <SettingInput 
            label="Primary Phone" 
            value={state.settings.contact.phone} 
            onChange={(val: string) => updateNestedSetting('contact', 'phone', val)}
            icon={Phone}
          />
          <SettingInput 
            label="Official Email" 
            value={state.settings.contact.email} 
            onChange={(val: string) => updateNestedSetting('contact', 'email', val)}
            icon={Mail}
          />
          <SettingInput 
            label="Office Address" 
            value={state.settings.contact.address} 
            onChange={(val: string) => updateNestedSetting('contact', 'address', val)}
            icon={MapPin}
          />
        </SettingsCard>

        {/* Financial Details */}
        <SettingsCard title="Bank & Finance" icon={Building2} color="border-blue-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingInput 
              label="Account Holder" 
              value={state.settings.bankDetails.accountHolder} 
              onChange={(val: string) => updateNestedSetting('bankDetails', 'accountHolder', val)}
            />
            <SettingInput 
              label="Account Number" 
              value={state.settings.bankDetails.accountNumber} 
              onChange={(val: string) => updateNestedSetting('bankDetails', 'accountNumber', val)}
            />
            <SettingInput 
              label="IFSC Code" 
              value={state.settings.bankDetails.ifsc} 
              onChange={(val: string) => updateNestedSetting('bankDetails', 'ifsc', val)}
            />
            <SettingInput 
              label="Branch Name" 
              value={state.settings.bankDetails.branch} 
              onChange={(val: string) => updateNestedSetting('bankDetails', 'branch', val)}
            />
          </div>
          <SettingInput 
            label="Payment QR URL" 
            value={state.settings.bankDetails.qrUrl || ''} 
            onChange={(val: string) => updateNestedSetting('bankDetails', 'qrUrl', val)}
            placeholder="Link to your UPI QR image"
          />
        </SettingsCard>

        {/* System & Security */}
        <SettingsCard title="System & Security" icon={Lock} color="border-purple-600">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Active Sessions</h4>
            <div className="flex flex-wrap gap-2">
              {state.years.map(y => (
                <div key={y} className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold border transition-all ${state.selectedYear === y ? 'bg-yellow-100 border-yellow-400 text-yellow-800 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                  {y}
                  {state.selectedYear === y && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="New Session Year" 
                className="flex-1 bg-gray-50 border rounded-2xl px-4 py-3 focus:ring-4 focus:ring-purple-100 outline-none"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
              />
              <button onClick={handleAddYear} className="bg-purple-600 text-white px-6 py-3 rounded-2xl hover:bg-purple-700 shadow-lg font-bold">Add</button>
            </div>
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-3 bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all border-2 border-dashed border-gray-300">
            <Lock size={18} /> Reset Admin Password
          </button>
        </SettingsCard>

        {/* Rules & Regulations */}
        <div className="lg:col-span-2">
          <SettingsCard title="Rules & Regulations" icon={ListChecks} color="border-emerald-600">
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Draft a new committee rule..." 
                  className="flex-1 bg-gray-50 border rounded-2xl px-4 py-3 focus:ring-4 focus:ring-emerald-100 outline-none"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRule()}
                />
                <button onClick={handleAddRule} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl hover:bg-emerald-700 shadow-lg font-bold">Post Rule</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.settings.rules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl group relative overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 text-sm font-medium leading-relaxed">{rule}</p>
                    <button 
                      onClick={() => setState(prev => ({ ...prev, settings: { ...prev.settings, rules: prev.settings.rules.filter((_, idx) => idx !== i) } }))}
                      className="absolute right-2 top-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </SettingsCard>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('ab_pujacommittee_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<'dashboard' | 'members' | 'finance' | 'committee' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('ab_pujacommittee_state', JSON.stringify(state));
  }, [state]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock admin password
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect Admin Password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF5E1] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-red-600 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="bg-white w-full max-w-md p-8 rounded-[40px] shadow-2xl border-t-8 border-red-600 relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-lg transform rotate-12 mb-6">
              <ShieldCheck size={48} className="text-red-700 transform -rotate-12" />
            </div>
            <h1 className="text-2xl font-black text-gray-800 text-center uppercase leading-tight">
              Annapurna Boys<br/><span className="text-red-600">Saraswati Puja Committee</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 font-medium">Management System v2.0</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Admin Access Only</label>
              <input 
                type="password" 
                placeholder="Enter Secure Password"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs mt-2 font-bold flex items-center gap-1"><X size={14} /> {error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
            >
              Unlock Dashboard <ChevronRight size={24} />
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest">
            Established 2023 • Secured by Committee
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-red-600 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
        <span className="font-bold text-sm tracking-tighter">ANNAPURNA BOYS</span>
        <div className="w-8 h-8 rounded-full bg-yellow-400 border border-white"></div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-red-700 text-white transform transition-transform duration-300 z-50 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-yellow-400 p-2 rounded-xl text-red-700 shadow-md">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2 className="text-lg font-black leading-tight">ANNAPURNA<br/>BOYS</h2>
              <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Committee Management</p>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activePage === 'dashboard'} onClick={() => { setActivePage('dashboard'); setSidebarOpen(false); }} />
            <SidebarItem icon={Users} label="Members" active={activePage === 'members'} onClick={() => { setActivePage('members'); setSidebarOpen(false); }} />
            <SidebarItem icon={IndianRupee} label="Finance" active={activePage === 'finance'} onClick={() => { setActivePage('finance'); setSidebarOpen(false); }} />
            <SidebarItem icon={FileText} label="Committee" active={activePage === 'committee'} onClick={() => { setActivePage('committee'); setSidebarOpen(false); }} />
            <SidebarItem icon={Settings} label="Settings" active={activePage === 'settings'} onClick={() => { setActivePage('settings'); setSidebarOpen(false); }} />
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="mb-4">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-4">Switch Year</label>
              <select 
                className="w-full mt-2 bg-white/10 text-white border-none rounded-lg px-4 py-2 text-sm focus:ring-0 cursor-pointer hover:bg-white/20 transition-colors"
                value={state.selectedYear}
                onChange={(e) => setState(prev => ({ ...prev, selectedYear: parseInt(e.target.value) }))}
              >
                {state.years.map(y => <option key={y} value={y} className="text-gray-800">{y}</option>)}
              </select>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#FAFAFA]">
        <header className="hidden md:flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-800 capitalize tracking-tight">{activePage}</h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">Management Portal • v2.0</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-yellow-400 flex items-center justify-center text-white font-black shadow-md">
              A
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-gray-800">Admin</p>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Active Status</p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {activePage === 'dashboard' && <Dashboard state={state} />}
          {activePage === 'members' && <MemberManagement state={state} onAddMember={() => alert('Feature to add member coming soon!')} />}
          {activePage === 'finance' && <FinanceSection state={state} />}
          {activePage === 'committee' && <CommitteePage state={state} />}
          {activePage === 'settings' && <SettingsPage state={state} setState={setState} />}
        </div>

        <footer className="mt-20 py-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">© {new Date().getFullYear()} {state.settings.name}</p>
          <div className="flex justify-center gap-4 mt-4 text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// Simple animation utility
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
  }
`;
document.head.appendChild(style);
