import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サービス一覧 | ホテル清掃・人材派遣・留学サポート・ハラール事業",
  description:
    "株式会社D.Bright（D.BRIGHT Corporation）のサービス一覧。ホテル清掃、人材派遣、ハラール事業支援、留学サポートなど幅広いサービスを提供。Services by D.BRIGHT Corporation: hotel cleaning, worker dispatch, halal business, study abroad support.",
  openGraph: {
    title: "サービス一覧 | 株式会社D.Bright",
    description:
      "ホテル清掃、人材派遣、留学サポート、ハラール事業支援。株式会社D.Brightのサービス一覧。",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
