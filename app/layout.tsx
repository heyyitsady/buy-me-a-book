import './globals.css'

export const metadata = {
  title: 'Buy me a book',
  description: 'Buy me a coffee clone by Sazed',
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
