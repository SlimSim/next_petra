import '@/app/ui/global.css';
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=3"
      ></meta>
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
