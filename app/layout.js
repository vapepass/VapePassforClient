import './globals.css';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'VapePass — Digital Loyalty Cards for Vape Stores',
  description: 'Replace paper punch cards with branded Apple Wallet & Google Wallet loyalty passes.',
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
