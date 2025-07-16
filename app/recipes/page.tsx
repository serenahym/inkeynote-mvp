'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Clock, 
  Star,
  Heart,
  Search,
  TrendingUp
} from 'lucide-react'

// 레시피 목록 데이터
const recipes = [
  {
    id: '1',
    title: '등드름 집중 케어 루틴',
    description: '등드름을 진정시키고 재발을 방지하는 3단계 레시피',
    concern: '등드름',
    category: 'acne',
    difficulty: 'beginner',
    time: 10,
    rating: 4.8,
    reviews: 324,
    saved: 1523,
    trending: true
  },
  {
    id: '2',
    title: '극건성 피부 수분 폭탄 루틴',
    description: '7스킨법을 활용한 극강의 보습 레시피',
    concern: '극건성',
    category: 'dryness',
    difficulty: 'intermediate',
    time: 15,
    rating: 4.9,
    reviews: 567,
    saved: 2341,
    trending: true
  },
  {
    id: '3',
    title: '다크서클 완화 아이케어',
    description: '눈가 혈액순환을 도와 다크서클을 개선하는 루틴',
    concern: '다크서클',
    category: 'pigmentation',
    difficulty: 'beginner',
    time: 5,
    rating: 4.6,
    reviews: 234,
    saved: 890,
    trending: false
  },
  {
    id: '4',
    title: '홍조 진정 SOS 루틴',
    description: '민감한 피부를 위한 순한 진정 레시피',
    concern: '홍조',
    category: 'sensitivity',
    difficulty: 'beginner',
    time: 8,
    rating: 4.7,
    reviews: 445,
    saved: 1678,
    trending: false
  }
]

// any 타입으로 변경하여 타입 에러 해결
const difficultyLabels: any = {
  beginner: { label: '초급', color: 'bg-green-100 text-green-800' },
  intermediate: { label: '중급', color: 'bg-yellow-100 text-yellow-800' },
  advanced: { label: '고급', color: 'bg-red-100 text-red-800' }
}

export default function RecipesPage() {
  const searchParams = useSearchParams()
  const concernId = searchParams.get('concern')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [filterDifficulty, setFilterDifficulty] = useState('all')

  // 필터링 로직 (실제로는 서버에서 처리)
  const filteredRecipes = recipes.filter(recipe => {
    if (searchQuery && !recipe.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (filterDifficulty !== 'all' && recipe.difficulty !== filterDifficulty) {
      return false
    }
    return true
  })

  return (
    <>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">스킨케어 레시피</h1>
          <p className="text-muted-foreground">
            전문가가 검증한 {recipes.length}개의 레시피를 만나보세요
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="레시피 검색..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">인기순</SelectItem>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="rating">평점순</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="난이도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 난이도</SelectItem>
              <SelectItem value="beginner">초급</SelectItem>
              <SelectItem value="intermediate">중급</SelectItem>
              <SelectItem value="advanced">고급</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 레시피 카드 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{recipe.concern}</Badge>
                  {recipe.trending && (
                    <Badge variant="default" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      인기
                    </Badge>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {recipe.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      difficultyLabels[recipe.difficulty].color
                    }`}>
                      {difficultyLabels[recipe.difficulty].label}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.time}분
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{recipe.saved}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({recipe.reviews})
                    </span>
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link href={`/recipes/${recipe.id}`}>
                    레시피 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 더보기 */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              검색 결과가 없습니다. 다른 키워드로 검색해보세요.
            </p>
          </div>
        ) : (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              더 많은 레시피 보기
            </Button>
          </div>
        )}
      </main>
    </>
  )
}
