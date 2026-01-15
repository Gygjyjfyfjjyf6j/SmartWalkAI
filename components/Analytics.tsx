
import React from 'react';
import { ActivityDay } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Footprints, Calendar } from 'lucide-react';

interface AnalyticsProps {
  history: ActivityDay[];
}

const Analytics: React.FC<AnalyticsProps> = ({ history }) => {
  const chartData = history.slice(-7).map(day => ({
    name: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    steps: day.steps,
    calories: day.calories,
    distance: day.distance
  }));

  const avgSteps = Math.round(chartData.reduce((acc, curr) => acc + curr.steps, 0) / chartData.length);
  const totalSteps = chartData.reduce((acc, curr) => acc + curr.steps, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Analytics</h2>
        <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
          <Calendar size={14} /> Last 7 Days
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Daily Avg</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800">{avgSteps.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-slate-400">steps</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-green-500 font-bold text-[10px]">
            <TrendingUp size={12} /> +12.5% this week
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Distance</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800">{(totalSteps * 0.0007).toFixed(1)}</span>
            <span className="text-[10px] font-bold text-slate-400">km</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-2">Almost a marathon! 🏃‍♂️</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Footprints size={18} />
          </div>
          <h3 className="font-bold text-slate-800">Weekly Step Trends</h3>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="steps" 
                radius={[6, 6, 6, 6]}
                barSize={32}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.steps > avgSteps ? '#4f46e5' : '#cbd5e1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <h3 className="font-bold text-slate-800 mb-6">Calorie Burn</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="calories" 
                stroke="#f59e0b" 
                fillOpacity={1} 
                fill="url(#colorCal)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
