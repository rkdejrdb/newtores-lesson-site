import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://newtores-lesson-site.vercel.app";
const OG_IMAGE = `${SITE_URL}/og.jpg`; // 나중에 public/og.jpg 넣으면 됨

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "오크밸리 스키·보드 강습 | 뉴토레스",
  description: "오크밸리 스키·보드 강습 전문 뉴토레스 강습센터",

  // ✅ 네이버 서치어드바이저 소유확인(이미 완료면 유지)
  other: {
    "naver-site-verification": "1b74ef51c408397002da1d543aaadc642941c08c",
  },

  // ✅ Open Graph
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "오크밸리 스키·보드 강습 | 뉴토레스",
    description: "초보·아이·가족 맞춤 강습 / 오크밸리 현장 진행 / 카카오톡 빠른 문의",
    siteName: "뉴토레스",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "뉴토레스 오크밸리 스키·보드 강습",
      },
    ],
  },

  // ✅ (선택) 트위터 카드도 같이
  twitter: {
    card: "summary_large_image",
    title: "오크밸리 스키·보드 강습 | 뉴토레스",
    description: "초보·아이·가족 맞춤 강습 / 오크밸리 현장 진행 / 카카오톡 빠른 문의",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
