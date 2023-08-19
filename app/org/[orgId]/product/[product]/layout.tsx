import React from 'react'

import NavLayout from './_components/NavLayout'

const Layout = ({
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
    <div>
      <NavLayout orgId={orgId} product={product}>
        {children}
      </NavLayout>
    </div>
  )
}

export default Layout
