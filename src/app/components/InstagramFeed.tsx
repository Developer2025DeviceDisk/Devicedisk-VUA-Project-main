"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com';
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
        <section className="w-full py-20 bg-[#EEF0FF] flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-light text-[#6210FF] mb-2 tracking-tight">
                    Latest Updates
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto w-full">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300"
                        style={{ minHeight: '500px' }}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#6210FF] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                    Vă
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm">{post.username}</h3>
                                    <p className="text-xs text-gray-500">273 followers</p>
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
                            <div className="relative w-full h-64 md:h-72 rounded-xl overflow-hidden mt-auto bg-gradient-to-br from-[#8A2BE2] to-[#4B0082]">
                                {post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' ? (
                                    <Image
                                        src={post.media_url}
                                        alt={post.caption}
                                        fill
                                        className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                                        unoptimized={true}
                                    />
                                ) : (
                                    <video src={post.media_url} className="w-full h-full object-cover" controls />
                                )}

                                {/* Overlay Gradient/Branding similar to reference */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

                                {/* Logo Overlay on Image */}
                                <div className="absolute top-4 left-4">
                                    <span className="text-white font-bold text-2xl drop-shadow-md">Vă</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Stats */}
                        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-center justify-between text-gray-500 text-xs mb-3">
                                <div className="flex items-center gap-1">
                                    <div className="flex -space-x-1">
                                        <div className="w-4 h-4 rounded-full bg-blue-500 border border-white"></div>
                                        <div className="w-4 h-4 rounded-full bg-green-500 border border-white"></div>
                                    </div>
                                    <span>You and {post.like_count} others</span>
                                </div>
                                <span>{post.comments_count} comment</span>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                <button className="flex items-center gap-1 text-gray-600 hover:text-[#6210FF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    <span className="text-xs font-semibold">Like</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-600 hover:text-[#6210FF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span className="text-xs font-semibold">Comment</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-600 hover:text-[#6210FF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    <span className="text-xs font-semibold">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
