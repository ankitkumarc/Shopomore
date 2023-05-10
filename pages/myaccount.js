import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const myaccount = () => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
    }, [router.query])
    return (
        <div>
            myaccount
        </div>
    )
}

export default myaccount
