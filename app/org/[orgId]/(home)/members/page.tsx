import Button from '@/components/button'

import AddMemberModal from './AddMemberModal'

const people = [
  {
    name: 'Lindsay Walton',
    product: 'All products',
    email: 'lindsay.walton@example.com',
    role: 'Owner',
  },
  {
    name: 'Lindsay Walton',
    product: 'Death Stranding',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    product: 'Death Stranding 2',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    product: 'All products',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
]

export default function Members({
  params,
}: {
  params: {
    orgId: string
  }
}) {
  return (
    <div>
      <div className='flex items-center'>
        <div className='flex-auto'>
          <h1 className='text-white text-3xl md:text-4xl font-bold'>Members</h1>
          <p className='mt-2 text-sm text-gray-300'>4 Members</p>
        </div>
        <div className='ml-16 mt-0 flex-none'>
          <AddMemberModal orgId={params.orgId}>
            <Button size='md'>Add Member</Button>
          </AddMemberModal>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-700'>
              <thead>
                <tr>
                  <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0'>
                    Name
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                    Email
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                    Products
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                    Role
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-800'>
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                      {person.name}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>{person.email}</td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>{person.product}</td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>{person.role}</td>
                    <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                      <button className='text-blue-500 hover:text-blue-400 focus-visible-ring -mx-1 px-1'>
                        Edit<span className='sr-only'>, {person.name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
