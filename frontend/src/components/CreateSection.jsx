'use client'

import { useState } from 'react'
import { Wand2, Sparkles, Download, Copy, Check, RefreshCw, FileText } from 'lucide-react'

export default function CreateSection() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [documentContent, setDocumentContent] = useState('')
  const [copied, setCopied] = useState(false)

  // AI Prompt Suggestions
  const suggestions = [
    "Standard Non-Disclosure Agreement (NDA)",
    "Freelance Web Design Contract",
    "Residential Property Lease",
    "Independent Contractor Agreement",
  ]

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setDocumentContent('') // Clear previous content

    // Simulate AI thinking and streaming generation
    setTimeout(() => {
      setIsGenerating(false)
      setDocumentContent(
        `NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement (the "Agreement") is entered into as of ${new Date().toLocaleDateString()} (the "Effective Date") by and between the undersigned parties.\n\n1. PURPOSE\nThe parties wish to explore a potential business opportunity of mutual interest. In connection with this opportunity, each party may disclose certain confidential technical and business information to the other party.\n\n2. CONFIDENTIAL INFORMATION\n"Confidential Information" means any information disclosed by either party to the other party, either directly or indirectly, in writing, orally, or by inspection of tangible objects.\n\n3. NON-DISCLOSURE\nEach party agrees not to use any Confidential Information of the other party for any purpose except to evaluate and engage in discussions concerning a potential business relationship between the parties.`
      )
    }, 2500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="create" className="max-w-4xl mx-auto px-6 mb-32 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Sparkles className="text-primary-400" size={28} />
          Create with AI
        </h2>
        <p className="text-neutral-400 text-sm">Describe what you need, and our AI will draft a legally sound starting point.</p>
      </div>

      <div className="space-y-8">
        
        {/* AI Prompt Area */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 to-blue-500/30 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-2 backdrop-blur-xl transition-all shadow-2xl">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Write a simple Non-Disclosure Agreement for a freelance software developer..."
              className="w-full bg-transparent text-neutral-200 placeholder-neutral-500 p-4 resize-none focus:outline-none min-h-[120px] text-lg leading-relaxed custom-scrollbar"
            />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 border-t border-neutral-800 mt-2">
              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(suggestion)}
                    className="text-xs bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full transition-colors border border-neutral-700/50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="shrink-0 flex items-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-primary-500/25 ml-auto"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Drafting...
                  </>
                ) : (
                  <>
                    <Wand2 size={18} />
                    Generate Draft
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* AI Output / Document Preview */}
        {documentContent && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                <FileText size={16} className="text-primary-400" />
                AI Generated Draft
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 text-neutral-300 text-sm transition-colors border border-neutral-800"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 text-neutral-300 text-sm transition-colors border border-neutral-800">
                  <Download size={14} />
                  Export PDF
                </button>
              </div>
            </div>

            {/* Dark Mode "Paper" */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden relative backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-blue-500 opacity-80"></div>
              <p className="text-neutral-300 font-display whitespace-pre-wrap leading-loose text-[15px] sm:text-base selection:bg-primary-500/30">
                {documentContent}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}