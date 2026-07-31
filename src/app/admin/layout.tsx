import "./admin.css";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-theme min-h-screen max-w-[100vw] overflow-x-hidden bg-[#f9f9f9] text-gray-900 antialiased">
      {children}
    </div>
  );
}
