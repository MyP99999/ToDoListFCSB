'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

 
export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, [router]);

    return null; // Return null since we don't want to render anything
}