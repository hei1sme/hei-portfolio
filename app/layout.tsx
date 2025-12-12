'use client'; // Layout now needs to be client for ParallaxProvider

// Remove Metadata type import if no longer needed here
// import type { Metadata } from 'next'; 
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { LabProvider } from './context/LabContext';
import { ParallaxProvider } from 'react-scroll-parallax'; // Import ParallaxProvider
// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomCursor from './components/CustomCursor'; // Import CustomCursor
import VerticalNavigation from './components/VerticalNavigation'; // Keep VerticalNavigation
import ScrollProgress from './components/ScrollProgress'; // Import ScrollProgress
import FloatingCTA from './components/FloatingCTA';

const inter = Inter({ subsets: ['latin'] });

// Remove metadata export from here
// export const metadata: Metadata = { ... };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black"> {/* Ensure html has base background */}
      <body className={`${inter.className} cursor-none bg-black relative`}> {/* Apply cursor-none to body */}
        <ThemeProvider>
          <LabProvider>
            <ParallaxProvider> {/* Wrap with ParallaxProvider */}
              <ScrollProgress /> {/* Add scroll progress bar */}
              <CustomCursor /> {/* Add CustomCursor here */}
              <FloatingCTA /> {/* Floating contact button */}
              <VerticalNavigation />
              {/* Render children directly, add padding to avoid nav */}
              <main className="pl-0 md:pl-20 w-full min-h-screen">
                {children}
              </main>
            </ParallaxProvider>
          </LabProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 
