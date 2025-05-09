import React from 'react'
import { SignIn } from '@clerk/nextjs'
import { dark } from "@clerk/themes";

export default function Page() {
    return (
        <main className='flex items-center justify-center h-svh bg-gray-900'>
            <SignIn appearance={{ baseTheme: dark }} />
        </main>
    )
}