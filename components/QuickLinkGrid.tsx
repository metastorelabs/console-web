import { BsDiscord } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'
import { HiOutlineCode, HiOutlineDocumentText, HiOutlineSupport } from 'react-icons/hi'
import { MdOutlineFeedback } from 'react-icons/md'

import clsx from 'clsx'
import Link from 'next/link'

const features = [
  {
    name: 'Documentation',
    description: 'Explore our guide, API reference, and code examples.',
    href: 'https://docs.metastore.to',
    icon: HiOutlineDocumentText,
    linkText: 'Read the docs',
    theme: 'bg-emerald-900/50 text-emerald-500',
  },
  {
    name: 'Examples',
    description: 'Learn how to integrate with MetaStore through example projects.',
    href: 'https://github.com/metastorelabs/wanderer-game',
    icon: HiOutlineCode,
    linkText: 'See examples',
    theme: 'bg-blue-900/50 text-blue-500',
  },
  {
    name: 'Blog',
    description: 'Read about the latest MetaStore announcements and updates.',
    href: 'https://medium.com/@metastore',
    icon: CgWebsite,
    linkText: 'Read the blog',
    theme: 'bg-cyan-900/50 text-cyan-500',
  },
  {
    name: 'Community',
    description: 'Join our amazing community of developers and creators.',
    href: 'https://discord.gg/M4nuhPxHaX',
    icon: BsDiscord,
    linkText: 'Join on Discord',
    theme: 'bg-violet-900/50 text-violet-500',
  },
  {
    name: 'Support',
    description: 'Get help with development and everything else.',
    href: 'https://support.metastore.to',
    icon: HiOutlineSupport,
    linkText: 'Contact support',
    theme: 'bg-amber-900/50 text-amber-500',
  },
  {
    name: 'Send feedback',
    description: 'Report a bug or suggest an improvement?',
    href: 'https://support.metastore.to',
    icon: MdOutlineFeedback,
    linkText: 'Send feedback',
    theme: 'bg-rose-900/50 text-rose-500',
  },
]

export default function QuickLinkGrid({ gridLayout }: { gridLayout: string }) {
  return (
    <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
      <dl className={clsx('grid max-w-xl gap-x-8 gap-y-16 lg:max-w-none', gridLayout)}>
        {features.map((feature) => (
          <div key={feature.name} className='flex flex-col'>
            <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-white'>
              <div className={clsx('flex h-10 w-10 items-center justify-center rounded-md', feature.theme)}>
                <feature.icon className='h-6 w-6' aria-hidden='true' />
              </div>
              {feature.name}
            </dt>

            <dd className='mt-3 flex flex-auto flex-col text-base text-slate-400'>
              <p className='flex-auto'>{feature.description}</p>
              <p className='mt-3'>
                <Link
                  href={feature.href}
                  className='text-sm font-semibold leading-6 text-indigo-400'
                  target='_blank'
                  prefetch={false}
                  rel='noopener'
                >
                  {feature.linkText} <span aria-hidden='true'>→</span>
                </Link>
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
