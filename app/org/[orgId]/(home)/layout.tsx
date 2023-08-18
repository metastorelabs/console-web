import React from 'react'

import NavLayout from './_components/NavLayout'

const Layout = ({ children, params: { orgId } }: { children: React.ReactNode; params: { orgId: string } }) => {
  return (
    <div>
      <NavLayout orgId={orgId}>{children}</NavLayout>
    </div>
  )
}

export default Layout
