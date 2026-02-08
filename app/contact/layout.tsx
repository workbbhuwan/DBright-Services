import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | 株式会社D.Bright（D.BRIGHT Corporation）",
  description:
    "株式会社D.Bright（D.BRIGHT Corporation）へのお問い合わせ。電話：047-711-2099、メール：info@dbrightservices.com。千葉県市川市新田4-18-22。Contact D.BRIGHT Corporation for cleaning, staffing, and other services.",
  openGraph: {
    title: "お問い合わせ | 株式会社D.Bright",
    description:
      "株式会社D.Brightへのお問い合わせはこちら。電話・メール・フォームで受付中。",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
