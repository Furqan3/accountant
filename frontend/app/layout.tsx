import "./globals.css"
import { SessionProvider } from "./session-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
