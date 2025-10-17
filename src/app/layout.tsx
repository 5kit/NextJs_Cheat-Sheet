// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
      <footer>
        <p className="text-center p-4 text-sm text-gray-500">
          &copy; 2025 My Next.js App
        </p>
      </footer>
    </html>
  )
}
