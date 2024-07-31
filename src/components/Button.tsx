"use client";
import React, { ReactNode } from 'react';

interface ButtonProps {
  readonly children: ReactNode;
  readonly onClick?: () => void;
  readonly disabled?: any;
}

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
      <button
        onClick={onClick}
        disabled={disabled}
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-emerald-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
      >
        {children}
      </button>
  )
}