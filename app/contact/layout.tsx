import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

export const metadata: Metadata = {
  title: "株式会社D.Bright お問い合わせ | D.BRIGHT Corporation | 電話・メール",
  description:
    "株式会社D.Bright（D.BRIGHT Corporation / ディーブライト）へのお問い合わせ。電話：047-711-2099、メール：info@dbrightservices.com。千葉県市川市新田4-18-22。清掃・人材派遣・留学サポートのご相談はお気軽に。Contact D.BRIGHT Corporation for cleaning, staffing, and other services.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "株式会社D.Bright お問い合わせ | D.BRIGHT Corporation",
    description:
      "株式会社D.Bright（ディーブライト）へのお問い合わせはこちら。電話・メール・フォームで受付中。",
    url: `${SITE_URL}/contact`,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        alt: "株式会社D.Bright お問い合わせ",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
