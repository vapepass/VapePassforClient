import './globals.css';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'VapePass — AI Flavor Sommelier for Vape Stores',
  description: 'AI-powered flavor recommendations and compliance for modern vape retail.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
