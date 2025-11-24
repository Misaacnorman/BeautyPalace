'use client'

import { useState } from 'react'
import { useBookings } from '@/hooks/useBookings'
import { Booking, BookingStatus } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export const BookingsTab = () => {
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const { bookings, loading, updateBookingStatus } = useBookings(statusFilter || undefined)

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    await updateBookingStatus(bookingId, { status: newStatus })
  }

  const handleSaveNotes = async () => {
    if (!editingBooking?.id) return
    await updateBookingStatus(editingBooking.id, { adminNotes })
    setEditingBooking(null)
    setAdminNotes('')
  }

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  if (loading) {
    return <div className="text-center py-12">Loading bookings...</div>
  }

  return (
    <div>
      <div className="mb-6">
        <Select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={statusOptions}
        />
      </div>

      {bookings.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-neutral-500">No bookings found.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">{booking.name}</h3>
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Service:</span> {booking.service}
                  </p>
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Time:</span> {booking.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Phone:</span> {booking.phone}
                  </p>
                  {booking.email && (
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Email:</span> {booking.email}
                    </p>
                  )}
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Location:</span> {booking.location}
                  </p>
                  {booking.notes && (
                    <p className="text-sm text-neutral-600 mt-2">
                      <span className="font-medium">Notes:</span> {booking.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-neutral-700">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id!, e.target.value as BookingStatus)}
                    className="px-3 py-1 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingBooking(booking)
                      setAdminNotes(booking.adminNotes || '')
                    }}
                  >
                    {booking.adminNotes ? 'Edit Notes' : 'Add Notes'}
                  </Button>
                </div>
              </div>

              {booking.adminNotes && editingBooking?.id !== booking.id && (
                <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
                  <p className="text-sm font-medium text-neutral-700 mb-1">Admin Notes:</p>
                  <p className="text-sm text-neutral-600">{booking.adminNotes}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Notes Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Admin Notes</h3>
            <Textarea
              label="Internal Notes (only visible to admin)"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={5}
              placeholder="Add internal notes about this booking..."
            />
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleSaveNotes}
                className="flex-1"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingBooking(null)
                  setAdminNotes('')
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

