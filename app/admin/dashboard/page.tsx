'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/firebase/auth'
import { AuthGuard } from '@/components/admin/AuthGuard'
import { BookingsTab } from '@/components/admin/BookingsTab'
import { GalleryTab } from '@/components/admin/GalleryTab'
import { ReviewsTab } from '@/components/admin/ReviewsTab'
import { SettingsTab } from '@/components/admin/SettingsTab'
import { Button } from '@/components/ui/Button'

type Tab = 'bookings' | 'gallery' | 'reviews' | 'settings'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('bookings')

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'bookings', label: 'Bookings' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'bookings' && <BookingsTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'reviews' && <ReviewsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </AuthGuard>
  )
}

