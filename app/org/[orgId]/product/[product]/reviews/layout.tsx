import Filter from './_components/Filter'

export default function LibraryFilter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Reviews</h1>
      <p className='mt-2 text-sm text-slate-400'>View and manage reviews for your product.</p>

      <Filter />
      {children}
    </>
  )
}
