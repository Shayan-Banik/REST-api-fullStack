import ContactsList from '@/components/ContactsList'
import ContactStats from '@/components/ContactStats'
import Link from 'next/link'
import React from 'react'
const Contacts = () => {
  return (
    <main className='min-h-screen px-4 pt-8 bg-black text-white'>
      <div className='container max-w-4xl mx-auto'>
        <div className='mb-8'>
          <Link href={'/'} className='text-blue-600 hover:underline'>
          <button className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'>
            &larr; Back to Contact Form
          </button>
          </Link>
        </div>
        <ContactStats />
        <ContactsList />
      </div>
    </main>
  )
}

export default Contacts;