// frontend/src/utils/formValidator.js

/**
 * 📝 Advanced Form Validation Engine
 * Comprehensive validation with custom rules
 */

class FormValidator {
    constructor(options = {}) {
        this.rules = new Map();
        this.errors = new Map();
        this.touched = new Set();
        this.customValidators = new Map();
        this.asyncValidators = new Map();

        this.registerDefaultValidators();
    }

    /**
     * Register default validators
     */
    registerDefaultValidators() {
        // Required
        this.customValidators.set('required', (value) => {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string') return value.trim().length > 0;
            if (Array.isArray(value)) return value.length > 0;
            return true;
        });

        // Email
        this.customValidators.set('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return !value || emailRegex.test(value);
        });

        // Min length
        this.customValidators.set('minLength', (value, min) => {
            return !value || value.length >= min;
        });

        // Max length
        this.customValidators.set('maxLength', (value, max) => {
            return !value || value.length <= max;
        });

        // Min value
        this.customValidators.set('min', (value, min) => {
            return !value || Number(value) >= min;
        });

        // Max value
        this.customValidators.set('max', (value, max) => {
            return !value || Number(value) <= max;
        });

        // Pattern
        this.customValidators.set('pattern', (value, pattern) => {
            if (!value) return true;
            const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
            return regex.test(value);
        });

        // URL
        this.customValidators.set('url', (value) => {
            if (!value) return true;
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        });

        // Numeric
        this.customValidators.set('numeric', (value) => {
            return !value || !isNaN(value);
        });

        // Alpha
        this.customValidators.set('alpha', (value) => {
            return !value || /^[a-zA-Z]+$/.test(value);
        });

        // Alphanumeric
        this.customValidators.set('alphanumeric', (value) => {
            return !value || /^[a-zA-Z0-9]+$/.test(value);
        });

        // Phone
        this.customValidators.set('phone', (value) => {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            return !value || phoneRegex.test(value);
        });

        // Date
        this.customValidators.set('date', (value) => {
            if (!value) return true;
            const date = new Date(value);
            return !isNaN(date.getTime());
        });

        // Match (password confirmation)
        this.customValidators.set('match', (value, fieldName, formData) => {
            return !value || value === formData[fieldName];
        });
    }

    /**
     * Add custom validator
     */
    addValidator(name, validator) {
        this.customValidators.set(name, validator);
    }

    /**
     * Add async validator
     */
    addAsyncValidator(name, validator) {
        this.asyncValidators.set(name, validator);
    }

    /**
     * Set field rules
     */
    setRules(fieldName, rules) {
        this.rules.set(fieldName, rules);
    }

    /**
     * Set all rules
     */
    setAllRules(rulesObject) {
        Object.entries(rulesObject).forEach(([field, rules]) => {
            this.setRules(field, rules);
        });
    }

    /**
     * Validate single field
     */
    validateField(fieldName, value, formData = {}) {
        const rules = this.rules.get(fieldName);
        if (!rules) return true;

        const errors = [];

        // Sync validation
        for (const [validatorName, config] of Object.entries(rules)) {
            if (validatorName.startsWith('async')) continue;

            const validator = this.customValidators.get(validatorName);
            if (!validator) {
                console.warn(`Unknown validator: ${validatorName}`);
                continue;
            }

            let isValid;
            if (typeof config === 'object' && config !== null) {
                isValid = validator(value, config.value, formData);
            } else {
                isValid = validator(value, config, formData);
            }

            if (!isValid) {
                const message = typeof config === 'object' && config.message
                    ? config.message
                    : this.getDefaultMessage(validatorName, config);

                errors.push(message);
            }
        }

        if (errors.length > 0) {
            this.errors.set(fieldName, errors);
            return false;
        } else {
            this.errors.delete(fieldName);
            return true;
        }
    }

    /**
     * Async validate field
     */
    async validateFieldAsync(fieldName, value, formData = {}) {
        const rules = this.rules.get(fieldName);
        if (!rules) return true;

        const errors = [];

        // Async validation
        for (const [validatorName, config] of Object.entries(rules)) {
            if (!validatorName.startsWith('async')) continue;

            const realName = validatorName.replace('async', '').toLowerCase();
            const validator = this.asyncValidators.get(realName);

            if (!validator) {
                console.warn(`Unknown async validator: ${realName}`);
                continue;
            }

            try {
                const isValid = await validator(value, config, formData);

                if (!isValid) {
                    const message = typeof config === 'object' && config.message
                        ? config.message
                        : `${fieldName} is invalid`;

                    errors.push(message);
                }
            } catch (error) {
                console.error(`Async validation error for ${fieldName}:`, error);
                errors.push('Validation failed');
            }
        }

        if (errors.length > 0) {
            this.errors.set(fieldName, errors);
            return false;
        } else {
            this.errors.delete(fieldName);
            return true;
        }
    }

    /**
     * Validate all fields
     */
    validate(formData) {
        let isValid = true;

        for (const [fieldName] of this.rules) {
            const fieldValid = this.validateField(fieldName, formData[fieldName], formData);
            if (!fieldValid) isValid = false;
        }

        return isValid;
    }

    /**
     * Async validate all fields
     */
    async validateAsync(formData) {
        const results = await Promise.all(
            Array.from(this.rules.keys()).map(fieldName =>
                this.validateFieldAsync(fieldName, formData[fieldName], formData)
            )
        );

        return results.every(r => r);
    }

    /**
     * Get field errors
     */
    getErrors(fieldName) {
        return this.errors.get(fieldName) || [];
    }

    /**
     * Get all errors
     */
    getAllErrors() {
        const errors = {};
        this.errors.forEach((errorList, fieldName) => {
            errors[fieldName] = errorList;
        });
        return errors;
    }

    /**
     * Has errors
     */
    hasErrors() {
        return this.errors.size > 0;
    }

    /**
     * Clear errors
     */
    clearErrors(fieldName) {
        if (fieldName) {
            this.errors.delete(fieldName);
        } else {
            this.errors.clear();
        }
    }

    /**
     * Mark field as touched
     */
    touch(fieldName) {
        this.touched.add(fieldName);
    }

    /**
     * Is field touched
     */
    isTouched(fieldName) {
        return this.touched.has(fieldName);
    }

    /**
     * Reset
     */
    reset() {
        this.errors.clear();
        this.touched.clear();
    }

    /**
     * Get default error message
     */
    getDefaultMessage(validatorName, config) {
        const messages = {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            minLength: `Minimum length is ${config}`,
            maxLength: `Maximum length is ${config}`,
            min: `Minimum value is ${config}`,
            max: `Maximum value is ${config}`,
            pattern: 'Invalid format',
            url: 'Please enter a valid URL',
            numeric: 'Please enter a number',
            alpha: 'Please enter only letters',
            alphanumeric: 'Please enter only letters and numbers',
            phone: 'Please enter a valid phone number',
            date: 'Please enter a valid date',
            match: 'Fields do not match'
        };

        return messages[validatorName] || 'Invalid value';
    }
}

/**
 * React Hook
 */
export const useFormValidator = (initialRules = {}) => {
    const [validator] = React.useState(() => new FormValidator());
    const [errors, setErrors] = React.useState({});
    const [touched, setTouched] = React.useState({});

    React.useEffect(() => {
        validator.setAllRules(initialRules);
    }, []);

    const validateField = React.useCallback((fieldName, value, formData) => {
        const isValid = validator.validateField(fieldName, value, formData);
        setErrors(validator.getAllErrors());
        return isValid;
    }, [validator]);

    const validateFieldAsync = React.useCallback(async (fieldName, value, formData) => {
        const isValid = await validator.validateFieldAsync(fieldName, value, formData);
        setErrors(validator.getAllErrors());
        return isValid;
    }, [validator]);

    const validate = React.useCallback((formData) => {
        const isValid = validator.validate(formData);
        setErrors(validator.getAllErrors());
        return isValid;
    }, [validator]);

    const validateAsync = React.useCallback(async (formData) => {
        const isValid = await validator.validateAsync(formData);
        setErrors(validator.getAllErrors());
        return isValid;
    }, [validator]);

    const touchField = React.useCallback((fieldName) => {
        validator.touch(fieldName);
        setTouched(prev => ({ ...prev, [fieldName]: true }));
    }, [validator]);

    const clearErrors = React.useCallback((fieldName) => {
        validator.clearErrors(fieldName);
        setErrors(validator.getAllErrors());
    }, [validator]);

    const reset = React.useCallback(() => {
        validator.reset();
        setErrors({});
        setTouched({});
    }, [validator]);

    return {
        validateField,
        validateFieldAsync,
        validate,
        validateAsync,
        touchField,
        clearErrors,
        reset,
        errors,
        touched,
        hasErrors: Object.keys(errors).length > 0
    };
};

/**
 * Common validation rules
 */
export const ValidationRules = {
    username: {
        required: true,
        minLength: { value: 3, message: 'Username must be at least 3 characters' },
        maxLength: { value: 20, message: 'Username must be at most 20 characters' },
        pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Username can only contain letters, numbers and underscores'
        }
    },

    email: {
        required: true,
        email: { message: 'Please enter a valid email address' }
    },

    password: {
        required: true,
        minLength: { value: 8, message: 'Password must be at least 8 characters' },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: 'Password must contain uppercase, lowercase and number'
        }
    },

    passwordConfirm: (passwordFieldName = 'password') => ({
        required: true,
        match: {
            value: passwordFieldName,
            message: 'Passwords do not match'
        }
    }),

    url: {
        url: { message: 'Please enter a valid URL' }
    },

    phone: {
        phone: { message: 'Please enter a valid phone number' }
    }
};

export default FormValidator;


