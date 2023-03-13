"use client"

import { Footer } from '@/components/Footer/Footer';
import { HeaderApp } from '@/components/Header/HeaderApp';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'light' ? 'light' : 'dark'))
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <html lang="en">
            <body>
              <Suspense>
                <HeaderApp/>
                {children}
                <Footer/>
              </Suspense>
            </body>
          </html>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  )
}
