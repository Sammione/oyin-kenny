import { supabase } from './supabase'

export async function registerGuest(name: string, phone: string, attending: boolean) {
  if (!name || !phone) {
    return { error: 'Name and phone number are required.' }
  }

  try {
    // Check if guest exists
    const { data: existingGuest, error: fetchError } = await supabase
      .from('Guest')
      .select('*')
      .eq('phone', phone)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
      console.error('Error fetching guest:', fetchError)
      return { error: 'Failed to verify existing guest.' }
    }

    if (existingGuest) {
      // Update existing guest
      const { data: updatedGuest, error: updateError } = await supabase
        .from('Guest')
        .update({ name, attending, updatedAt: new Date().toISOString() })
        .eq('phone', phone)
        .select()
        .single()

      if (updateError) throw updateError
      return { success: true, guest: updatedGuest }
    }

    // Create new guest
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
