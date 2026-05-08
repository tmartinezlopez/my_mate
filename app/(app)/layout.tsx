import { AppNav } from "@/components/layout/app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[16rem_1fr]">
      <AppNav />
      <main className="mx-auto w-full max-w-6xl p-4 pb-20 md:p-6 md:pb-6">{children}</main>
    </div>
  );
}
