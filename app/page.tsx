"use client";

import { useEffect } from "react";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Phone, MapPin, ShieldCheck, Video, Star, Clock, Users, Sparkles, MessageCircle } from "lucide-react";

// ----------------------
// ✅ EDIT HERE (store/center info)
// ----------------------
const BRAND = {
  name: "뉴토레스 스키·보드 강습센터",
  resort: "오크밸리",
  phone: "010-3194-3453",
  address: "강원 원주시 지정면 오크밸리2길 22",
  mapUrl: "https://naver.me/5gYnVPwS",
  kakaoOrTalkUrl: "https://open.kakao.com/o/srH5zE3f", // ✅ 오픈채팅 1:1 링크 // ✅ 카카오톡 채널 1:1 채팅 링크로 교체하세요 (예: https://pf.kakao.com/_abcd/chat)
  instagramUrl: "", // optional
  heroImages: [
    // Replace with your hosted image URLs
    "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1489587024840-69d50f65c503?auto=format&fit=crop&w=1600&q=80",
  ],
};

// Pricing templates (edit freely)
const PROGRAMS = [
  {
    id: "ski",
    title: "스키 강습",
    subtitle: "초보·아이·성인 맞춤 레벨업",
    badges: ["초보환영", "안전중심", "자세교정", "사진/영상 제공"],
    highlights: [
      "기초부터 자세교정까지 레벨별 맞춤",
      "강습 중 사진/영상 촬영 후 전송(옵션)",
      "현장 상황에 따라 코스/동선 최적화",
    ],
    pricing: [
      { label: "1:1", duration: "2시간", price: "150,000원" },
      { label: "1:2", duration: "2시간", price: "180,000원" },
      { label: "1:3", duration: "2시간", price: "210,000원" },
    ],
  },
  {
    id: "board",
    title: "보드 강습",
    subtitle: "첫 보딩부터 안전하게",
    badges: ["초보환영", "안전중심", "자세교정", "사진/영상 제공"],
    highlights: [
      "넘어짐·일어남부터 BBP/턴까지 단계별",
      "펜듈럼/비기너턴/카빙 기초",
      "개인 페이스에 맞춘 코칭",
    ],
    pricing: [
      { label: "1:1", duration: "2시간", price: "150,000원" },
      { label: "1:2", duration: "2시간", price: "180,000원" },
      { label: "1:3", duration: "2시간", price: "210,000원" },
    ],
  },
] as const;

const INSTRUCTORS = [
  {
    name: "강사 A",
    role: "스키/보드 코치",
    tags: ["초보 전문", "자세교정"],
    bio: "[경력/자격/지도 스타일 소개를 입력하세요]",
    photo:
      "/hero/스키강사.jpeg",
  },
  {
    name: "강사 B",
    role: "키즈/패밀리 코치",
    tags: ["아이 강습", "안전 중심"],
    bio: "[경력/자격/지도 스타일 소개를 입력하세요]",
    photo:
      "/hero/스키강사.jpeg",
  },
  {
    name: "강사 C",
    role: "레벨업 코치",
    tags: ["중급", "턴 교정"],
    bio: "[경력/자격/지도 스타일 소개를 입력하세요]",
    photo:
      "/hero/스키강사.jpeg",
  },
];

const FAQS = [
  {
    q: "장비/의류가 없어도 강습 가능한가요?",
    a: "네. 현장 렌탈(장비/의류/보호장구)과 함께 이용 가능합니다. 예약 시 희망 사이즈를 남겨주시면 준비가 더 빠릅니다.",
  },
  {
    q: "초보인데 2시간으로 충분할까요?",
    a: "개인차가 있지만, 2시간만으로도 기본 자세·정지·방향전환의 틀을 잡는 데 도움이 됩니다. 목표(안전하게 내려오기/턴 배우기 등)를 예약 시 알려주시면 커리큘럼을 맞춰드립니다.",
  },
  {
    q: "비가 오거나 강풍이면 어떻게 되나요?",
    a: "리조트 운영 상황과 안전을 최우선으로 하며, 불가 시 일정 변경/환불 기준에 따라 안내드립니다.",
  },
  {
    q: "사진/영상은 꼭 제공되나요?",
    a: "기본 제공/옵션 제공 여부를 상품 구성에 맞춰 설정할 수 있습니다. 원하시면 당일 요청도 가능합니다.",
  },
];

// ----------------------
// Helpers
// ----------------------
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}


function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

type PriceRow = {
  label: string;
  duration?: string;
  price: string;
};

function PriceTable({ rows }: { rows: readonly PriceRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="p-3 text-left font-semibold">구분</th>
            <th className="p-3 text-left font-semibold">시간</th>
            <th className="p-3 text-right font-semibold">금액</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={cn("border-t", idx % 2 ? "bg-muted/10" : "")}> 
              <td className="p-3">{r.label}</td>
              <td className="p-3 text-muted-foreground">{r.duration}</td>
              <td className="p-3 text-right font-bold">{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type PillProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

function Pill({ icon: Icon, title, desc }: PillProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-2xl border bg-background p-2">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm text-muted-foreground mt-1">{desc}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------
// Main App
// ----------------------
export default function App() {
  const [openBooking, setOpenBooking] = useState(false);
  const [bookingPreset, setBookingPreset] = useState<BookingPreset | undefined>(undefined);


  const nav = useMemo(
    () => [
      { id: "programs", label: "강습 안내" },
      { id: "instructors", label: "강사진" },
      { id: "pricing", label: "요금" },
      { id: "booking", label: "예약" },
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "오시는 길" },
    ],
    []
  );



const HERO_IMAGES = ["/hero/스키강습.jpg", "/hero/스키강습1.jpg", "/hero/스키강습3.jpg"];

const [heroIdx, setHeroIdx] = useState(0);

useEffect(() => {
  const t = setInterval(() => {
    setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
  }, 3500); // 3.5초마다 변경 (원하는 값으로)
  return () => clearInterval(t);
}, []);


  const heroBg = BRAND.heroImages?.[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b bg-background/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl border flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-extrabold leading-tight">{BRAND.name}</div>
              <div className="text-xs text-muted-foreground">{BRAND.resort}</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-muted-foreground hover:text-foreground transition"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {BRAND.kakaoOrTalkUrl ? (
              <Button asChild className="rounded-2xl hidden sm:inline-flex bg-[#FEE500] text-black hover:bg-[#FEE500]/90">
                <a href={BRAND.kakaoOrTalkUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  카톡 문의
                </a>
              </Button>
            ) : null}
            <Button
              className="rounded-2xl"
              onClick={() => {
                setBookingPreset({ programId: "ski" });
                setOpenBooking(true);
              }}
            >
              바로 예약
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
 {/* 배경 1 */}
  <div
    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-100"
    style={{ backgroundImage: `url(${HERO_IMAGES[heroIdx]})` }}
  />

  {/* 어둡게 오버레이(가독성) */}
  <div className="absolute inset-0 bg-black/40" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <Badge className="rounded-2xl" variant="secondary">
              오크밸리 현장 강습 · 예약형
            </Badge>
            <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
              초보도, 아이도
              <br />
              안전하게 ‘처음부터’
            </h1>
            <p className="mt-4 text-white/85 text-base md:text-lg">
              레벨별 맞춤 코칭으로 부담 없이 시작하세요.
              <br />
              강습 중 사진/영상 촬영(옵션)으로 기록까지 남겨드립니다.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                className="rounded-2xl"
                size="lg"
                onClick={() => {
                  setBookingPreset({ programId: "ski" });
                  setOpenBooking(true);
                }}
              >
                스키 강습 예약
              </Button>
              <Button
                className="rounded-2xl"
                size="lg"
                variant="secondary"
                onClick={() => {
                  setBookingPreset({ programId: "board" });
                  setOpenBooking(true);
                }}
              >
                보드 강습 예약
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Pill icon={ShieldCheck} title="안전 중심" desc="초보/키즈 맞춤 진행" />
              <Pill icon={Video} title="사진·영상" desc="강습 기록 전송(옵션)" />
              <Pill icon={Clock} title="빠른 시작" desc="예약 후 현장 진행" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <Section
        id="programs"
        title="강습 안내"
        subtitle="스키/보드 레벨별 맞춤 프로그램 · 커리큘럼은 목표에 따라 조정됩니다."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((p) => (
            <Card key={p.id} className="rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xl font-extrabold">{p.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {p.subtitle}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {p.badges.map((b) => (
                      <Badge key={b} variant="secondary" className="rounded-2xl">
                        {b}
                      </Badge>
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {p.highlights.map((h, idx) => (
                    <li key={idx} className="py-1">
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span className="text-muted-foreground">
                    1:1 / 1:2 / 1:3 선택 가능
                  </span>
                </div>

                <div className="mt-5">
                  <Button
                    className="rounded-2xl w-full"
                    onClick={() => {
                      setBookingPreset({ programId: p.id });
                      setOpenBooking(true);
                    }}
                  >
                    {p.title} 예약하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Instructors */}
      <Section
        id="instructors"
        title="강사진"
        subtitle="강사진 정보(경력/자격/전문 분야)"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSTRUCTORS.map((ins) => (
            <Card key={ins.name} className="rounded-2xl overflow-hidden">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={ins.photo}
                  alt={ins.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-lg font-extrabold">{ins.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {ins.role}
                    </div>
                  </div>
                  <Star className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ins.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-2xl">
                      {t}
                    </Badge>
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{ins.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" title="요금" subtitle="1:1, 1:2, 1:3 금액은 1명당 금액이 아닌 총 금액입니다.">
        <Tabs defaultValue="ski" className="w-full">
          <TabsList className="rounded-2xl">
            <TabsTrigger value="ski" className="rounded-2xl">스키</TabsTrigger>
            <TabsTrigger value="board" className="rounded-2xl">보드</TabsTrigger>
          </TabsList>

          {PROGRAMS.map((p) => (
            <TabsContent key={p.id} value={p.id} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PriceTable rows={p.pricing} />
                </div>
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-base font-extrabold">예약 전 체크</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>희망 시간대/인원/레벨을 남겨주세요.</li>
                      <li>장비/의류가 필요하면 사이즈도 함께 적어주세요.</li>
                      <li>기상/리조트 운영에 따라 일정이 조정될 수 있습니다.</li>
                    </ul>
                    <Button
                      className="rounded-2xl w-full mt-5"
                      onClick={() => {
                        setBookingPreset({ programId: p.id });
                        setOpenBooking(true);
                      }}
                    >
                      {p.title} 바로 예약
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      {/* Booking */}
      <Section
        id="booking"
        title="예약"
        subtitle="아래 예약 폼은 ①메일 전송(간단) 또는 ②구글 Apps Script 연동(자동 접수) 중 선택해 바로 사용할 수 있습니다."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-extrabold">빠른 예약</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                버튼을 눌러 예약 폼을 작성하면, 상담/확정 안내를 드립니다.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  className="rounded-2xl"
                  onClick={() => {
                    setBookingPreset({ programId: "ski" });
                    setOpenBooking(true);
                  }}
                >
                  스키 예약
                </Button>
                <Button
                  className="rounded-2xl"
                  variant="secondary"
                  onClick={() => {
                    setBookingPreset({ programId: "board" });
                    setOpenBooking(true);
                  }}
                >
                  보드 예약
                </Button>
                {BRAND.kakaoOrTalkUrl ? (
                  <Button asChild className="rounded-2xl" variant="outline">
                    <a href={BRAND.kakaoOrTalkUrl} target="_blank" rel="noreferrer">
                      카카오톡 문의
                    </a>
                  </Button>
                ) : null}
              </div>
              <Separator className="my-5" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold text-foreground">{BRAND.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>당일 예약 가능 여부는 재고/강사 배정에 따라 달라집니다.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-extrabold">예약 운영 가이드</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                “바로 예약”을 진짜 자동화하려면 아래 중 하나로 연결하세요.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <b>가장 쉬움:</b> 폼 제출 → <b>메일 발송</b>(대부분 업체가 이 방식으로 시작)
                </li>
                <li>
                  <b>추천:</b> 구글 Forms/Sheets + Apps Script로 <b>자동 접수</b>(문자/톡톡 연동도 가능)
                </li>
                <li>
                  <b>확장:</b> 네이버 예약/캘린더(예약 슬롯)로 <b>즉시 확정형</b> 운영
                </li>
              </ul>
              <p className="text-xs">
                ※ 이 페이지는 프런트엔드(웹)입니다. 결제/자동 확정은 연동 방식에 따라 붙입니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="자주 묻는 질문" subtitle="초보 고객의 불안을 줄이면 예약 전환율이 올라갑니다.">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Contact */}
      <Section id="contact" title="오시는 길">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-extrabold">기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <div className="font-semibold text-foreground">{BRAND.address}</div>
                  <a
                    className="text-sm underline"
                    href={BRAND.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    네이버 지도 열기
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <div>
                  <div className="font-semibold text-foreground">{BRAND.phone}</div>
                  <div className="text-xs">문의/예약 확인</div>
                </div>
              </div>
              {BRAND.kakaoOrTalkUrl ? (
                <Button asChild className="rounded-2xl w-full">
                  <a href={BRAND.kakaoOrTalkUrl} target="_blank" rel="noreferrer">
                    카카오톡 1:1 채팅하기
                  </a>
                </Button>
              ) : (
                <Button
                  className="rounded-2xl w-full"
                  variant="secondary"
                  onClick={() => {
                    setBookingPreset({ programId: "ski" });
                    setOpenBooking(true);
                  }}
                >
                  예약 폼 열기
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-extrabold">운영 안내</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-1" />
                <div>
                  <div className="font-semibold text-foreground">08:00 - 24:00</div>
                  <div className="text-xs">리조트 운영/시즌 일정에 따라 변동될 수 있습니다.</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-1" />
                <div>
                  <div className="font-semibold text-foreground">안전 & 환불</div>
                  <div className="text-xs">
                    [노쇼/우천/강풍/환불 규정]
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Floating Kakao button (mobile-first) */}
      {BRAND.kakaoOrTalkUrl ? (
        <a
          href={BRAND.kakaoOrTalkUrl}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-4 right-4 z-50"
          aria-label="카카오톡 문의"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [0, -6, 6, -4, 4, 0],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 4.2,
            }}
            className="relative rounded-2xl shadow-lg border border-black/10 bg-[#FEE500] text-black px-4 py-3 flex items-center gap-2"
          >
            <span className="absolute -top-2 -left-2 text-[11px] font-extrabold rounded-full px-2 py-1 bg-black text-[#FEE500] shadow">
              상담 가능
            </span>
            <MessageCircle className="h-4 w-4" />
            <span className="font-extrabold text-sm">카톡 문의</span>
            <span className="text-xs text-black/70 hidden sm:inline">1:1 오픈채팅</span>
          </motion.div>
        </a>
      ) : null}

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="font-semibold text-foreground">{BRAND.name}</div>
              <div>{BRAND.address}</div>
            </div>
            <div className="flex items-center gap-3">
              <a className="underline" href={BRAND.mapUrl} target="_blank" rel="noreferrer">
                지도
              </a>
              <a className="underline" href={`tel:${BRAND.phone.replace(/-/g, "")}`}>
                전화
              </a>
            </div>
          </div>
          <div className="mt-6 text-xs">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Booking Dialog */}
      <BookingDialog
        open={openBooking}
        onOpenChange={setOpenBooking}
        preset={bookingPreset}
      />
    </div>
  );
}

type BookingPreset = {
  programId?: "ski" | "board";
};

type BookingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preset?: BookingPreset;
};

function BookingDialog({ open, onOpenChange, preset }: BookingDialogProps) {
  const [programId, setProgramId] = useState(preset?.programId || "ski");
  const [lessonType, setLessonType] = useState("1:1");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("초보");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  React.useEffect(() => {
    if (open) {
      setProgramId(preset?.programId || "ski");
      setDone(false);
      setSubmitting(false);
    }
  }, [open, preset]);

  const programLabel = programId === "ski" ? "스키" : "보드";

  const canSubmit = name.trim() && phone.trim() && date.trim() && time.trim();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    // ✅ Option A (default): mailto (fastest start)
    // ✅ Option B: send to your endpoint (Google Apps Script / backend)
    setSubmitting(true);

    const payload = {
      program: programLabel,
      lessonType,
      date,
      time,
      name,
      phone,
      level,
      notes,
      createdAt: new Date().toISOString(),
    };

    try {
      // ---- Option B (recommended for automation)
      // Replace with your Google Apps Script Web App URL, e.g.
      // const ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
      // await fetch(ENDPOINT, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });

      // ---- Option A: mailto
      const subject = encodeURIComponent(`[예약요청] ${programLabel} 강습 ${lessonType} / ${date} ${time}`);
      const body = encodeURIComponent(
        `예약 요청 정보\n\n` +
          `프로그램: ${payload.program}\n` +
          `강습 형태: ${payload.lessonType}\n` +
          `희망일시: ${payload.date} ${payload.time}\n` +
          `이름: ${payload.name}\n` +
          `연락처: ${payload.phone}\n` +
          `레벨: ${payload.level}\n` +
          `요청사항: ${payload.notes || "-"}\n\n` +
          `※ 자동 생성 메시지입니다.`
      );

      // Change email to your receiving address
      const to = "[예약수신이메일@도메인.com]";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      setDone(true);
    } catch (err) {
      console.error(err);
      alert("예약 전송에 실패했습니다. 다시 시도하거나 전화로 문의해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">바로 예약</DialogTitle>
          <DialogDescription>
            아래 정보를 남겨주시면 확인 후 확정 안내드립니다.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl border p-5"
            >
              <div className="font-extrabold">접수 완료(메일 작성 화면이 열립니다)</div>
              <p className="text-sm text-muted-foreground mt-2">
                메일 전송이 어려우면 {BRAND.phone}로 전화/문자 주셔도 됩니다.
              </p>
              <div className="mt-4 flex gap-2">
                <Button className="rounded-2xl" onClick={() => onOpenChange(false)}>
                  닫기
                </Button>
                <Button
                  className="rounded-2xl"
                  variant="secondary"
                  onClick={() => {
                    setDone(false);
                  }}
                >
                  다른 예약 작성
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <div className="text-sm font-semibold">프로그램</div>
                <Select
                  value={programId}
                  onValueChange={(v) => setProgramId(v as "ski" | "board")}
                >

                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ski">스키</SelectItem>
                    <SelectItem value="board">보드</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">강습 형태</div>
                <Select value={lessonType} onValueChange={setLessonType}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">1:1</SelectItem>
                    <SelectItem value="1:2">1:2</SelectItem>
                    <SelectItem value="1:3">1:3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">희망 날짜</div>
                <Input
                  className="rounded-2xl"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">희망 시간</div>
                <Input
                  className="rounded-2xl"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">예약자명</div>
                <Input
                  className="rounded-2xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 홍길동"
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">연락처</div>
                <Input
                  className="rounded-2xl"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="예: 010-1234-5678"
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">레벨</div>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="초보">초보</SelectItem>
                    <SelectItem value="초급">초급</SelectItem>
                    <SelectItem value="중급">중급</SelectItem>
                    <SelectItem value="상급">상급</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold">추가 요청사항</div>
                <Textarea
                  className="rounded-2xl min-h-[88px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="예: 아이 9세/키 135, 렌탈 필요(의류/장비), 사진/영상 요청"
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-2">
                <div className="text-xs text-muted-foreground">
                  * 기본은 메일 접수(가장 빠름). 자동 확정형으로 바꾸려면 Apps Script 연동을 붙이면 됩니다.
                </div>
                <Button
                  type="submit"
                  className="rounded-2xl"
                  disabled={!canSubmit || submitting}
                >
                  {submitting ? "전송 중..." : "예약 요청 보내기"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
