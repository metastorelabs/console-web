import SettingsTab from './_components/SettingsTab'

const SettingsLayout = ({
  children,
  params: { orgId },
}: {
  children: React.ReactNode
  params: {
    orgId: string
  }
}) => {
  return (
    <main>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Settings</h1>
      <p className='mt-2 text-sm text-slate-400'>Manage your organization level settings.</p>
      <SettingsTab orgId={orgId} />
      {children}
    </main>
  )
}

export default SettingsLayout
