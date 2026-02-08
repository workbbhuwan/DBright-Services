import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会社概要 | 株式会社D.Bright（D.BRIGHT Corporation）",
  description:
    "株式会社D.Bright（D.BRIGHT Corporation）の会社概要。代表取締役：オザ・ケサブ・ラズ。千葉県市川市を拠点に清掃業、人材派遣業、留学サポート、ハラール事業支援を展開。Company profile of D.BRIGHT Corporation based in Ichikawa, Chiba.",
  openGraph: {
    title: "会社概要 | 株式会社D.Bright（D.BRIGHT Corporation）",
    description:
      "株式会社D.Bright（D.BRIGHT Corporation）の会社概要・事業内容・企業情報。",
  },
};

export default function CompanyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
