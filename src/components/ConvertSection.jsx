'use client'

import { useState } from 'react'
import { Upload, Zap, Download, Copy, Check, Trash2, Settings, ArrowRight, FileText, ChevronDown } from 'lucide-react'

export default function ConvertSection() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [outputFormat, setOutputFormat] = useState('pdf')
  const [isConverting, setIsConverting] = useState(false)
  const [conversionHistory, setConversionHistory] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [preserveFormatting, setPreserveFormatting] = useState(true)
  const [compressOutput, setCompressOutput] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) setUploadedFile(file)
  }

  const getFileExtension = (filename) => {
    return filename.split('.').pop()?.toUpperCase() || 'UNKNOWN'
  }

  const handleConvert = () => {
    if (!uploadedFile) {
      alert('Please upload a document first')
      return
    }

    setIsConverting(true)
    setTimeout(() => {
      const originalExt = getFileExtension(uploadedFile.name)
      const newDoc = {
        id: Date.now().toString(),
        name: uploadedFile.name.replace(/\.[^/.]+$/, ''),
        originalFormat: originalExt,
        convertedFormat: outputFormat.toUpperCase(),
        date: new Date().toLocaleDateString(),
        size: `${Math.floor(Math.random() * 150) + 50} KB`,
      }
      setConversionHistory([newDoc, ...conversionHistory])
      setIsConverting(false)
    }, 2000)
  }

  const handleDeleteConversion = (id) => {
    setConversionHistory(conversionHistory.filter(doc => doc.id !== id))
  }

  const supportedFormats = [
    { value: 'pdf', label: 'PDF', icon: '📕' },
    { value: 'docx', label: 'DOCX', icon: '📘' },
    { value: 'txt', label: 'TXT', icon: '📄' },
    { value: 'rtf', label: 'RTF', icon: '📗' },
  ]

  return (
    <section id="convert" className="max-w-6xl mx-auto px-6 mb-32 scroll-mt-24">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        
        {/* Left: Configuration */}
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">Convert Documents</h2>
            <p className="text-neutral-400 text-sm">Transform files securely with zero quality loss.</p>
          </div>

          {/* Minimalist Upload Area */}
          <label className="block w-full cursor-pointer group">
            <div className="border border-dashed border-neutral-700 bg-neutral-900/30 rounded-xl p-8 transition-colors group-hover:border-primary-500/50 group-hover:bg-neutral-900/80 text-center">
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="text-primary-400 mb-2" size={28} />
                  <span className="text-sm font-medium text-white">{uploadedFile.name}</span>
                  <span className="text-xs text-neutral-500">
                    {(uploadedFile.size / 1024).toFixed(1)} KB • Ready to convert
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="text-neutral-500 mb-2" size={28} />
                  <span className="text-sm font-medium text-neutral-300">Browse or drop file</span>
                  <span className="text-xs text-neutral-500">Supports PDF, DOCX, TXT, RTF</span>
                </div>
              )}
            </div>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="space-y-6">
            {/* Format Selection Chips */}
            <div>
              <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Convert To</span>
              <div className="flex flex-wrap gap-2">
                {supportedFormats.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setOutputFormat(format.value)}
                    className={`chip ${outputFormat === format.value ? 'chip-active' : ''} flex items-center gap-2`}
                  >
                    <span>{format.icon}</span>
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Advanced Options */}
            <div className="border-t border-neutral-800 pt-4">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <Settings size={16} />
                <span>Advanced Settings</span>
                <ChevronDown size={14} className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={preserveFormatting}
                        onChange={(e) => setPreserveFormatting(e.target.checked)}
                        className="peer appearance-none w-4 h-4 border border-neutral-600 rounded bg-neutral-900 checked:bg-primary-500 checked:border-primary-500 transition-colors"
                      />
                      <Check size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Preserve exact formatting</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={compressOutput}
                        onChange={(e) => setCompressOutput(e.target.checked)}
                        className="peer appearance-none w-4 h-4 border border-neutral-600 rounded bg-neutral-900 checked:bg-primary-500 checked:border-primary-500 transition-colors"
                      />
                      <Check size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Compress output file size</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!uploadedFile || isConverting}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isConverting ? 'Processing...' : `Convert to ${outputFormat.toUpperCase()}`}
            {!isConverting && <ArrowRight size={18} />}
          </button>
        </div>

        {/* Right: History Console */}
        <div className="w-full md:w-1/2">
          <div className="card-base h-full min-h-[500px] flex flex-col relative">
            
            {/* Console Header */}
            <div className="border-b border-neutral-800 bg-neutral-900/80 px-6 py-4 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-300">Conversion History</span>
              {conversionHistory.length > 0 && (
                <span className="text-xs bg-primary-500/20 text-primary-300 px-2.5 py-1 rounded-full font-medium">
                  {conversionHistory.length} files
                </span>
              )}
            </div>

            {/* Console Body */}
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              {conversionHistory.length > 0 ? (
                <div className="space-y-2">
                  {conversionHistory.map((item, index) => (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between p-4 rounded-xl border border-neutral-800/50 bg-neutral-900/30 hover:bg-neutral-800/50 transition-colors"
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <p className="text-sm font-medium text-neutral-200 truncate">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] font-bold bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded">
                            {item.originalFormat}
                          </span>
                          <ArrowRight size={12} className="text-neutral-600" />
                          <span className="text-[10px] font-bold bg-primary-500/20 text-primary-300 px-2 py-0.5 rounded">
                            {item.convertedFormat}
                          </span>
                          <span className="text-[11px] text-neutral-600 ml-2">
                            {item.size}
                          </span>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.name)
                            setCopiedIndex(index)
                            setTimeout(() => setCopiedIndex(null), 2000)
                          }}
                          className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                          title="Copy Name"
                        >
                          {copiedIndex === index ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                        <button className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors" title="Download">
                          <Download size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteConversion(item.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-neutral-600">
                  <Zap size={32} className="mb-3 opacity-20" />
                  <p className="text-sm">No conversions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}