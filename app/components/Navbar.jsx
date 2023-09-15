import Link from 'next/link';

function Navbar () {
  return (
    <div class="flex items-center border-b-2 px-6 py-2 h-24 bg-white">
        <h1 class='font-bold'>ELFEC</h1>
        <div class='grow'>
            <div class='flex items-center justify-center gap-2 md:gap-8'>
                <Link href="/meters">Meters</Link>
                <Link href="/history">History</Link>
            </div>
        </div>
        <div>
            <Link href="/login" class='mr-2 font-bold'>Iniciar Sesion</Link>
        </div>
    </div>
  );
};

export default Navbar;