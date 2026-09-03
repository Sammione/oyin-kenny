'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function registerGuest(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const attending = formData.get('attending') === 'true'

  if (!name || !phone) {
    return { error: 'Name and phone number are required.' }
  }

  try {
    const existingGuest = await prisma.guest.findUnique({
      where: { phone },
    })

    if (existingGuest) {
      // Update existing guest
      const updatedGuest = await prisma.guest.update({
        where: { phone },
        data: { name, attending },
      })
      return { success: true, guest: updatedGuest }
    }

    const guest = await prisma.guest.create({
      data: {
        name,
        phone,
        attending,
      },
    })

    return { success: true, guest }
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Failed to register. Please try again.' }
  }
}

export async function verifyQrToken(token: string) {
  if (!token) {
    return { error: 'No token provided' }
  }

  try {
    const guest = await prisma.guest.findUnique({
      where: { qrToken: token },
    })

    if (!guest) {
      return { status: 'INVALID', message: 'Please verify this invitation with the event team.' }
    }

    if (!guest.attending) {
      return { status: 'INVALID', message: 'This guest registered as not attending.' }
    }

    if (guest.checkedIn) {
      return {
        status: 'ALREADY_CHECKED_IN',
        guest: guest.name,
        checkInTime: guest.checkInTime,
        message: 'This pass has already been used.',
      }
    }

    // Mark as checked in
    const updatedGuest = await prisma.guest.update({
      where: { id: guest.id },
      data: {
        checkedIn: true,
        checkInTime: new Date(),
      },
    })

    revalidatePath('/admin/dashboard')

    return {
      status: 'VALID',
      guest: updatedGuest.name,
      message: 'Entry Approved',
    }
  } catch (error) {
    console.error('QR verification error:', error)
    return { error: 'Failed to verify token' }
  }
}

export async function getDashboardStats() {
  const totalRegistered = await prisma.guest.count()
  const totalAttending = await prisma.guest.count({ where: { attending: true } })
  const totalNotAttending = await prisma.guest.count({ where: { attending: false } })
  const totalCheckedIn = await prisma.guest.count({ where: { checkedIn: true } })
  
  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return {
    stats: {
      totalRegistered,
      totalAttending,
      totalNotAttending,
      totalCheckedIn,
    },
    guests,
  }
}
