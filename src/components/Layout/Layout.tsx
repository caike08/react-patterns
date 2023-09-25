import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { BONUSES_PAGES, HOOKS_PAGES, PATTERN_PAGES } from '../../constants/pages.const'
import type { PageTypeList } from '../../types/pages.types'

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
    <>
      <header className='flex justify-center p-4'>
        <h1 className='text-2xl font-bold text-center'>React Patterns</h1>
      </header>
      <nav className='p-4 w-1/4'>
        <h3 className='text-lg font-bold'>React Patterns</h3>
        {orderedPageList(PATTERN_PAGES)}
        <h3 className='text-lg font-bold'>Bonuses</h3>
        {orderedPageList(BONUSES_PAGES)}
        <h3 className='text-lg font-bold'>React Hooks</h3>
        {orderedPageList(HOOKS_PAGES)}
      </nav>
      <section className='p-4 flex flex-col justify-center items-center w-full'>
        <Outlet />
      </section>
      <footer className='p-4 flex justify-center items-center w-full'>
        <small>© {currentYear} caike08</small>
      </footer>
    </>
  )
}

export default Layout
