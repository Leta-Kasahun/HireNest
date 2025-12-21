import { useState } from 'react';
import { Layers, Check, X, Plus } from 'lucide-react';
import Button from '../../Button';
import useSeekerStore from '../../../store/seekerStore';

/**
 * SectorSection Component - Multi-select Industry Sectors
 * Clean separation: UI rendering + business logic via store
 */
const SectorSection = () => {
    const { sectors, addSector, removeSector, isLoading } = useSeekerStore();
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState('');

    const availableSectors = [
        'Technology & IT',
        'Healthcare & Medical',
        'Finance & Banking',
        'Education & Training',
        'Real Estate',
        'Manufacturing',
        'Hospitality & Tourism',
        'Creative Arts & Design',
        'Marketing & Sales',
        'Construction',
        'Retail & E-commerce',
        'Transportation & Logistics'
    ];

    // Ensure sectors is always an array
    const sectorsList = Array.isArray(sectors) ? sectors : [];
    const selectedSectorNames = sectorsList.map(s => s.sector);

    const handleAddSector = async (sectorName) => {
        // Check if already selected in frontend first
        if (selectedSectorNames.includes(sectorName)) {
            return; // Silently ignore if already selected
        }

        try {
            await addSector({ sector: sectorName });
            setError('');
        } catch (err) {
            // Only show error if it's not a duplicate error
            const errorMsg = err.message || 'Failed to add sector';
            if (!errorMsg.toLowerCase().includes('already')) {
                setError(errorMsg);
            }
        }
    };

    const handleRemoveSector = async (sectorId) => {
        try {
            await removeSector(sectorId);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to remove sector');
        }
    };

    return (
        <section className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/20 rounded-[2rem] p-8 transition-all hover:shadow-2xl hover:shadow-gray-200/40 dark:hover:shadow-none">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Layers size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-primary dark:text-white">Industry Sectors</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Select all industries you work in</p>
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

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Add Sector Grid */}
            {isAdding && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {availableSectors.map((sectorName) => {
                            const isSelected = selectedSectorNames.includes(sectorName);
                            return (
                                <button
                                    key={sectorName}
                                    onClick={() => !isSelected && handleAddSector(sectorName)}
                                    disabled={isLoading || isSelected}
                                    className={`flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all text-left ${isSelected
                                        ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                        : 'border-gray-100 dark:border-gray-800 hover:border-amber-500/30 text-gray-600 dark:text-gray-400 hover:bg-amber-500/5'
                                        }`}
                                >
                                    <span className="font-bold text-sm tracking-tight">{sectorName}</span>
                                    {isSelected && <Check size={18} className="text-green-500" />}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex justify-end">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setIsAdding(false);
                                setError('');
                            }}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            )}

            {/* Selected Sectors Display */}
            {sectorsList.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {sectorsList.map((sector) => (
                        <div
                            key={sector.id}
                            className="group flex items-center gap-3 pl-5 pr-3 py-3 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-all"
                        >
                            <Layers size={16} className="text-amber-500" />
                            <span className="text-sm font-bold text-primary dark:text-white">{sector.sector}</span>
                            <button
                                onClick={() => handleRemoveSector(sector.id)}
                                disabled={isLoading}
                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                title="Remove sector"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !isAdding && (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/20 rounded-[1.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <Layers className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
                        <h3 className="text-lg font-bold text-primary dark:text-white">Choose your sectors</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                            Select all industries you work in to get better job recommendations.
                        </p>
                        <Button onClick={() => setIsAdding(true)} variant="outline" icon={<Plus size={18} />}>
                            Select Sectors
                        </Button>
                    </div>
                )
            )}
        </section>
    );
};

export default SectorSection;
