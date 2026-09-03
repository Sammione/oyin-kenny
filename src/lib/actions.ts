import { supabase } from './supabase'

export async function registerGuest(name: string, phone: string, attending: boolean) {
  if (!name || !phone) {
    return { error: 'Name and phone number are required.' }
  }

  try {
    const { data: existingGuest, error: fetchError } = await supabase
      .from('Guest')
      .select('*')
      .eq('phone', phone)
      .maybeSingle()

    if (fetchError) {
      console.error('Error fetching guest:', fetchError)
      return { error: 'Failed to verify existing guest.' }
    }

    if (existingGuest) {
      const { data: updatedGuest, error: updateError } = await supabase
        .from('Guest')
        .update({ name, attending, updatedAt: new Date().toISOString() })
        .eq('phone', phone)
        .select()
        .single()

      if (updateError) throw updateError
      return { success: true, guest: updatedGuest }
    }

    const { data: guest, error: createError } = await supabase
      .from('Guest')
      .insert({
        name,
        phone,
        attending,
        qrToken: crypto.randomUUID(),
        checkedIn: false
      })
      .select()
      .single()

    if (createError) throw createError
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
    const { data: guest, error: fetchError } = await supabase
      .from('Guest')
      .select('*')
      .eq('qrToken', token)
      .maybeSingle()

    if (fetchError) throw fetchError

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

    const { data: updatedGuest, error: updateError } = await supabase
      .from('Guest')
      .update({
        checkedIn: true,
        checkInTime: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .eq('id', guest.id)
      .select()
      .single()

    if (updateError) throw updateError

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
  try {
    const { data: guests, error } = await supabase
      .from('Guest')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error

    const guestList = guests || []
    const totalRegistered = guestList.length
    const totalAttending = guestList.filter(g => g.attending).length
    const totalNotAttending = guestList.filter(g => !g.attending).length
    const totalCheckedIn = guestList.filter(g => g.checkedIn).length

    return {
      stats: {
        totalRegistered,
        totalAttending,
        totalNotAttending,
        totalCheckedIn,
      },
      guests: guestList,
    }
  } catch (error) {
    console.error('Failed to get dashboard stats:', error)
    return {
      stats: {
        totalRegistered: 0,
        totalAttending: 0,
        totalNotAttending: 0,
        totalCheckedIn: 0,
      },
      guests: [],
    }
  }
}
