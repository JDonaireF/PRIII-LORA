import './globals.css'
import { Montserrat } from 'next/font/google'
import Providers from './components/providers/providers'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'LORA',
  description: 'Generated by create next app',
  manifest: '/manifest.json',
  icons: { apple: '/icon.png' },
  themeColor: '#fff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
          <div className='container mx-auto'>
            <Providers>
              {children}
            </Providers>
          </div>
      </body>
    </html>
  )
}
