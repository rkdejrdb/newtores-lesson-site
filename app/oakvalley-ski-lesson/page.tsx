// app/oakvalley-ski-lesson/page.tsx
import Link from "next/link";

export const metadata = {
  title: "오크밸리 스키 강습｜초보·아이·성인 맞춤 강습 안내 | 뉴토레스",
  description:
    "오크밸리 스키 강습을 찾는 분들을 위한 안내 페이지입니다. 초보·아이·성인 레벨별 맞춤 코칭, 안전 중심 진행, 사진/영상 옵션 제공. 카카오톡으로 빠르게 상담하세요.",
};

const KAKAO_URL =
  "https://open.kakao.com/o/srH5zE3f?message=오크밸리%20스키%20강습%20문의드립니다";

export default function OakvalleySkiLessonPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground">
          <Link href="/" className="underline">
            홈
          </Link>{" "}
          <span className="mx-2">/</span>
          <span>오크밸리 스키 강습</span>
        </div>

        {/* H1 */}
        <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight">
          오크밸리 스키 강습｜초보·아이·성인 맞춤 강습 안내
        </h1>

        {/* Intro */}
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          “오크밸리 스키 강습”을 찾는 분들이 가장 많이 고민하는 건 딱 3가지예요.
          <br />
          <span className="font-semibold text-foreground">
            안전하게 배우는지, 초보도 가능한지, 예약이 빠른지.
          </span>
          <br />
          뉴토레스 강습센터는 레벨별 맞춤 코칭으로 부담 없이 시작할 수 있게 돕습니다.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold bg-[#FEE500] text-black hover:bg-[#FEE500]/90 border border-black/10"
          >
            카카오톡으로 스키 강습 문의하기
          </a>
          <Link
            href="/#pricing"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold border hover:bg-accent"
          >
            강습 요금 보기
          </Link>
        </div>

        {/* Content blocks */}
        <section className="mt-10 space-y-8">
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-extrabold">이런 분께 특히 추천</h2>
            <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-2">
              <li>스키가 처음이라 넘어짐/정지부터 배우고 싶은 초보</li>
              <li>아이(키즈) 강습이 필요하고 안전이 가장 중요한 가족</li>
              <li>자세/턴 교정이 필요해서 “레벨업 코칭”을 원하는 성인</li>
              <li>일정이 촉박해서 빠른 상담/배정이 필요한 분</li>
            </ul>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-extrabold">뉴토레스 스키 강습 특징</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-muted/30 p-5">
                <div className="font-bold">안전 중심 진행</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  초보/키즈/성인 각각의 속도와 체력에 맞춰 동선과 코스를 조정합니다.
                </p>
              </div>
              <div className="rounded-2xl bg-muted/30 p-5">
                <div className="font-bold">레벨별 맞춤 커리큘럼</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  기초부터 자세교정까지 목표에 맞게 구성하고, 현장에서 조정합니다.
                </p>
              </div>
              <div className="rounded-2xl bg-muted/30 p-5">
                <div className="font-bold">사진/영상 옵션</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  강습 기록을 남기고 피드백에 활용할 수 있도록 촬영 옵션을 제공합니다.
                </p>
              </div>
              <div className="rounded-2xl bg-muted/30 p-5">
                <div className="font-bold">카톡으로 빠른 예약</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  폼 입력 없이 카카오톡으로 바로 문의 → 시간/인원/레벨 확인 후 확정 안내.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-extrabold">카톡 문의 시 이렇게 보내면 가장 빨라요</h2>
            <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
              아래 템플릿 그대로 복사해서 보내면 상담 속도가 빨라집니다.
            </div>
            <pre className="mt-4 rounded-2xl bg-muted/40 p-4 text-sm overflow-auto">
{`[오크밸리 스키 강습 문의]
1) 날짜/시간:
2) 인원(1:1 / 1:2 / 1:3):
3) 레벨(초보/초급/중급/상급):
4) 장비/의류 렌탈 필요 여부(사이즈):
5) 요청사항:`}
            </pre>

            <div className="mt-5">
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                카카오톡으로 문의하기
              </a>
            </div>
          </div>
        </section>

        {/* Footer links */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <Link
            href="/#programs"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold border hover:bg-accent"
          >
            강습 안내로 이동
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold border hover:bg-accent"
          >
            오시는 길 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
