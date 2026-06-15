import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import HashScrollHandler from "@/components/HashScrollHandler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const metadata = {
  metadataBase: new URL("https://emdee.in"),
  title: {
    default: "Emdee Techno Services - IT Solutions & Services",
    template: "%s | Emdee Techno Services",
  },
  description:
    "Leading provider of IT infrastructure, software development, manpower solutions, security services, and comprehensive facility management.",
  keywords: [
    "IT solutions",
    "software development",
    "IT infrastructure",
    "manpower services",
    "security services",
    "facility management",
    "AMC services",
    "ITES",
  ],
  authors: [{ name: "Emdee Techno Services" }],
  creator: "Emdee Techno Services",
  publisher: "Emdee Techno Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emdee.in",
    siteName: "Emdee Techno Services",
    title: "Emdee Techno Services - IT Solutions & Services",
    description:
      "Leading provider of IT infrastructure, software development, manpower solutions, security services, and comprehensive facility management.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emdee Techno Services - IT Solutions & Services",
    description:
      "Leading provider of IT infrastructure, software development, manpower solutions, security services, and comprehensive facility management.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HashScrollHandler />
      {children}
      <Footer />
    </QueryClientProvider>
  );
}
