import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Niam AI – AI bot fine-tuned with Niyam bro",
  description:
    "Spend some time with me",
    openGraph: {
      title: "Niyam AI – AI bot fine-tuned with Niyam bro",
      description: "Spend some time with me",
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'image',
        },
      ],
      site_name: 'Niyam AI',
}
}



export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
