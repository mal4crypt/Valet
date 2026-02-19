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
  helperText?: string;
}

/**
 * Reusable input field component with premium SaaS styling
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
  helperText,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 animate-in">
      <label htmlFor={id} className="text-sm font-medium text-slate-700 ml-0.5">
        {label}
        {required && <span className="text-blue-500 ml-1 italic font-normal">(Required)</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
        disabled={disabled}
        className={clsx(
          'px-4 py-2.5 bg-white border rounded-xl transition-all duration-200 outline-none',
          'placeholder:text-slate-400 text-slate-900 text-base',
          'focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:shadow-sm',
          'disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400',
          error
            ? 'border-red-500 bg-red-50 focus:ring-red-500/10'
            : 'border-slate-200 shadow-sm hover:border-slate-300'
        )}
      />
      {error ? (
        <p className="text-xs text-red-600 mt-0.5 ml-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 mt-0.5 ml-1">{helperText}</p>
      ) : null}
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
  helperText?: string;
}

/**
 * Reusable select field component with premium SaaS styling
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
  helperText,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 animate-in">
      <label htmlFor={id} className="text-sm font-medium text-slate-700 ml-0.5">
        {label}
        {required && <span className="text-blue-500 ml-1 italic font-normal">(Required)</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={clsx(
            'w-full px-4 py-2.5 bg-white border rounded-xl transition-all duration-200 outline-none appearance-none',
            'text-slate-900 text-base',
            'focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:shadow-sm',
            'disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400',
            error
              ? 'border-red-500 bg-red-50 focus:ring-red-500/10'
              : 'border-slate-200 shadow-sm hover:border-slate-300'
          )}
        >
          <option value="" disabled>Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error ? (
        <p className="text-xs text-red-600 mt-0.5 ml-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 mt-0.5 ml-1">{helperText}</p>
      ) : null}
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
  helperText?: string;
}

/**
 * Reusable textarea field component with premium SaaS styling
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
  helperText,
}: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 animate-in">
      <label htmlFor={id} className="text-sm font-medium text-slate-700 ml-0.5">
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
          'px-4 py-2.5 bg-white border rounded-xl transition-all duration-200 outline-none resize-none',
          'placeholder:text-slate-400 text-slate-900 text-base',
          'focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:shadow-sm',
          'disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400',
          error
            ? 'border-red-500 bg-red-50 focus:ring-red-500/10'
            : 'border-slate-200 shadow-sm hover:border-slate-300'
        )}
      />
      {error ? (
        <p className="text-xs text-red-600 mt-0.5 ml-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 mt-0.5 ml-1">{helperText}</p>
      ) : null}
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Reusable button component with premium SaaS styling
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
  icon,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 outline-none focus:ring-4 disabled:cursor-not-allowed active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-8 py-3.5 text-lg gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 disabled:bg-slate-200 disabled:text-slate-400 focus:ring-blue-500/20',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 disabled:bg-slate-200 disabled:text-slate-400 focus:ring-slate-900/20',
    outline:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 focus:ring-slate-500/10',
    ghost:
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 focus:ring-slate-500/10',
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
        className
      )}
    >
      {isLoading ? (
        <>
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {icon && <span className="opacity-80">{icon}</span>}
          {children}
        </>
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
 * Alert component for displaying messages with premium SaaS styling
 */
export function Alert({ variant, message, onClose }: AlertProps) {
  const variantStyles = {
    error: 'bg-red-50 border-red-100 text-red-800',
    success: 'bg-emerald-50 border-emerald-100 text-emerald-800',
    info: 'bg-blue-50 border-blue-100 text-blue-800',
    warning: 'bg-amber-50 border-amber-100 text-amber-800',
  };

  return (
    <div
      className={clsx(
        'border rounded-xl p-4 flex items-start justify-between shadow-sm animate-in',
        variantStyles[variant]
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <div className="mt-0.5">
          {variant === 'error' && (
            <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {variant === 'success' && (
            <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {/* Add more icons as needed */}
        </div>
        <span className="text-sm font-medium leading-relaxed">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-lg hover:bg-black/5 transition-colors text-current opacity-60 hover:opacity-100"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/**
 * Loading skeleton component with premium shimmer animation
 */
export function SkeletonLoader() {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-3">
        <div className="h-10 bg-slate-100 rounded-xl w-1/3 shimmer" />
        <div className="h-4 bg-slate-100 rounded-full w-2/3 shimmer text-opacity-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4 p-6 border border-slate-100 rounded-xl bg-white shadow-sm">
            <div className="h-3 bg-slate-100 rounded-full w-1/4 shimmer" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 rounded-full w-full shimmer" />
              <div className="h-4 bg-slate-100 rounded-full w-5/6 shimmer" />
            </div>
          </div>
        ))}
      </div>

      <div className="h-14 bg-slate-100 rounded-xl w-full shimmer" />
    </div>
  );
}

