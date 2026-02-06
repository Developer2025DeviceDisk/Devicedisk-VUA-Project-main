"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com').replace(/\/$/, '');

interface ClientItem {
    name: string;
    logo: string;
    order: number;
}

interface ClientContent {
    title: string;
    description: string;
    clients: ClientItem[];
}

const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";
    if (imagePath.startsWith(API_URL)) {
        return `/api/proxy?url=${encodeURIComponent(imagePath)}`;
    }
    if (imagePath.startsWith("https://")) return imagePath;
    if (imagePath.startsWith("/uploads/")) {
        const fullUrl = `${API_URL}${imagePath}`;
        return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
    }
    return imagePath;
};

export default function OurClient() {
    const [clientContent, setClientContent] = useState<ClientContent>({
        title: "Our Client",
        description: "At VVWorx, we've had the opportunity to collaborate with brands across real estate, technology, and consumer verticals. Here are some of the amazing clients who trust our work.",
        clients: []
    });

    useEffect(() => {
        const fetchClientContent = async () => {
            try {
                const response = await fetch(`${API_URL}/api/client-content/active`);
                const result = await response.json();
                if (result.success && result.data) {
                    setClientContent(result.data);
                }
            } catch (error) {
                console.error('Error fetching Client content:', error);
            }
        };
        fetchClientContent();
    }, []);

    return (
        <section className="w-full py-20 md:py-12 bg-[#EEF0FF] overflow-hidden">
            {/* Title & Description */}
            <div className="text-center mb-16 px-4">
                <h2 className="text-[48px] md:text-[60px] font-light text-[#6210FF] mb-6 tracking-tight"
                    style={{ fontFamily: "PetrovSans", fontWeight: 400 }}>
                    {clientContent.title}
                </h2>
                <p className="text-gray-700 max-w-4xl mx-auto text-[18px] md:text-[22px] leading-relaxed font-light"
                    style={{ fontFamily: "PetrovSans", fontWeight: 400 }}>
                    {clientContent.description}
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative">
                {/* Gradient Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none" />

                {/* Marquee Track */}
                <div className="flex w-max animate-marquee hover:pause-marquee">
                    {/* First Set of Logos */}
                    <div className="flex gap-8 md:gap-12 pr-8 md:pr-12 flex-shrink-0">
                        {(clientContent.clients.length > 0 ? clientContent.clients : [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ name: `Client Logo ${i}`, logo: "", order: i }))).sort((a: any, b: any) => a.order - b.order).map((client: any, index: number) => (
                            <div
                                key={`client-${index}`}
                                className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center min-w-[280px] md:min-w-[350px] h-[140px] md:h-[180px] overflow-hidden"
                            >
                                {client.logo ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={getImageUrl(client.logo)}
                                            alt={client.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-gray-400 text-2xl md:text-3xl font-semibold p-8 md:p-12">
                                        {client.name}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Duplicate Set for Seamless Loop */}
                    <div className="flex gap-8 md:gap-12 pr-8 md:pr-12 flex-shrink-0">
                        {(clientContent.clients.length > 0 ? clientContent.clients : [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ name: `Client Logo ${i}`, logo: "", order: i }))).sort((a: any, b: any) => a.order - b.order).map((client: any, index: number) => (
                            <div
                                key={`client-duplicate-${index}`}
                                className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center min-w-[280px] md:min-w-[350px] h-[140px] md:h-[180px] overflow-hidden"
                            >
                                {client.logo ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={getImageUrl(client.logo)}
                                            alt={client.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-gray-400 text-2xl md:text-3xl font-semibold p-8 md:p-12">
                                        {client.name}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
