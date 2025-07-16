'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { recipes } from '@/lib/data/recipes'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Clock, 
  Droplets, 
  Sun, 
  Moon,
  Check,
  AlertCircle,
  Heart,
  Share2,
  Star,
  ChevronRight,
  Timer,
  Sparkles
} from 'lucide-react'

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const recipeId = params.id as string
  
  // 레시피 찾기
  const recipe = recipes.find(r => r.id === recipeId)
  
  // 레시피에 추가 정보 더하기 (임시 데이터)
  const recipeData = recipe ? {
    ...recipe,
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 500) + 50,
    saved: Math.floor(Math.random() * 1000) + 100,
  } : null

  const [currentStep, setCurrentStep] = useState(0)
  const [checkedSteps, setCheckedSteps] = useState<number[]>([])
  const [isSaved, setIsSaved] = useState(false)
  const [selectedTime, setSelectedTime] = useState<'all' | 'morning' | 'evening'>('all')

  const handleStepCheck = (stepNumber: number) => {
    setCheckedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(n => n !== stepNumber)
        : [...prev, stepNumber]
    )
  }

  if (!recipeData) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">레시피를 찾을 수 없습니다</h1>
          <Button onClick={() => router.back()}>
            돌아가기
          </Button>
        </div>
      </>
    )
  }

  // 선택된 시간대에 따라 스텝 필터링
  const filteredSteps = recipeData.steps.filter(step => {
    if (selectedTime === 'all') return true
    if (selectedTime === 'morning') return step.timeOfDay === 'morning' || step.timeOfDay === 'both'
    if (selectedTime === 'evening') return step.timeOfDay === 'evening' || step.timeOfDay === 'both'
    return true
  })

  const progress = (checkedSteps.length / recipeData.steps.length) * 100

  return (
    <>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/concerns" className="hover:text-primary">피부고민</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/recipes?concern=acne" className="hover:text-primary">여드름</Link>
            <ChevronRight className="h-4 w-4" />
            <span>{recipeData.title}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{recipeData.title}</h1>
              <p className="text-muted-foreground">{recipeData.description}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary">{recipeData.concernName}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{recipeData.totalTime}분</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{recipeData.rating}</span>
                  <span className="text-muted-foreground">({recipeData.reviews})</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 진행률 표시 */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">오늘의 진행률</span>
              <span className="text-sm text-muted-foreground">
                {checkedSteps.length}/{recipeData.steps.length} 완료
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            {progress === 100 && (
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                오늘 루틴 완료! 수고하셨어요
              </p>
            )}
          </CardContent>
        </Card>

        {/* 시간대 선택 버튼 */}
        <div className="flex justify-center gap-2 mb-6">
          <Button 
            variant={selectedTime === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTime('all')}
          >
            전체 루틴
          </Button>
          <Button 
            variant={selectedTime === 'morning' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTime('morning')}
            className="gap-2"
          >
            <Sun className="h-4 w-4" />
            아침 루틴
          </Button>
          <Button 
            variant={selectedTime === 'evening' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTime('evening')}
            className="gap-2"
          >
            <Moon className="h-4 w-4" />
            저녁 루틴
          </Button>
        </div>

        {/* 탭 컨텐츠 */}
        <Tabs defaultValue="routine" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="routine">루틴 단계</TabsTrigger>
            <TabsTrigger value="timeline">사용 시기</TabsTrigger>
            <TabsTrigger value="results">기대 효과</TabsTrigger>
          </TabsList>

          {/* 루틴 단계 탭 */}
          <TabsContent value="routine" className="space-y-4 mt-6">
            {filteredSteps.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  {selectedTime === 'morning' ? '아침' : '저녁'} 루틴이 없습니다.
                </p>
              </Card>
            ) : (
              <>
                <div className="text-sm text-muted-foreground text-center mb-4">
                  {selectedTime === 'morning' && '🌅 아침 루틴 단계'}
                  {selectedTime === 'evening' && '🌙 저녁 루틴 단계'}
                  {selectedTime === 'all' && `총 ${filteredSteps.length}단계`}
                </div>
                {filteredSteps.map((step, index) => (
                  <Card 
                    key={step.id}
                    className={`transition-all ${
                      checkedSteps.includes(step.number) 
                        ? 'border-green-500 bg-green-50/50' 
                        : ''
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            checkedSteps.includes(step.number)
                              ? 'bg-green-500'
                              : 'bg-primary'
                          }`}>
                            {checkedSteps.includes(step.number) ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Timer className="h-4 w-4" />
                                {step.duration}분
                              </span>
                              {step.timeOfDay === 'morning' && (
                                <span className="flex items-center gap-1">
                                  <Sun className="h-4 w-4" />
                                  아침
                                </span>
                              )}
                              {step.timeOfDay === 'evening' && (
                                <span className="flex items-center gap-1">
                                  <Moon className="h-4 w-4" />
                                  저녁
                                </span>
                              )}
                              {step.timeOfDay === 'both' && (
                                <span className="flex items-center gap-1 text-primary">
                                  <Sparkles className="h-4 w-4" />
                                  아침 & 저녁
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStepCheck(step.number)}
                        >
                          {checkedSteps.includes(step.number) ? '완료 취소' : '완료'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {step.products.map((product, pIndex) => (
                        <div key={pIndex} className="border-l-4 border-primary/20 pl-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{product.type}</Badge>
                            <span className="font-medium">{product.ingredient}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            💡 {product.why}
                          </p>
                          <p className="text-sm">
                            ✨ <span className="font-medium">사용 팁:</span> {product.tip}
                          </p>
                        </div>
                      ))}
                      {step.waitTime && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4" />
                          다음 단계 전 {step.waitTime}초 기다려주세요
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </TabsContent>

          {/* 사용 시기 탭 */}
          <TabsContent value="timeline" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className={selectedTime === 'evening' ? 'opacity-50' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    아침 루틴
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recipeData.steps
                      .filter(step => step.timeOfDay === 'morning' || step.timeOfDay === 'both')
                      .map((step, index) => (
                        <div key={step.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm flex-1">{step.title}</span>
                          <span className="text-xs text-muted-foreground">{step.duration}분</span>
                        </div>
                      ))}
                    {recipeData.steps.filter(step => step.timeOfDay === 'morning' || step.timeOfDay === 'both').length === 0 && (
                      <p className="text-sm text-muted-foreground">아침 루틴이 없습니다</p>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      총 소요 시간: {recipeData.steps
                        .filter(step => step.timeOfDay === 'morning' || step.timeOfDay === 'both')
                        .reduce((acc, step) => acc + step.duration, 0)}분
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={selectedTime === 'morning' ? 'opacity-50' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    저녁 루틴
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recipeData.steps
                      .filter(step => step.timeOfDay === 'evening' || step.timeOfDay === 'both')
                      .map((step, index) => (
                        <div key={step.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm flex-1">{step.title}</span>
                          <span className="text-xs text-muted-foreground">{step.duration}분</span>
                        </div>
                      ))}
                    {recipeData.steps.filter(step => step.timeOfDay === 'evening' || step.timeOfDay === 'both').length === 0 && (
                      <p className="text-sm text-muted-foreground">저녁 루틴이 없습니다</p>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      총 소요 시간: {recipeData.steps
                        .filter(step => step.timeOfDay === 'evening' || step.timeOfDay === 'both')
                        .reduce((acc, step) => acc + step.duration, 0)}분
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 기대 효과 탭 */}
          <TabsContent value="results" className="mt-6">
            <div className="space-y-4">
              {recipeData.expectedResults.map((result, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                        {result.week}주
                      </div>
                      <p className="flex-1">{result.effect}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* 주의사항 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              주의사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recipeData.cautions.map((caution, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground">•</span>
                  <span>{caution}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex gap-4">
          <Button className="flex-1" size="lg">
            이 레시피 시작하기
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/community?recipe=1">
              사용 후기 보기 ({recipeData.reviews})
            </Link>
          </Button>
        </div>
      </main>
    </>
  )
}
