import Link from 'next/link';

 

function Navbar () {

  return (

    <div class="flex items-center border-b-2 px-6 py-2 h-24 bg-white">

      

        <div class='grow'>

            <div class='flex items-center justify-center gap-2 md:gap-8'>

                <Link href="/invoices">Invoices</Link>

                <Link href="/invoicedetail">Invoices Detail</Link>

            </div>

        </div>

        

    </div>

  );

};

 

export default Navbar;