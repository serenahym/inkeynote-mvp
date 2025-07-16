import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, User } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">INKEYNOTE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/concerns" className="text-sm font-medium hover:text-primary">
              피부고민
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary">
              커뮤니티
            </Link>
            <Link href="/profile/diary" className="text-sm font-medium hover:text-primary">
              다이어리
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-primary">
              마이페이지
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/login">로그인</Link>
            </Button>
            <Button size="sm" asChild className="hidden md:inline-flex">
              <Link href="/signup">회원가입</Link>
            </Button>
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
