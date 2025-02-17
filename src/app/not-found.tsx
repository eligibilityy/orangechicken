import FZF from "@/components/home/404";
import Footer from "@/components/home/Footer";
import Nav from "@/components/Nav";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Nav />
      <FZF />
      <Footer />
    </main>
  );
}
