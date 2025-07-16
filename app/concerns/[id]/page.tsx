'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Star,
  Heart,
  ChevronLeft,
  TrendingUp,
  Users,
  Filter,
  Sparkles
} from 'lucide-react'

import { concerns, getRecipesByConcern } from '@/lib/data/recipes'

// 모든 고민 데이터를 하나의 객체로 변환
const allConcerns = Object.values(concerns).reduce((acc, category) => {
  category.concerns.forEach(concern => {
    acc[concern.id] = {
      ...concern,
      category: category.name,
      categoryId: category.id,
      userCount: Math.floor(Math.random() * 1000) + 100 // 임시 사용자 수
    }
  })
  return acc
}, {})

const difficultyInfo = {
  beginner: { label: '초급', color: 'bg-green-50 text-green-700 border-green-200' },
  intermediate: { label: '중급', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  advanced: { label: '고급', color: 'bg-red-50 text-red-700 border-red-200' }
}

export default function ConcernRecipesPage() {
  const params = useParams()
  const router = useRouter()
  const concernId = params.id as string
  
  // 고민 정보 가져오기
  const concern = allConcerns[concernId]
  
  // 해당 고민의 레시피 가져오기
  const recipes = getRecipesByConcern(concernId)
  
  // 레시피에 추가 정보 더하기 (임시 데이터)
  const recipesWithStats = recipes.map(recipe => ({
    ...recipe,
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 500) + 50,
    saved: Math.floor(Math.random() * 1000) + 100,
    trending: Math.random() > 0.7,
    steps: recipe.steps.length
  }))
  
  const [savedRecipes, setSavedRecipes] = useState<string[]>([])

  const toggleSave = (recipeId: string) => {
    setSavedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    )
  }

  if (!concern) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">고민을 찾을 수 없습니다</h1>
          <Button onClick={() => router.push('/concerns')}>
            고민 목록으로 돌아가기
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 gap-2"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            뒤로가기
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{concern.name}</h1>
                <Badge variant="secondary">{concern.category}</Badge>
              </div>
              <p className="text-muted-foreground mb-2">{concern.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{concern.userCount}명이 같은 고민을 가지고 있어요</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
          </div>
        </div>

        {/* 추천 배너 */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">AI 추천</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {concern.name} 고민을 가진 사용자들이 가장 만족한 레시피들을 선별했어요
            </p>
          </CardContent>
        </Card>

        {/* 레시피 목록 */}
        <div className="grid gap-6">
          {recipesWithStats.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* 왼쪽: 레시피 정보 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{recipe.title}</h3>
                          {recipe.trending && (
                            <Badge variant="default" className="gap-1">
                              <TrendingUp className="h-3 w-3" />
                              인기
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {recipe.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSave(recipe.id)}
                        className="shrink-0"
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            savedRecipes.includes(recipe.id) 
                              ? 'fill-red-500 text-red-500' 
                              : ''
                          }`} 
                        />
                      </Button>
                    </div>

                    {/* 주요 성분 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recipe.mainIngredients.map((ingredient, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>

                    {/* 메타 정보 */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className={`px-2 py-1 rounded-md border ${
                        difficultyInfo[recipe.difficulty].color
                      }`}>
                        {difficultyInfo[recipe.difficulty].label}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {recipe.totalTime}분
                      </span>
                      <span className="text-muted-foreground">
                        {recipe.steps}단계
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{recipe.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({recipe.reviews})</span>
                      </div>
                      <span className="text-muted-foreground">
                        {recipe.saved}명이 저장
                      </span>
                    </div>
                  </div>

                  {/* 오른쪽: CTA */}
                  <div className="flex md:flex-col gap-2 md:justify-center">
                    <Button className="flex-1 md:flex-initial" asChild>
                      <Link href={`/recipes/${recipe.id}`}>
                        레시피 보기
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-initial">
                      빠른 미리보기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 더보기 */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            총 {recipesWithStats.length}개의 레시피를 제공하고 있어요
          </p>
          <Button variant="outline" size="lg">
            더 많은 레시피 보기
          </Button>
        </div>

        {/* 하단 CTA */}
        <Card className="mt-12 bg-muted/50">
          <CardContent className="pt-6 text-center">
            <h3 className="font-semibold mb-2">찾으시는 레시피가 없나요?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              커뮤니티에서 다른 사용자들의 루틴을 확인해보세요
            </p>
            <Button variant="outline" asChild>
              <Link href={`/community?concern=${concernId}`}>
                커뮤니티 둘러보기
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  )
}