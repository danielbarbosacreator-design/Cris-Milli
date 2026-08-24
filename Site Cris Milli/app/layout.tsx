import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://crismilli30180.netlify.app"),
  title: "Cris Milli 30.180 | Deputada Estadual por Santa Catarina",
  description: "Conheça a história, as bandeiras e as propostas de Cris Milli, candidata a Deputada Estadual por Santa Catarina pelo Partido Novo, número 30.180.",
  keywords: ["Cris Milli", "Cris Milli 30180", "Cris Milli Deputada Estadual", "Deputada Estadual Santa Catarina", "Cris Milli São Francisco do Sul", "Cris Milli Partido Novo", "Cris Milli Praia do Ervino"],
  openGraph: { title: "Cris Milli 30.180 | Deputada Estadual por Santa Catarina", description: "Uma história real de trabalho, recomeços e serviço.", type: "website", locale: "pt_BR", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Cris Milli 30.180 — Deputada Estadual por Santa Catarina" }] },
  twitter: { card: "summary_large_image", title: "Cris Milli 30.180", description: "Deputada Estadual por Santa Catarina.", images: ["/og.png"] },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Person", name: "Cris Milli", alternateName: "Cristianne Milli da Silva", jobTitle: "Candidata a Deputada Estadual por Santa Catarina", affiliation: { "@type": "Organization", name: "Partido Novo — Santa Catarina" }, homeLocation: { "@type": "Place", name: "São Francisco do Sul, Santa Catarina" } };
  return <html lang="pt-BR"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
