import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'xchgzi8g',
  dataset: 'website',
  apiVersion: '2024-01-01',
  useCdn: true,
})