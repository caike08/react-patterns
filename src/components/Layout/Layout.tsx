import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { cn } from '../../utils/tw-merge'
import { BONUSES_PAGES, HOOKS_PAGES, PATTERN_PAGES } from '../../constants/pages.const'
import type { PageTypeList } from '../../types/pages.types'

import css from './Layout.module.scss'

// Page template layout with react-router-dom 
const Layout: FC = () => {
  const orderedPageList = (pageList: PageTypeList) => (
    <ol className='list-decimal list-inside m-4 space-y-4 text-lg'>
      {pageList.map(page => (
        <li key={page.path} className='text-sm cursor-pointer hover:underline underline-offset-2'>
          <Link to={page.path}>{page.title}</Link>
        </li>
      ))}
    </ol>
  )

  const currentYear = new Date().getFullYear()
  
  return (
    <div className={cn('overflow-hidden w-screen h-screen', css.layout)}>
      <header className={cn('flex justify-center p-4 border-b shadow', css.header)}>
        <h1 className='text-2xl font-bold text-center text-gray-700'>React Patterns</h1>
      </header>
      <aside className={cn('p-4 overflow-y-scroll bg-gray-100', css.aside)}>
        <nav>
          <h3 className='text-lg font-bold'>React Patterns</h3>
          {orderedPageList(PATTERN_PAGES)}
          <h3 className='text-lg font-bold'>Bonuses</h3>
          {orderedPageList(BONUSES_PAGES)}
          <h3 className='text-lg font-bold'>React Hooks</h3>
          {orderedPageList(HOOKS_PAGES)}
        </nav>
      </aside>
      <main className={cn('p-4 overflow-y-scroll', css.main)}>
        <div className='flex flex-col justify-center items-center'>
          <Outlet />
        </div>
      </main>
      <footer className={cn('p-4 flex justify-center items-center border-t shadow text-gray-500', css.footer)}>
        <small>© {currentYear} caike08</small>
      </footer>
    </div>
  )
}

export default Layout
