'use client'
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { Fragment} from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if(status == 'loading') {
    return null;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  }

  return (
    <Popover className="flex items-center border-b-2 px-6 py-2 h-20 bg-white">
      <h1 className='font-bold text-lg text-blue-700'>ELFEC</h1>
      <div className='grow'>
        <div className='hidden lg:inline-flex ml-20 items-center justify-center gap-2 md:gap-8'>
          {session?.user.role === "Cliente" ? (
            <></>
          ) : (
            <>
              <Link className='font-semibold text-gray-500 text-sm tracking-tighter hover:text-blue-600' href="/meters">Habilitados</Link>
              <Link className='font-semibold text-gray-500 text-sm tracking-tighter hover:text-blue-600' href="/disabled-meters">Deshabilitados</Link>
              <Link className='font-semibold text-gray-500 text-sm tracking-tighter hover:text-blue-600' href="/report">Reportes</Link>
            </>
          )}
        </div>
      </div>
      <div className='flex grow items-center justify-end sm:hidden'>
        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 
          hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className='sr-only'>Open menu</span>
          <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 14">
            <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
          </svg>
        </Popover.Button>
      </div>
      <Transition as={Fragment} enter='duration-200 ease-out' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='duartion-100 ease-in' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
        <Popover.Panel className="absolute inset-x-2 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className='rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50'>
            <div className='px-5 pt-5 pb-6'>
              <div className='flex items-center justify-between'>
                <h1 className='font-bold text-blue-700'>ELFEC</h1>
                <div className='-mr-2'>
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 
                    hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className='sr-only'>Close menu</span>
                    <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 14">
                      <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
                    </svg>
                  </Popover.Button>
                </div>
              </div>
              <div className='mt-6'>
                {status === 'authenticated' ? (
                  <>
                    <nav className='grid gap-y-8'>
                      <div className='inline-block'>
                        <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <div className="font-medium dark:text-black">
                          <div className="text-xs">{session.user?.fullName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">{session.user?.role}</span>
                          </div>
                        </div>
                      </div>
                      {session?.user.role === "Cliente" ? (
                      <></>
                      ) : (
                        <>
                      <div>
                        <Link className='text-gray-500 text-sm tracking-tighter hover:text-blue-600' href="/meters">Habilitados</Link>
                      </div>
                      <div>
                        <Link className='text-gray-500 text-sm tracking-tighter hover:text-blue-600' href="/disabled-meters">Deshabilitados</Link>
                      </div>
                      <div>
                        <Link className='text-gray-500 text-sm tracking-tighter hover:text-blue-600' href="/report">Reportes</Link>
                      </div>
                        </>
                      )}
                      <div className='inline-flex'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <button onClick={handleSignOut} className='px-2 text-sm font'>Cerrar sesion</button>
                      </div>
                    </nav>
                  </>
                ) : (<></>)}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
      {status === 'authenticated' ? (
        <>
          <div className='hidden sm:block'>
            <div className="flex items-center space-x-4">
              <div className="font-medium dark:text-black">
                <div className="text-sm">{session.user?.fullName}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">{session.user?.role}</span>
                </div>
              </div>
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 
                hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute mt-32 w-30 max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className='inline-flex bg-white p-4'>
                      <svg className="w-4 h-4 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                      </svg>
                      <button onClick={handleSignOut} className='px-2 text-sm'>Cerrar sesion</button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </div>
        </>):(<></>)}
    </Popover>
  );
};