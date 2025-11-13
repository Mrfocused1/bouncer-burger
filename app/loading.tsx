import LoadingScreen from '@/components/ui/LoadingScreen'

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-brand-pink flex flex-col items-center justify-center">
      <LoadingScreen isLoading={true} />
    </div>
  )
}
