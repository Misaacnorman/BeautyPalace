'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Service } from '@/lib/types'

interface ServiceCardProps {
  service: Service
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="p-6 h-full flex flex-col">
      <h3 
        className="text-2xl font-bold mb-2"
        style={{ color: 'var(--heading-color)' }}
      >
        {service.name}
      </h3>
      <p 
        className="mb-4 flex-grow"
        style={{ color: 'var(--text-color)' }}
      >
        {service.description}
      </p>
      <div className="mt-4">
        <Link href={`/booking?service=${encodeURIComponent(service.name)}`}>
          <Button variant="primary" size="sm">
            Book this service
          </Button>
        </Link>
      </div>
    </Card>
  )
}

