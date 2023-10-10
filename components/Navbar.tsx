import Link from 'next/link'
import { getUserSession } from '@/lib/auth'
import { Avatar } from './Avatar'

const links = [
    { href: '/track', label: 'Track' }
]

const Navbar = async ({ }) => {
    const user = await getUserSession()
    return (
        <div className="top-0 inset-x-0 h-fit bg-gray-100 border-b border-slate-gray z-[10] py-2">
            <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                <Link href='/' className='py-2 px-4 hover:bg-gray-100 rounded flex gap-2 intems-center'>
                    <p className='font-semibold'>TrackMe</p>
                </Link>
                <nav>
                    <ul className='flex flex-row gap-2'>
                        {links.map(({ href, label }) => {
                            return (
                                <li key={href}>
                                    <Link className='py-1 px-2 hover:bg-slate-200 rounded text-slate-500 hover:text-green-600' href={href}>{label}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <Avatar user={user} />
            </div>
        </div>
    )
}

export default Navbar