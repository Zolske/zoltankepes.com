import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />

      <main>{children}</main>

      <footer>{/* <p>This is an example footer!</p> */}</footer>
    </div>
  );
}
