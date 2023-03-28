"use client";

import { Analytics } from "@vercel/analytics/react";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Suspense } from "react";
import HeaderApp from "@/components/Header/HeaderApp";
import Footer from "@/components/Footer/Footer";

import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const queryClient = new QueryClient();
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <html lang="en">
            <Head>
              <title>terraomega</title>
            </Head>
            <body>
              <HeaderApp />
              {children}
              <Analytics />
              <Footer />
            </body>
          </html>
        </MantineProvider>
      </QueryClientProvider>
    </ColorSchemeProvider>
  );
}
