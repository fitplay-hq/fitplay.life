import {Navbar} from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <main className="pt-16 flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
