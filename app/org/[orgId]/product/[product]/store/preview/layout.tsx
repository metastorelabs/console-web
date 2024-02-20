import PreviewTabs from './_components/PreviewTabs'

const Layout = ({
  storePage,
  quickLaunchButton,
  productCard,
  params,
}: {
  storePage: React.ReactNode
  quickLaunchButton: React.ReactNode
  productCard: React.ReactNode
  params: {
    product: string
    orgId: string
  }
}) => {
  const tabs = [
    { name: 'Store Page', slug: null, content: storePage },
    { name: 'Product Card', slug: 'product-card', content: productCard },
    { name: 'Quick Launch Button', slug: 'quick-launch-button', content: quickLaunchButton },
  ]

  return (
    <div className='h-screen w-full bg-black text-white absolute top-0 left-0 pt-10 px-4 sm:px-6 lg:px-20 overflow-y-scroll'>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Preview</h1>
      <PreviewTabs tabs={tabs} params={params} />
    </div>
  )
}

export default Layout
