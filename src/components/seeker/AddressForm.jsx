import { useState, useEffect } from 'react';
import { MapPin, Globe, Home, Save } from 'lucide-react';
import Button from '../Button';
import Input from '../Input';

const AddressForm = ({ initialData, onSave, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        country: '',
        region: '',
        city: '',
        subCity: '',
        street: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                country: initialData.country || '',
                region: initialData.region || '',
                city: initialData.city || '',
                subCity: initialData.subCity || '',
                street: initialData.street || ''
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.city) newErrors.city = 'City is required';
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
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                    placeholder="e.g. Ethiopia"
                    icon={Globe}
                    required
                />
                <Input
                    label="Region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    error={errors.region}
                    placeholder="e.g. Addis Ababa"
                    icon={MapPin}
                />
                <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    placeholder="e.g. Addis Ababa"
                    icon={MapPin}
                    required
                />
                <Input
                    label="Sub City"
                    name="subCity"
                    value={formData.subCity}
                    onChange={handleChange}
                    error={errors.subCity}
                    placeholder="e.g. Bole"
                    icon={MapPin}
                />
                <div className="md:col-span-2">
                    <Input
                        label="Street / Landmark"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        error={errors.street}
                        placeholder="e.g. Airport Road, near Bole Medhanialem"
                        icon={Home}
                    />
                </div>
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
                    Update Address
                </Button>
            </div>
        </form>
    );
};

export default AddressForm;
