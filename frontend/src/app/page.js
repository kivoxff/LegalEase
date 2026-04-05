'use client'

import { Sparkles, FileText, Zap } from 'lucide-react'
import SummarizeSection from '@/components/SummarizeSection'
import CreateSection from '@/components/CreateSection'
import ConvertSection from '@/components/ConvertSection'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <HeroSection />

      {/* Summarize Section */}
      <SummarizeSection />

      {/* Create Section */}
      <CreateSection />

      {/* Convert Section */}
      <ConvertSection />
    </div>
  )
}
