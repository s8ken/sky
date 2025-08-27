import './globals.css';

export const metadata = {
  title: 'Sky',
  description: 'Sky project – AI autonomy testbed',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
