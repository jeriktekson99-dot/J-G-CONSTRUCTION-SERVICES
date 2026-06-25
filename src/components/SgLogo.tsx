import React from 'react';

interface SgLogoProps {
  className?: string;
}

export default function SgLogo({ className = "h-8 w-8" }: SgLogoProps) {
  return (
    <img 
      src="https://lh3.googleusercontent.com/d/1CgEX1g_myODFAlsRrRT9TKqwlDkWABwX"
      alt="J/G Construction Services Logo"
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}
