export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  // Basic phone validation - allows digits, spaces, dashes, parentheses, plus
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export interface ValidationErrors {
  [key: string]: string
}

export const validateBooking = (data: {
  name: string
  phone: string
  email?: string
  service: string
  date: string
  time: string
  location: string
}): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!validateRequired(data.name)) {
    errors.name = 'Name is required'
  }

  if (!validateRequired(data.phone)) {
    errors.phone = 'Phone number is required'
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!validateRequired(data.service)) {
    errors.service = 'Please select a service'
  }

  if (!validateRequired(data.date)) {
    errors.date = 'Please select a date'
  }

  if (!validateRequired(data.time)) {
    errors.time = 'Please select a time'
  }

  if (!validateRequired(data.location)) {
    errors.location = 'Location is required'
  }

  return errors
}

export const validateReview = (data: {
  name: string
  rating: number
  comment: string
}): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!validateRequired(data.name)) {
    errors.name = 'Name is required'
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Please select a rating'
  }

  if (!validateRequired(data.comment)) {
    errors.comment = 'Please write a comment'
  }

  return errors
}

