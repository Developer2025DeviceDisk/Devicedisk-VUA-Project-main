'use client';
import dynamic from 'next/dynamic';

// Lazy load Map to avoid initial render weight
const Map = dynamic(() => import('./map'), { ssr: false });

export default function ClientMapWrapper() {
  return <Map />;
}