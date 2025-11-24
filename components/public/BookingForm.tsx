'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { validateBooking } from '@/lib/utils/validation'
import { useBookings } from '@/hooks/useBookings'
import { Service } from '@/lib/types'

interface BookingFormProps {
  services: Service[]
}

export const BookingForm: React.FC<BookingFormProps> = ({ services }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addBooking } = useBookings()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: searchParams?.get('service') || '',
    date: '',
    time: '',
    location: '',
    notes: '',
  })

  useEffect(() => {
    const serviceParam = searchParams?.get('service')
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validationErrors = validateBooking(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    const result = await addBooking(formData)
    setLoading(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      setErrors({ submit: result.error || 'Failed to submit booking. Please try again.' })
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Thank You!</h2>
          <p className="text-neutral-700 mb-2">
            Your booking request has been submitted successfully.
          </p>
          <p className="text-neutral-600">
            We will contact you via WhatsApp or phone call to confirm your appointment.
          </p>
        </div>
      </div>
    )
  }

  const serviceOptions = [
    { value: '', label: 'Select a service' },
    ...services.map(s => ({ value: s.name, label: s.name }))
  ]

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
        />
        <Input
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          error={errors.phone}
        />
      </div>

      <Input
        label="Email (Optional)"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Select
        label="Service"
        name="service"
        value={formData.service}
        onChange={handleChange}
        options={serviceOptions}
        required
        error={errors.service}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Preferred Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          error={errors.date}
        />
        <Input
          label="Preferred Time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
          error={errors.time}
        />
      </div>

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="e.g., Your address or preferred location"
        required
        error={errors.location}
      />

      <Textarea
        label="Special Requests or Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={4}
        placeholder="Any special requests or additional information..."
      />

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{errors.submit}</p>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Booking Request'}
      </Button>
    </form>
  )
}

