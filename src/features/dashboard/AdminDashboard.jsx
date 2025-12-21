import React from 'react';
import {
    Shield,
    Users,
    Briefcase,
    Flag,
    CheckCircle,
    XCircle,
    TrendingUp,
    Filter,
    Download,
    ArrowUpRight,
    ShieldCheck,
    Activity,
    Server,
    AlertTriangle,
    Mail,
    MoreHorizontal
} from 'lucide-react';

const AdminDashboard = ({ user }) => {
    const stats = [
        { label: 'Active Network', value: '124.5k', detail: '+12% system load', icon: Activity, color: 'text-secondary', bg: 'bg-secondary/10' },
        { label: 'Job Throughput', value: '18,892', detail: '45 pending auth', icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        { label: 'Gross Revenue', value: '$845k', detail: '+24.5% MoM', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'System Health', value: 'Active', detail: 'Latency: 24ms', icon: Server, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    ];

    const verificationQueue = [
        { company: 'Vertex Global', type: 'Enterprise', status: 'Identity Check', time: '2h ago', level: 'High' },
        { company: 'Nova Labs', type: 'Agency', status: 'Payment Auth', time: '5h ago', level: 'Medium' },
        { company: 'Digital Pulse', type: 'Freelancer', status: 'Manual Review', time: 'Yesterday', level: 'Critical' },
    ];

    const systemReports = [
        { id: '#HP-902', type: 'Security', message: 'Rate limit tripped: IP 192.x...', priority: 'High' },
        { id: '#HP-903', type: 'Moderation', message: 'Fake Job Listing: Tech CEO', priority: 'Medium' },
        { id: '#HP-904', type: 'System', message: 'Database backup successful', priority: 'Low' },
    ];

    return (
        <div className="space-y-10 animate-fade-in pb-12">
            {/* High-Authority Admin Header */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest mb-4 border border-red-500/10">
                        <Shield size={14} /> Root Access Level
                    </div>
                    <h1 className="text-4xl font-heading font-black text-primary dark:text-white leading-tight italic">
                        Command Center.
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mt-1">
                        Security protocols are active. Platform oversight is at <span className="text-emerald-500 font-bold">100% capacity</span>.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="px-6 py-4 bg-white dark:bg-[#151C26] rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-6 shadow-sm">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Live Nodes</span>
                            <span className="text-xl font-black text-primary dark:text-white leading-none">1,242</span>
                        </div>
                        <div className="w-10 h-1 relative overflow-hidden bg-gray-100 dark:bg-white/10 rounded-full">
                            <div className="absolute inset-0 bg-emerald-500 w-[70%] animate-pulse"></div>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-light transition-all shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95">
                        <Download size={20} /> System Audit
                    </button>
                </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#151C26] p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm group hover:border-secondary transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                                <stat.icon size={22} />
                            </div>
                            <div className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-gray-300">
                                <MoreHorizontal size={18} />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-primary dark:text-white mb-1.5">{stat.value}</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 leading-none">{stat.label}</div>
                        <div className="text-[10px] font-black text-emerald-500 py-1 px-2 border border-emerald-500/10 bg-emerald-500/5 rounded-lg inline-block font-mono">
                            {stat.detail}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Verification Queue - Table Style */}
                <div className="lg:col-span-8 bg-white dark:bg-[#151C26] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-gray-50 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01] flex items-center justify-between">
                        <h3 className="text-xs font-black text-primary dark:text-white uppercase tracking-[0.2em] flex items-center gap-3 italic">
                            <ShieldCheck className="text-secondary" /> Auth Verification Queue
                        </h3>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Filter size={18} /></button>
                            <button className="text-secondary text-xs font-black hover:underline uppercase tracking-widest">Global Ops</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-50 dark:border-white/5 bg-gray-50 dark:bg-black/10">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Company</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Level</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                {verificationQueue.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-primary dark:text-white text-lg group-hover:text-secondary italic transition-colors leading-none mb-1">{item.company}</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{item.type} • {item.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/10 inline-flex items-center gap-2">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                                <span className="text-[10px] font-black text-gray-500 dark:text-gray-300 uppercase tracking-widest">{item.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${item.level === 'Critical' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' :
                                                    item.level === 'High' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' :
                                                        'bg-gray-100 dark:bg-white/10 text-gray-400'
                                                }`}>
                                                {item.level}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/10 flex items-center justify-center">
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/10 flex items-center justify-center">
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="w-full py-5 bg-gray-50/50 dark:bg-white/[0.02] border-t border-gray-50 dark:border-white/5 text-[10px] font-black text-secondary tracking-[0.2em] uppercase hover:bg-secondary hover:text-white transition-all">
                        View Full Authorization Hierarchy <ArrowUpRight size={14} className="inline mb-1 ml-1" />
                    </button>
                </div>

                {/* Security / System Logs Aside */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-[#0B1C2D] text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                            <AlertTriangle size={180} />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-secondary flex items-center gap-2 relative z-10">
                            <Server size={14} /> Critical System Logs
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {systemReports.map((log) => (
                                <div key={log.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group/log">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-mono text-gray-500">{log.id}</span>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${log.priority === 'High' ? 'bg-rose-500 text-white' : 'bg-gray-700 text-gray-300'
                                            }`}>{log.priority}</span>
                                    </div>
                                    <div className="font-bold text-sm mb-1 group-hover/log:text-secondary transition-colors">{log.type} Issue</div>
                                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{log.message}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-extrabold uppercase tracking-widest hover:bg-white/10 transition-all">
                            Initialize Full Log Audit
                        </button>
                    </div>

                    {/* Communication Tool Support */}
                    <div className="bg-white dark:bg-[#151C26] rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-8 shadow-sm">
                        <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-black text-primary dark:text-white mb-2 italic">Broadcast System</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-6">
                            Send critical alerts or maintenance windows notifications to all <span className="text-secondary font-bold">124k users</span> instantly.
                        </p>
                        <button className="w-full py-4 bg-secondary text-white font-black rounded-2xl hover:bg-secondary-dark transition-all shadow-xl shadow-secondary/20 text-xs uppercase tracking-widest font-mono italic">
                            INITIATE BROADCAST
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
