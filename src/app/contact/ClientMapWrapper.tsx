'use client';
import dynamic from 'next/dynamic';

// TypeScript interface for location data
interface LocationData {
  cx: number;
  cy: number;
  city: string;
  address: string[];
  phone: string;
  id: string;
  order: number;
  isActive: boolean;
}

interface ClientMapWrapperProps {
  locations?: LocationData[];
}

// Lazy load Map to avoid initial render weight
const Map = dynamic(() => import('./map'), { ssr: false });

export default function ClientMapWrapper({ locations }: ClientMapWrapperProps) {
  return <Map locations={locations} />;
}