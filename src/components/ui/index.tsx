'use client';

import React from 'react';
import clsx from 'clsx';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Reusable input field component with error handling
 */
export function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
        disabled={disabled}
        className={clsx(
          'px-4 py-2 border rounded-lg transition-colors outline-none',
          'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 bg-red-50'
            : 'border-neutral-300 bg-white hover:border-neutral-400'
        )}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Reusable select field component
 */
export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={clsx(
          'px-4 py-2 border rounded-lg transition-colors outline-none',
          'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 bg-red-50'
            : 'border-neutral-300 bg-white hover:border-neutral-400'
        )}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
  disabled?: boolean;
}

/**
 * Reusable textarea field component
 */
export function TextAreaField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  disabled = false,
}: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        disabled={disabled}
        className={clsx(
          'px-4 py-2 border rounded-lg transition-colors outline-none resize-none',
          'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 bg-red-50'
            : 'border-neutral-300 bg-white hover:border-neutral-400'
        )}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

/**
 * Reusable button component
 */
export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  className,
}: ButtonProps) {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-neutral-300 focus:ring-blue-500',
    secondary:
      'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 disabled:bg-neutral-300 focus:ring-neutral-500',
    outline:
      'border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 focus:ring-neutral-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        disabled && 'cursor-not-allowed',
        className
      )}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

interface AlertProps {
  variant: 'error' | 'success' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

/**
 * Alert component for displaying messages
 */
export function Alert({ variant, message, onClose }: AlertProps) {
  const variantStyles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  return (
    <div
      className={clsx(
        'border rounded-lg p-4 flex items-center justify-between',
        variantStyles[variant]
      )}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-current opacity-70 hover:opacity-100"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/**
 * Loading skeleton component
 */
export function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-neutral-200 rounded w-1/3" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-1/4" />
            <div className="h-10 bg-neutral-200 rounded" />
          </div>
        ))}
      </div>
      <div className="h-12 bg-neutral-200 rounded w-full" />
    </div>
  );
}
