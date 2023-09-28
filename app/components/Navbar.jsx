import Link from 'next/link';

function Navbar () {
  return (
    <div class="flex items-center border-b-2 px-6 py-2 h-20 bg-white">
        <h1 class='font-bold'>ELFEC</h1>
        <div class='grow'>
            <div class='flex items-center justify-center gap-2 md:gap-8'>
                <Link href="/meters">Meters</Link>
                <Link href="/history">History</Link>
                <Link href="/facture">Facture</Link>
            </div>
        </div>
        <div className='mt-4'>
            <Link href="/login" class='mr-2 font-bold'>
              <div class="flex items-center space-x-4">
                <div class="font-medium dark:text-black">
                  <div class="text-sm">Esteban Quito</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Supervisor</span>
                  </div>
                </div>
                <img class="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTQSyTadvHAoZBFjGY0sJONeneJd3AnF1fQ&usqp=CAU" alt="Rounded avatar"/>
              </div>
            </Link>
        </div>
    </div>
  );
};

export default Navbar;