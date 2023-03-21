import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
