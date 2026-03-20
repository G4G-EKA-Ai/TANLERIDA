import { notFound } from 'next/navigation'
import { TanLeidaSessionClient } from '@/components/tan-leida/TanLeidaSessionClient'
import { getTanLeidaSession } from '@/lib/tan-leida-store'

export default async function TanLeidaSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = getTanLeidaSession(id)

  if (!session) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <TanLeidaSessionClient initialSession={session} />
    </div>
  )
}
