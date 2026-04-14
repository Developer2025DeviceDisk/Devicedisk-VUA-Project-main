"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
    id: string;
    caption: string;
    media_url: string;
    media_type: string;
    timestamp: string;
    username: string;
    permalink: string;
    like_count?: number;
    comments_count?: number;
}

const MOCK_POSTS: InstagramPost[] = [
    {
        id: '1',
        caption: 'In today\'s fast-evolving marketing landscape, data driven AI combined with strategic human creativity is the winning formula. At VVWorx, we harness this synergy to design campaigns that lead industries, not follow.',
        media_url: '/vua.jpeg',
        media_type: 'IMAGE',
        timestamp: '2025-11-15T10:00:00Z',
        username: 'Voix & Vision Worx',
        permalink: 'https://instagram.com',
        like_count: 12,
        comments_count: 0
    },
    {
        id: '2',
        caption: 'Because why use boring charts when samosas are crispy hot, and the ultimate funnel hack? Marketing Funnel - 5 pages',
        media_url: '/strategy.jpeg',
        media_type: 'IMAGE',
        timestamp: '2025-11-10T14:30:00Z',
        username: 'Voix & Vision Worx',
        permalink: 'https://instagram.com',
        like_count: 11,
        comments_count: 2
    },
    {
        id: '3',
        caption: 'Not just building solutions we\'re designing revolutions. This is our mark of innovation. #NextGenThinking #InnovateWithUs #MarkOfInnovation',
        media_url: '/digital.jpeg',
        media_type: 'IMAGE',
        timestamp: '2025-11-05T09:15:00Z',
        username: 'Voix & Vision Worx',
        permalink: 'https://instagram.com',
        like_count: 15,
        comments_count: 1
    }
];

export default function InstagramFeed() {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Determine API URL: Use env var if set, otherwise default to production backend.
                // NOTE: This will connect to the LIVE backend. Ensure backend changes are deployed.
                // const baseUrl = process.env.NEXT_PUBLIC_API_URL 
                const baseUrl = 'https://admin.vvworx.com';
                const API_URL = baseUrl.replace(/\/$/, '');

                const response = await fetch(`${API_URL}/api/instagram/posts`);
                const result = await response.json();

                if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                    setPosts(result.data);
                } else {
                    // Fallback if success=true but data is empty/invalid
                    console.warn("API returned empty data, using mock data");
                    setPosts(MOCK_POSTS);
                }
            } catch (error) {
                console.error("Failed to fetch instagram posts, using fallback data", error);
                setPosts(MOCK_POSTS);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return null;

    return (
        <section className="w-full py-10 bg-[#EEF0FF] flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-[48px] lg:text-[60px] font-light text-[#6210FF] mb-2 tracking-tight"
                    style={{ fontFamily: "PetrovSans", fontWeight: 400 }}>
                    Latest Updates
                </h2>
            </div>

            {/* Grid */}
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 px-4 max-w-7xl mx-auto w-full pb-8 lg:pb-0 snap-x">
                {posts.map((post) => (
                    <Link
                        href={post.permalink}
                        target="_blank"
                        key={post.id}
                        className="min-w-[280px] w-[280px] lg:w-auto lg:min-w-0 h-[500px] lg:h-auto lg:min-h-[400px] flex-shrink-0 snap-center bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 block"
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 relative rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src="/instagram-brand-logo.jpg"
                                        alt="Logo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm">{post.username}</h3>
                                    <p className="text-xs text-blue-700">Follow us <span className='font-bold'>+</span> </p>
                                </div>
                            </div>
                            <div className="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-grow flex flex-col">
                            <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                                {post.caption}
                            </p>

                            {/* Media - Styled like the reference card */}
                            <div className="relative w-full h-64 lg:h-72 rounded-xl overflow-hidden mt-auto bg-gradient-to-br from-[#8A2BE2] to-[#4B0082]">
                                {post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' ? (
                                    <Image
                                        src={post.media_url}
                                        alt={post.caption}
                                        fill
                                        className="object-cover"
                                        unoptimized={true}
                                    />
                                ) : (
                                    <video src={post.media_url} className="w-full h-full object-cover" controls />
                                )}

                                {/* Overlay Gradient/Branding similar to reference */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

                                {/* Logo Overlay on Image */}
                                {/* <div className="absolute top-4 left-4 w-10 h-10 relative rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src="/instagram-brand-logo.jpg"
                                        alt="Logo"
                                        fill
                                        className="object-cover"
                                    />
                                </div> */}
                            </div>
                        </div>

                        {/* Footer removed specific interactions per request */}
                    </Link>
                ))}
            </div>
        </section>
    );
}
