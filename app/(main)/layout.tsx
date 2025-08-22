import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-16">
            {children}
        </main>
    </div>
  );
}
