import './globals.css';
import Header from './components/Header';
import AuthProvider from './components/AuthProvider';

export const metadata = {
  title: 'DonorConnect',
  description: 'Donor management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
