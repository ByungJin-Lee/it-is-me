import '@app/styles/reset.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Byungjin Lee',
  description: "Hello This is Byungjin Lee's website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
