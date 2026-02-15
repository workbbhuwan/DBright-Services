import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

export const metadata: Metadata = {
  title: "株式会社D.Bright サービス一覧 | ホテル清掃・人材派遣・留学サポート・ハラール事業",
  description:
    "株式会社D.Bright（D.BRIGHT Corporation / ディーブライト）のサービス一覧。ホテル清掃、人材派遣、ハラール事業支援、留学サポートなど幅広いサービスを千葉県市川市より提供。Services by D.BRIGHT Corporation: hotel cleaning, worker dispatch, halal business, study abroad support.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "株式会社D.Bright サービス一覧 | D.BRIGHT Corporation",
    description:
      "株式会社D.Bright（ディーブライト）のホテル清掃、人材派遣、留学サポート、ハラール事業支援のサービス一覧。",
    url: `${SITE_URL}/services`,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        alt: "株式会社D.Bright サービス",
      },
    ],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
