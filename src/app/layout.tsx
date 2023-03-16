"use client"

import { Analytics } from '@vercel/analytics/react';
import { Footer } from '@/components/Footer/Footer';
import { HeaderApp } from '@/components/Header/HeaderApp';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <html lang="en">
            <body>
                <HeaderApp/>
                {children}
                <Analytics />
                <Footer/>
            </body>
          </html>
        </MantineProvider>
    </QueryClientProvider>
  )
}
