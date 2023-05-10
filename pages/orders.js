import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const orders = () => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
    }, [router.query])
    return (
        <div>
            orders
        </div>
    )
}

export default orders