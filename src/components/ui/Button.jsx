import React from 'react';
import '../../styles/variables.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    className = '',
    ...props
}) => {
    const baseStyles = {
        padding: size === 'small' ? '8px 16px' : size === 'large' ? '12px 24px' : '10px 20px',
        fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
        fontWeight: '500',
        borderRadius: '24px',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            border: '1px solid var(--color-primary)',
        },
        secondary: {
            backgroundColor: 'var(--color-bg-light)',
            color: 'var(--color-text-main)',
            border: '1px solid var(--color-border)',
        },
        outline: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-main)',
            border: '1px solid var(--color-border)',
        }
    };

    const style = {
        ...baseStyles,
        ...variants[variant],
    };

    return (
        <button
            style={style}
            className={`btn-${variant} ${className}`}
            {...props}
            onMouseEnter={(e) => {
                if (variant === 'primary') e.target.style.backgroundColor = 'var(--color-primary-hover)';
            }}
            onMouseLeave={(e) => {
                if (variant === 'primary') e.target.style.backgroundColor = 'var(--color-primary)';
            }}
        >
            {children}
        </button>
    );
};

export default Button;
