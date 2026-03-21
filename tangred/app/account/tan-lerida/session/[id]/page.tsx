import { notFound } from 'next/navigation'
import { TanLeridaSessionClient } from '@/components/tan-lerida/TanLeridaSessionClient'

// Static params for build - actual data fetched client-side
export function generateStaticParams() {
  return [{ id: 'placeholder' }]
}

// This data would normally come from an API
const mockSession = {
  id: 'placeholder',
  sessionCode: 'TL-XXXXXXXX',
  status: 'INITIATED',
  isPaid: false,
  createdAt: new Date(),
}

export default async function TanLeridaSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // In a real app, this would fetch from an API
  // For static export, we use the mock data
  if (id !== 'placeholder') {
    notFound()
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <TanLeridaSessionClient initialSession={mockSession as any} />
    </div>
  )
}
