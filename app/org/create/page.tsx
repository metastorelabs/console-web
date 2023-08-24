import React from 'react'

import CreateOrgModal from '../_components/CreateOrgModal'

const CreateOrg = () => {
  return (
    <div className='h-screen w-full'>
      <CreateOrgModal initiallyOpen={true} />
    </div>
  )
}

export default CreateOrg
