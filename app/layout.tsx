import './globals.css'
import { PT_Sans_Narrow } from 'next/font/google'

const bodyFont = PT_Sans_Narrow({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: 'Species360 Image Compare',
  description: 'Compares image similarity based on their data tags',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.className} text-white bg-black`}>
        {children}
      </body>
    </html>
  )
}
