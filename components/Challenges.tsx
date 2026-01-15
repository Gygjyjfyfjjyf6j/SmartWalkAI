
import React from 'react';
import { Trophy, Star, Target, Zap, Award } from 'lucide-react';
import { Challenge, Badge } from '../types';

interface ChallengesProps {
  steps: number;
}

const Challenges: React.FC<ChallengesProps> = ({ steps }) => {
  const activeChallenges: Challenge[] = [
    { id: '1', title: 'Daily Sprint', description: 'Reach 5,000 steps before 12 PM', target: 5000, current: Math.min(steps, 5000), unit: 'steps', icon: 'zap', completed: steps >= 5000 },
    { id: '2', title: 'Cardio King', description: 'Burn 400 kcal in a single day', target: 400, current: Math.min(Math.floor(steps * 0.04), 400), unit: 'kcal', icon: 'flame', completed: steps * 0.04 >= 400 },
    { id: '3', title: 'Marathon Week', description: 'Complete 50km this week', target: 50, current: 32.4, unit: 'km', icon: 'target', completed: false },
  ];

  const badges: Badge[] = [
    { id: 'b1', name: 'First Steps', icon: '👣', earnedAt: '2023-10-01' },
    { id: 'b2', name: 'Early Bird', icon: '🌅' },
    { id: 'b3', name: '10K Club', icon: '🎖️' },
    { id: 'b4', name: 'Fire Starter', icon: '🔥' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Weekly Challenges</h2>
          <p className="text-sm text-slate-500">Push your limits to earn exclusive rewards.</p>
        </div>
        <div className="bg-yellow-50 text-yellow-600 p-3 rounded-2xl border border-yellow-100">
          <Trophy size={24} />
        </div>
      </div>

      <div className="grid gap-4">
        {activeChallenges.map(challenge => (
          <div key={challenge.id} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm relative overflow-hidden">
            {challenge.completed && (
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-[10px] font-bold rounded-bl-xl uppercase tracking-tighter">
                Completed
              </div>
            )}
            <div className="flex gap-4 items-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${challenge.completed ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                {challenge.icon === 'zap' ? <Zap size={24} /> : challenge.icon === 'flame' ? <Star size={24} /> : <Target size={24} />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{challenge.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{challenge.description}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-slate-400">Progress</span>
                <span className="text-slate-700">{challenge.current} / {challenge.target} {challenge.unit}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${challenge.completed ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Your Badges</h2>
        <div className="grid grid-cols-4 gap-4">
          {badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm border transition-all ${badge.earnedAt ? 'bg-white border-yellow-100 grayscale-0 opacity-100 scale-100' : 'bg-slate-50 border-slate-100 grayscale opacity-40 scale-90'}`}>
                {badge.icon}
              </div>
              <span className={`text-[10px] font-bold text-center ${badge.earnedAt ? 'text-slate-800' : 'text-slate-400'}`}>
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2rem] p-6 text-white text-center">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
          <Award size={24} />
        </div>
        <h3 className="text-lg font-bold mb-1">Global Leaderboard</h3>
        <p className="text-sm text-slate-400 mb-6">See how you rank against walkers in your region.</p>
        <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-sm hover:bg-slate-100 transition-colors">
          View Rankings
        </button>
      </div>
    </div>
  );
};

export default Challenges;
