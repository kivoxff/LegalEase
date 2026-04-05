'use client'

import { ArrowRight, Sparkles, Wand2, RefreshCcw, FileSearch } from 'lucide-react'

export default function HeroSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
      
      {/* Background ambient light for the hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-75 bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center mb-16">
        
        {/* Animated AI Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-700/50 rounded-full mb-8 backdrop-blur-md shadow-xl hover:bg-neutral-800/50 transition-colors cursor-default">
          <Sparkles size={16} className="text-primary-400 animate-pulse" />
          <span className="text-xs font-semibold text-neutral-300 tracking-wide">
            Introducing LegalEase
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-8 tracking-tight text-white leading-[1.1]">
          Master Your <br className="hidden sm:block" />
          <span className="bg-linear-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent group-hover:via-primary-300 group-hover:to-primary-500 transition-all duration-500">
            Legal Documents
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Summarize complex contracts, draft professional agreements, and convert between formats—all in one secure platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('summarize')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-primary-600 hover:bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white transition-all active:scale-95 shadow-lg shadow-primary-500/25 group"
          >
            Start Summarizing
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => scrollToSection('create')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-neutral-900/50 hover:bg-neutral-800 border border-neutral-700/50 px-8 py-3.5 text-sm font-semibold text-neutral-300 transition-all active:scale-95 backdrop-blur-md group"
          >
            <Wand2 size={18} className="text-neutral-400 group-hover:text-primary-400 transition-colors" />
            Create Document
          </button>
        </div>
      </div>

      {/* Floating Faux-App Visual Element */}
      <div className="relative mx-auto max-w-5xl mt-20">
        <div className="absolute inset-0 bg-linear-to-b from-primary-500/10 to-transparent blur-3xl rounded-[3rem]"></div>
        
        {/* The "Glass Board" */}
        <div className="relative bg-neutral-900/40 border border-neutral-700/50 rounded-3xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
            <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
            <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Summarize Card */}
            <div className="bg-linear-to-br from-blue-900/20 to-neutral-800/40 border border-blue-500/30 rounded-2xl p-6 relative transition-transform hover:-translate-y-1 duration-300 shadow-lg shadow-blue-500/5">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20">
                <FileSearch className="text-blue-400" size={24} />
              </div>
              <h3 className="text-neutral-200 font-semibold mb-2">Summarize</h3>
              <div className="space-y-2 mt-4">
                <div className="h-2 bg-neutral-700/50 rounded-full w-full"></div>
                <div className="h-2 bg-neutral-700/50 rounded-full w-5/6"></div>
                <div className="h-2 bg-blue-500/80 rounded-full w-3/4 mt-4 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <div className="h-2 bg-blue-500/80 rounded-full w-1/2 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
              </div>
            </div>

            {/* 2. Create Card */}
            <div className="bg-linear-to-b from-primary-900/20 to-neutral-800/40 border border-primary-500/30 rounded-2xl p-6 relative transition-transform hover:-translate-y-1 duration-300 shadow-xl shadow-primary-500/10">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 border border-primary-500/20">
                <Wand2 className="text-primary-400" size={24} />
              </div>
              <h3 className="text-neutral-200 font-semibold mb-2">Create</h3>
              <p className="text-xs text-neutral-400 leading-relaxed bg-neutral-900/50 p-3 rounded-lg border border-neutral-700/50">
                "Draft a standard NDA for a freelance contractor..."
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-primary-400 font-medium">
                Generating <span className="flex gap-0.5"><span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span></span>
              </div>
            </div>

            {/* 3. Convert Card */}
            <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-2xl p-6 relative transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-neutral-700/50 rounded-xl flex items-center justify-center mb-4 border border-neutral-600/50">
                <RefreshCcw className="text-neutral-300" size={24} />
              </div>
              <h3 className="text-neutral-200 font-semibold mb-2">Convert</h3>
              <p className="text-xs text-neutral-500 mb-4">Secure, zero-loss formatting.</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-700 text-xs text-neutral-400 font-mono">DOCX</div>
                <ArrowRight size={14} className="text-neutral-600" />
                <div className="px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-700 text-xs text-emerald-400 font-mono shadow-[0_0_10px_rgba(16,185,129,0.1)]">PDF</div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </section>
  )
}