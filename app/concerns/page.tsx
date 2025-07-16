'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  ChevronRight,
  Star,
  Users,
  Sparkles,
  X,
  TrendingUp
} from 'lucide-react'

// 전체 고민 데이터
const concernCategories = {
  acne: {
    id: 'acne',
    name: '여드름',
    icon: '🔴',
    color: 'bg-red-50 hover:bg-red-100 data-[state=active]:bg-red-100',
    concerns: [
      { id: '1', name: '등드름', count: 324, tags: ['바디', '여름'] },
      { id: '2', name: '턱 여드름', count: 856, tags: ['호르몬', '성인'] },
      { id: '3', name: '이마 여드름', count: 643, tags: ['스트레스'] },
      { id: '4', name: '블랙헤드', count: 512, tags: ['모공', '코'] },
      { id: '5', name: '화이트헤드', count: 423, tags: ['피지'] },
      { id: '6', name: '성인 여드름', count: 789, tags: ['25+', '호르몬'] },
      { id: '7', name: '가슴 여드름', count: 234, tags: ['바디'] },
      { id: '8', name: '좁쌀 여드름', count: 567, tags: ['전체'] },
      { id: '9', name: '낭포성 여드름', count: 123, tags: ['심각', '병원'] },
      { id: '10', name: '여드름 자국', count: 890, tags: ['색소', '흉터'] }
    ]
  },
  dryness: {
    id: 'dryness',
    name: '건조함',
    icon: '💧',
    color: 'bg-blue-50 hover:bg-blue-100 data-[state=active]:bg-blue-100',
    concerns: [
      { id: '11', name: '극건성 피부', count: 678, tags: ['심각'] },
      { id: '12', name: '입가 건조', count: 234, tags: ['부분'] },
      { id: '13', name: '눈가 건조', count: 456, tags: ['부분', '주름'] },
      { id: '14', name: '각질', count: 789, tags: ['표면'] },
      { id: '15', name: '당김', count: 345, tags: ['세안후'] },
      { id: '16', name: '건조 주름', count: 432, tags: ['노화'] },
      { id: '17', name: '수분 부족', count: 654, tags: ['속건조'] },
      { id: '18', name: '갈라짐', count: 123, tags: ['심각'] },
      { id: '19', name: 'T존 건조', count: 234, tags: ['부분'] },
      { id: '20', name: '계절성 건조', count: 567, tags: ['환절기'] }
    ]
  },
  pigmentation: {
    id: 'pigmentation',
    name: '칙칙한 피부',
    icon: '☀️',
    color: 'bg-yellow-50 hover:bg-yellow-100 data-[state=active]:bg-yellow-100',
    concerns: [
      { id: '21', name: '기미', count: 567, tags: ['자외선', '노화'] },
      { id: '22', name: '잡티', count: 890, tags: ['색소'] },
      { id: '23', name: '다크서클', count: 1234, tags: ['눈가', '피로'] },
      { id: '24', name: '색소침착', count: 456, tags: ['염증후'] },
      { id: '25', name: '피부톤 불균형', count: 234, tags: ['전체'] },
      { id: '26', name: '주근깨', count: 345, tags: ['선천적'] },
      { id: '27', name: '멜라닌 과다', count: 123, tags: ['전체'] },
      { id: '28', name: '홍조 자국', count: 234, tags: ['염증후'] },
      { id: '29', name: '칙칙함', count: 789, tags: ['전체'] },
      { id: '30', name: '광채 부족', count: 456, tags: ['생기'] }
    ]
  },
  sensitivity: {
    id: 'sensitivity',
    name: '민감성',
    icon: '😣',
    color: 'bg-pink-50 hover:bg-pink-100 data-[state=active]:bg-pink-100',
    concerns: [
      { id: '31', name: '홍조', count: 432, tags: ['혈관'] },
      { id: '32', name: '가려움', count: 321, tags: ['알러지'] },
      { id: '33', name: '따가움', count: 234, tags: ['자극'] },
      { id: '34', name: '트러블', count: 567, tags: ['반응성'] },
      { id: '35', name: '알러지', count: 123, tags: ['성분'] },
      { id: '36', name: '열감', count: 234, tags: ['혈관'] },
      { id: '37', name: '건조 민감', count: 345, tags: ['복합'] },
      { id: '38', name: '자극', count: 456, tags: ['외부'] },
      { id: '39', name: '발진', count: 123, tags: ['알러지'] },
      { id: '40', name: '계절 민감', count: 234, tags: ['환절기'] }
    ]
  },
  aging: {
    id: 'aging',
    name: '노화',
    icon: '⏰',
    color: 'bg-purple-50 hover:bg-purple-100 data-[state=active]:bg-purple-100',
    concerns: [
      { id: '41', name: '주름', count: 789, tags: ['전체'] },
      { id: '42', name: '탄력 저하', count: 654, tags: ['처짐'] },
      { id: '43', name: '처짐', count: 543, tags: ['중력'] },
      { id: '44', name: '팔자주름', count: 876, tags: ['입가'] },
      { id: '45', name: '목주름', count: 432, tags: ['부분'] },
      { id: '46', name: '이마주름', count: 567, tags: ['표정'] },
      { id: '47', name: '눈가주름', count: 987, tags: ['부분'] },
      { id: '48', name: '모공 늘어짐', count: 345, tags: ['탄력'] },
      { id: '49', name: '볼륨 감소', count: 234, tags: ['지방'] },
      { id: '50', name: '피부 얇아짐', count: 123, tags: ['진피'] }
    ]
  },
  other: {
    id: 'other',
    name: '기타',
    icon: '✨',
    color: 'bg-gray-50 hover:bg-gray-100 data-[state=active]:bg-gray-100',
    concerns: [
      { id: '51', name: '모공', count: 1567, tags: ['피지', '탄력'] },
      { id: '52', name: '피지 과다', count: 876, tags: ['T존'] },
      { id: '53', name: 'T존 번들거림', count: 654, tags: ['복합성'] },
      { id: '54', name: '묵은 각질', count: 432, tags: ['재생'] },
      { id: '55', name: '피부결', count: 567, tags: ['거칠음'] },
      { id: '56', name: '수면 부족 피부', count: 345, tags: ['생활'] },
      { id: '57', name: '스트레스 피부', count: 789, tags: ['생활'] },
      { id: '58', name: '마스크 트러블', count: 234, tags: ['외부'] },
      { id: '59', name: '화장 들뜸', count: 456, tags: ['메이크업'] },
      { id: '60', name: '환절기 피부', count: 567, tags: ['계절'] }
    ]
  }
}

// 인기 레시피
const popularRecipes = [
  {
    id: '1',
    title: '레티놀 안티에이징 마스터',
    rating: 4.9,
    reviews: 567,
    icon: '🌟',
    category: 'aging',
    tags: ['주름', '탄력']
  },
  {
    id: '2',
    title: '7스킨 수분 폭탄 루틴',
    rating: 4.8,
    reviews: 432,
    icon: '💦',
    category: 'dryness',
    tags: ['극건성', '보습']
  },
  {
    id: '3',
    title: '멜라닌 타겟 미백 케어',
    rating: 4.7,
    reviews: 890,
    icon: '✨',
    category: 'pigmentation',
    tags: ['기미', '잡티']
  }
]

export default function ConcernsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 검색 및 필터링 로직
  const filteredConcerns = useMemo(() => {
    let allConcerns: any[] = []
    
    if (activeTab === 'all') {
      Object.values(concernCategories).forEach(category => {
        allConcerns = [...allConcerns, ...category.concerns.map(c => ({
          ...c,
          category: category.name,
          categoryId: category.id
        }))]
      })
    } else {
      const category = concernCategories[activeTab as keyof typeof concernCategories]
      if (category) {
        allConcerns = category.concerns.map(c => ({
          ...c,
          category: category.name,
          categoryId: category.id
        }))
      }
    }

    if (searchQuery) {
      allConcerns = allConcerns.filter(concern =>
        concern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concern.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedTags.length > 0) {
      allConcerns = allConcerns.filter(concern =>
        selectedTags.some(tag => concern.tags.includes(tag))
      )
    }

    return allConcerns
  }, [searchQuery, activeTab, selectedTags])

  // 모든 태그 추출
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    Object.values(concernCategories).forEach(category => {
      category.concerns.forEach(concern => {
        concern.tags.forEach(tag => tags.add(tag))
      })
    })
    return Array.from(tags).sort()
  }, [])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            오늘은 어떤 피부 고민이 있나요?
          </h1>
          <p className="text-muted-foreground mb-2">
            60개의 세분화된 고민 중에서 찾아보세요
          </p>
          <p className="text-sm text-muted-foreground">
            <Users className="inline h-4 w-4 mr-1" />
            총 {Object.values(concernCategories).reduce((acc, cat) => 
              acc + cat.concerns.reduce((sum, c) => sum + c.count, 0), 0
            ).toLocaleString()}명이 함께하고 있어요
          </p>
        </div>

        {/* 검색바 */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="고민을 검색해보세요 (예: 주름, 건조함, T존)"
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* 태그 필터 */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-sm text-muted-foreground">선택된 태그:</span>
              {selectedTags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags([])}
              >
                모두 지우기
              </Button>
            </div>
          )}
        </div>

        {/* 카테고리 탭 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 md:grid-cols-7 w-full max-w-4xl mx-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              전체
            </TabsTrigger>
            {Object.entries(concernCategories).map(([key, category]) => (
              <TabsTrigger
                key={key}
                value={key}
                className={category.color}
              >
                <span className="hidden md:inline">{category.name}</span>
                <span className="md:hidden">{category.icon}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 탭 컨텐츠 */}
          <TabsContent value={activeTab} className="mt-6">
            {filteredConcerns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  검색 결과가 없습니다
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedTags([])
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcerns.map((concern) => (
                  <Link
                    key={concern.id}
                    href={`/concerns/${concern.id}`}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-all cursor-pointer h-full">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{concern.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Badge variant="outline" className="text-xs">
                                {concern.category}
                              </Badge>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {concern.count}명
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground mt-1" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {concern.tags.map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault()
                                toggleTag(tag)
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* 인기 태그 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            인기 검색 태그
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 15).map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 인기 레시피 */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            지금 인기있는 레시피
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {popularRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{recipe.icon}</div>
                      <div>
                        <h3 className="font-semibold">{recipe.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{recipe.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            리뷰 {recipe.reviews}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {recipe.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline" size="sm" asChild>
                    <Link href={`/recipes/${recipe.id}`}>
                      레시피 보기 <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
