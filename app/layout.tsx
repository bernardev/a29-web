import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "A29 Imóveis | Consultoria Imobiliária em Curitiba",
  description: "A29 Imóveis - Consultoria imobiliária personalizada em Curitiba e região. Encontre o imóvel ideal para você com atendimento exclusivo.",
  keywords: "imóveis, curitiba, apartamentos, casas, consultoria imobiliária, A29",
  openGraph: {
    title: "A29 Imóveis | Consultoria Imobiliária em Curitiba",
    description: "Consultoria imobiliária personalizada em Curitiba e região.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Exo+2:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
