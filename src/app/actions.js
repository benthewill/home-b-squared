'use server'

import { redirect } from 'next/navigation'

export async function navigateToPitches(data) {

    redirect(`/stories`)
}