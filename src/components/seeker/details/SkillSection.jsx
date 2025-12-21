import { useState } from 'react';
import { Cpu, Plus, X, Trash2, Check } from 'lucide-react';
import Button from '../../Button';
import useSeekerStore from '../../../store/seekerStore';

const SkillSection = () => {
    const { skills, addSkill, updateSkill, isLoading } = useSeekerStore();
    const [isAdding, setIsAdding] = useState(false);
    const [newSkill, setNewSkill] = useState({ skill: '', proficiency: 'BEGINNER' });

    const proficiencies = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

    const handleAdd = async () => {
        if (!newSkill.skill.trim()) return;
        try {
            await addSkill(newSkill);
            setNewSkill({ skill: '', proficiency: 'BEGINNER' });
            setIsAdding(false);
        } catch (error) {
            // Managed by store
        }
    };

    return (
        <section className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/20 rounded-[2rem] p-8 transition-all hover:shadow-2xl hover:shadow-gray-200/40 dark:hover:shadow-none">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <Cpu size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-primary dark:text-white">Technical Skills</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">List your expertise and tools</p>
                    </div>
                </div>
                {!isAdding && (
                    <Button
                        variant="ghost"
                        icon={<Plus size={18} />}
                        onClick={() => setIsAdding(true)}
                    >
                        Add
                    </Button>
                )}
            </div>

            {isAdding && (
                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-secondary/20 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Skill name (e.g. React.js)"
                            value={newSkill.skill}
                            onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
                            className="bg-white dark:bg-gray-800 border-2 border-transparent focus:border-secondary/30 rounded-2xl px-5 py-3 outline-none text-primary dark:text-white transition-all shadow-sm"
                        />
                        <select
                            value={newSkill.proficiency}
                            onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                            className="bg-white dark:bg-gray-800 border-2 border-transparent focus:border-secondary/30 rounded-2xl px-5 py-3 outline-none text-primary dark:text-white transition-all shadow-sm cursor-pointer"
                        >
                            {proficiencies.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
                        <Button variant="secondary" size="sm" icon={<Check size={16} />} onClick={handleAdd} isLoading={isLoading}>Add Skill</Button>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-3">
                {skills.length > 0 ? (
                    skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="group flex items-center gap-3 pl-4 pr-2 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:border-secondary/50 transition-all hover:translate-y-[-2px]"
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-primary dark:text-white">{skill.skill}</span>
                                <span className="text-[10px] uppercase tracking-widest font-black text-secondary">{skill.proficiency}</span>
                            </div>
                            <button
                                className="p-1.5 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                title="Remove skill"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))
                ) : !isAdding && (
                    <div className="w-full text-center py-6 bg-gray-50 dark:bg-gray-800/10 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500">No skills added yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SkillSection;
