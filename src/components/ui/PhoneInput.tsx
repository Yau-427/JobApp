import React, { useState, useEffect } from 'react';

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ label, value, onChange, error, placeholder }) => {
    const [displayValue, setDisplayValue] = useState<string>('');

    const formatPhone = (input: string) => {
        if (!input) return '';

        // Удаляем все нецифровые символы, кроме первого нуля если он есть
        let numbers = input.replace(/\D/g, '');

        // Если первый символ не ноль - добавляем его
        if (numbers.length > 0 && numbers[0] !== '0') {
            numbers = '0' + numbers;
        }

        // Ограничиваем длину 10 цифрами (включая ведущий 0)
        numbers = numbers.slice(0, 10);

        // Форматируем с пробелами
        let formatted = numbers.slice(0, 1); // первый символ (0)
        if (numbers.length > 1) formatted += numbers.slice(1, 4);
        if (numbers.length > 4) formatted += ' ' + numbers.slice(4, 7);
        if (numbers.length > 7) formatted += ' ' + numbers.slice(7, 11);

        return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const prev = displayValue;
        const prevDigits = prev.replace(/\D/g, '');
        const currentDigits = raw.replace(/\D/g, '').slice(0, 10);

        const formatted = formatPhone(currentDigits);
        setDisplayValue(formatted);
        onChange('phone', currentDigits);

        // Вычисляем новую позицию курсора
        setTimeout(() => {
            const input = e.target;
            let position = input.selectionStart;

            // Если длина увеличилась и символ добавлен посередине, сдвинем курсор
            if (position !== null && formatted.length > prev.length && position < formatted.length) {
                if (formatted[position - 1] === ' ' && raw.length <= formatted.length) {
                    position += 1;
                }
            }

            if (position !== null) {
                input.setSelectionRange(position, position);
            }
        }, 0);
    };

    useEffect(() => {
        if (value) {
            setDisplayValue(formatPhone(value));
        } else {
            setDisplayValue('');
        }
    }, [value]);

    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                type="tel"
                className={`form-input ${error ? 'input-error' : ''}`}
                value={displayValue}
                onChange={handleChange}
                maxLength={14} // 0 XXX XXX XXXX (с пробелами)
                placeholder={placeholder || "0XXX XXX XXX"}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default PhoneInput;