import SettingsTab from './_components/SettingsTab'

const SettingsLayout = ({
  children,
  params: { orgId, product },
}: {
  children: React.ReactNode
  params: {
    orgId: string
    product: string
  }
}) => {
  return (
    <main>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Settings</h1>
      <p className='mt-2 text-sm text-slate-400'>Manage your product level settings.</p>
      <SettingsTab orgId={orgId} product={product} />
      {children}
    </main>
  )
}

export default SettingsLayout
