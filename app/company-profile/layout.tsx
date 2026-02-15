import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

export const metadata: Metadata = {
  title: "株式会社D.Bright 会社概要 | D.BRIGHT Corporation | 千葉県市川市",
  description:
    "株式会社D.Bright（D.BRIGHT Corporation / ディーブライト）の会社概要。代表取締役：オザ・ケサブ・ラズ。千葉県市川市を拠点に清掃業、人材派遣業、留学サポート、ハラール事業支援を展開。資本金500万円。Company profile of D.BRIGHT Corporation based in Ichikawa, Chiba.",
  alternates: {
    canonical: `${SITE_URL}/company-profile`,
  },
  openGraph: {
    title: "株式会社D.Bright 会社概要 | D.BRIGHT Corporation",
    description:
      "株式会社D.Bright（D.BRIGHT Corporation / ディーブライト）の会社概要・事業内容・企業情報。",
    url: `${SITE_URL}/company-profile`,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        alt: "株式会社D.Bright 会社概要",
      },
    ],
  },
};

export default function CompanyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
