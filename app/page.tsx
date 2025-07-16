'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Navbar } from '@/components/layout/navbar'
import { ArrowRight, Sparkles, Users, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              고민에서 시작하는
              <br />
              <span className="text-primary">맞춤형 스킨케어 레시피</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              여드름, 건조함, 색소침착... 당신의 피부 고민에 딱 맞는 
              성분 조합과 단계별 루틴을 제공합니다
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/concerns">
                  내 고민 찾기 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/community">커뮤니티 둘러보기</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              INKEYNOTE만의 특별함
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>60개 고민별 레시피</CardTitle>
                  <CardDescription>
                    세분화된 피부 고민별로 검증된 성분 조합과 루틴을 제공합니다
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>단계별 사용법</CardTitle>
                  <CardDescription>
                    아침/저녁 루틴, 사용 순서, 대기 시간까지 상세하게 안내합니다
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6dd text-primary" />
                  </div>
                  <CardTitle>실사용 후기</CardTitle>
                  <CardDescription>
                    같은 고민을 가진 사용자들의 생생한 경험과 팁을 공유합니다
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              회원가입하고 나만의 스킨케어 루틴을 만들어보세요
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                무료로 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
