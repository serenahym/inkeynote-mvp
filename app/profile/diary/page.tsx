'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trophy,
  TrendingUp,
  Droplets,
  Sun,
  Moon,
  Check,
  AlertCircle,
  Camera,
  Flame,
  Target,
  BarChart3,
  CalendarDays,
  Clock,
  Star
} from 'lucide-react'

// 임시 데이터
const mockLogs = [
  { date: new Date(2025, 6, 15), morningCompleted: true, eveningCompleted: true, skinCondition: 4, mood: 'good' },
  { date: new Date(2025, 6, 16), morningCompleted: true, eveningCompleted: false, skinCondition: 3, mood: 'normal' },
]

const recentActivities = [
  { id: 1, type: 'routine', title: 'BHA 블랙헤드 케어 루틴 완료', time: '오전 8:30', icon: Sun },
  { id: 2, type: 'photo', title: '피부 사진 기록', time: '오전 9:00', icon: Camera },
  { id: 3, type: 'note', title: '피부 상태 개선됨', time: '오후 2:30', icon: Check },
]

export default function DiaryPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startDay = monthStart.getDay()
  const previousMonthDays = Array(startDay).fill(null)

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1))
  }

  const getLogForDate = (date: Date) => {
    return mockLogs.find(log => isSameDay(log.date, date))
  }

  const monthlyStats = {
    totalDays: monthDays.length,
    completedDays: 10,
    perfectDays: 5,
    currentStreak: 7,
    longestStreak: 15,
    averageSkinCondition: 3.8
  }

  const completionRate = Math.round((monthlyStats.completedDays / monthlyStats.totalDays) * 100)

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background">
        {/* 헤더 섹션 */}
        <div className="bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">스킨케어 다이어리</h1>
                <p className="text-muted-foreground">매일의 루틴을 기록하고 피부 변화를 추적해보세요</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                오늘 기록하기
              </Button>
            </div>

            {/* 빠른 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Flame className="h-5 w-5 text-orange-500" />
                    </div>
                    <span className="text-2xl font-bold">{monthlyStats.currentStreak}일</span>
                  </div>
                  <p className="text-sm font-medium">현재 연속 기록</p>
                  <p className="text-xs text-muted-foreground mt-1">최고: {monthlyStats.longestStreak}일</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="text-2xl font-bold">{completionRate}%</span>
                  </div>
                  <p className="text-sm font-medium">이번 달 수행률</p>
                  <Progress value={completionRate} className="mt-2 h-1.5" />
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <span className="text-2xl font-bold">{monthlyStats.perfectDays}일</span>
                  </div>
                  <p className="text-sm font-medium">완벽한 날</p>
                  <p className="text-xs text-muted-foreground mt-1">아침/저녁 모두</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="text-2xl font-bold">{monthlyStats.averageSkinCondition}</span>
                  </div>
                  <p className="text-sm font-medium">평균 피부 상태</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`h-1.5 w-4 rounded-full ${
                        i <= Math.floor(monthlyStats.averageSkinCondition) 
                          ? 'bg-green-500' 
                          : 'bg-gray-200'
                      }`} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-xl mx-auto">
              <TabsTrigger value="overview">오버뷰</TabsTrigger>
              <TabsTrigger value="calendar">캘린더</TabsTrigger>
              <TabsTrigger value="photos">사진</TabsTrigger>
              <TabsTrigger value="insights">인사이트</TabsTrigger>
            </TabsList>

            {/* 오버뷰 탭 */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 오늘의 루틴 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        오늘의 루틴
                      </span>
                      <Badge variant="secondary">
                        {format(new Date(), 'M월 d일')}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900">
                      <div className="flex items-center gap-3">
                        <Sun className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium">아침 루틴</p>
                          <p className="text-sm text-muted-foreground">BHA 블랙헤드 케어</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        시작하기
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                      <div className="flex items-center gap-3">
                        <Moon className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">저녁 루틴</p>
                          <p className="text-sm text-muted-foreground">세라마이드 장벽 강화</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        시작하기
                      </Button>
                    </div>

                    <Button className="w-full" variant="secondary">
                      <Camera className="h-4 w-4 mr-2" />
                      오늘의 피부 사진 찍기
                    </Button>
                  </CardContent>
                </Card>

                {/* 최근 활동 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      최근 활동
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'routine' ? 'bg-green-100 dark:bg-green-900/30' :
                            activity.type === 'photo' ? 'bg-blue-100 dark:bg-blue-900/30' :
                            'bg-purple-100 dark:bg-purple-900/30'
                          }`}>
                            <activity.icon className={`h-5 w-5 ${
                              activity.type === 'routine' ? 'text-green-600' :
                              activity.type === 'photo' ? 'text-blue-600' :
                              'text-purple-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4">
                      모든 활동 보기
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* 주간 요약 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    이번 주 요약
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                      <div key={day} className="text-center">
                        <p className="text-xs text-muted-foreground mb-2">{day}</p>
                        <div className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center ${
                          idx < 5 ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30' : 
                          idx === 5 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30' :
                          'bg-muted'
                        }`}>
                          {idx < 5 && <Check className="h-4 w-4 text-green-600 mb-1" />}
                          {idx === 5 && <Sun className="h-4 w-4 text-yellow-600 mb-1" />}
                          <span className="text-xs font-medium">
                            {idx < 5 ? '완료' : idx === 5 ? '부분' : '-'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>주간 달성률</span>
                      <span className="font-medium">83%</span>
                    </div>
                    <Progress value={83} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 캘린더 탭 */}
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {format(currentDate, 'yyyy년 M월', { locale: ko })}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateMonth('prev')}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateMonth('next')}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {previousMonthDays.map((_, idx) => (
                      <div key={`empty-${idx}`} className="aspect-square" />
                    ))}
                    
                    {monthDays.map(day => {
                      const log = getLogForDate(day)
                      const isToday = isSameDay(day, new Date())
                      const isSelected = isSameDay(day, selectedDate)
                      
                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => setSelectedDate(day)}
                          className={`
                            aspect-square p-2 rounded-lg border transition-all
                            ${isToday ? 'border-primary ring-2 ring-primary/20' : 'border-border'}
                            ${isSelected ? 'bg-primary/10' : 'hover:bg-muted'}
                            ${log ? 'bg-gradient-to-br' : ''}
                            ${log?.morningCompleted && log?.eveningCompleted ? 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30' : ''}
                            ${log?.morningCompleted && !log?.eveningCompleted ? 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30' : ''}
                            ${!log?.morningCompleted && log?.eveningCompleted ? 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30' : ''}
                          `}
                        >
                          <div className="h-full flex flex-col items-center justify-between">
                            <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>
                              {format(day, 'd')}
                            </span>
                            {log && (
                              <div className="flex gap-0.5">
                                {log.morningCompleted && (
                                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                )}
                                {log.eveningCompleted && (
                                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-400" />
                      <span>아침</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-blue-400" />
                      <span>저녁</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-green-100 to-green-200" />
                      <span>모두 완료</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 사진 탭 */}
            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle>피부 변화 기록</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      아직 사진이 없습니다
                    </p>
                    <Button>
                      <Camera className="h-4 w-4 mr-2" />
                      첫 사진 촬영하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 인사이트 탭 */}
            <TabsContent value="insights">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      이번 달 성과
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy className="h-8 w-8 text-yellow-600" />
                        <div>
                          <p className="font-semibold text-lg">7일 연속 달성!</p>
                          <p className="text-sm text-muted-foreground">
                            일주일 동안 빠짐없이 루틴을 수행했어요
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">루틴 수행률</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">피부 상태 개선도</span>
                        <span className="text-sm font-medium text-green-600">+18%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>맞춤 추천</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">수분 크림 추가 권장</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            최근 건조함을 자주 기록하셨어요. 저녁 루틴에 수분 크림을 추가해보세요.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
