import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://newtores-lesson-site.vercel.app";

  const routes = [
    "", // 홈
    "#programs",
    "#instructors",
    "#pricing",
    "#booking",
    "#faq",
    "#contact",
  ];

  // ✅ 주의: sitemap은 “실제 URL”만 허용이라 #해시 링크는 빼는 게 정석
  // 그래서 홈 1개만 넣는 걸 추천 (아래처럼)
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
