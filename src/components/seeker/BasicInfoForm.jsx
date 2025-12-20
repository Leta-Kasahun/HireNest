import { useState, useEffect } from 'react';
import { User, Phone, Calendar, Save } from 'lucide-react';
import Button from '../Button';
import Input from '../Input';

const BasicInfoForm = ({ initialData, onSave, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        gender: '',
        dateOfBirth: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                middleName: initialData.middleName || '',
                lastName: initialData.lastName || '',
                phone: initialData.phone || '',
                gender: initialData.gender || '',
                dateOfBirth: initialData.dateOfBirth || ''
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.middleName) newErrors.middleName = 'Middle name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!/^[+]?[0-9]{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number format';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    placeholder="e.g. Alice"
                    icon={User}
                    required
                />
                <Input
                    label="Middle Name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    error={errors.middleName}
                    placeholder="e.g. Marie"
                    icon={User}
                    required
                />
                <Input
                    label="Last Name (Optional)"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    placeholder="e.g. Johnson"
                    icon={User}
                />
                <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="e.g. +251 911..."
                    icon={Phone}
                    required
                />

                <div className="flex flex-col space-y-2 mb-4">
                    <label className="text-sm font-semibold text-primary dark:text-gray-300 ml-1">
                        Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4 p-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-none border border-gray-300 dark:border-gray-700">
                        {['MALE', 'FEMALE'].map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleChange({ target: { name: 'gender', value: option } })}
                                className={`flex-1 py-2.5 px-4 rounded-none text-sm font-bold transition-all duration-300 ${formData.gender === option
                                        ? 'bg-secondary text-white shadow-md'
                                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {errors.gender && <p className="text-xs text-red-500 ml-1 mt-1">{errors.gender}</p>}
                </div>

                <Input
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    error={errors.dateOfBirth}
                    icon={Calendar}
                    required
                />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                {onCancel && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    isLoading={isLoading}
                    icon={<Save size={20} />}
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default BasicInfoForm;
