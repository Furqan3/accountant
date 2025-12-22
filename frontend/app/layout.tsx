import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

export const metadata = {
      generator: 'Accountent',
      applicationName: 'Accountent',
      referrer: 'origin-when-cross-origin',
      keywords: ['Accounting', 'Bookkeeping', 'Tax Filing', 'Incorporation', 'Business Services'],
      authors: [{ name: 'Accountent', url: 'https://accountent.io' }],
      creator: 'Accountent',
      publisher: 'Accountent',
    };
