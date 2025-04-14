'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Sparkles } from 'lucide-react';

export function ImageWithFallback({
  alt,
  src,
  ...props
}: ImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Sparkles className="w-5 h-5 text-gray-400" />
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      src={error ? '/placeholder-logo.svg' : src}
      {...props}
      onError={() => setError(true)}
    />
  );
} 