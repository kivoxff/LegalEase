"use client";

import { useState } from "react";
import { Upload, Sparkles, Copy, Download, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { summarizeFile } from "@/services/summarizeService";
import { downloadDocument } from "@/services/downloadService";

export default function SummarizeSection() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [summaryType, setSummaryType] = useState("executive");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleSummarize = async () => {
    if (!uploadedFile) return;
    setIsSummarizing(true);
    setSummary(null);

    try {
      const result = await summarizeFile(
        uploadedFile,
        summaryLength,
        summaryType,
      );

      const formattedSummary = result
        .replace(/\\n/g, "\n") // convert line breaks
        .replace(/\\#/g, "#"); // convert escaped headings

      setSummary(formattedSummary);
    } catch (err) {
      alert("Failed to summarize: " + err.message);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleDownload = async (fileType = "pdf") => {
    if (!summary) return;

    try {
      await downloadDocument(summary, "Legal Summary", fileType);
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard
      .writeText(summary)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Failed to copy"));
  };

  return (
    <section
      id="summarize"
      className="max-w-6xl mx-auto px-6 mb-32 scroll-mt-24"
    >
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left: Configuration */}
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Summarize
            </h2>
            <p className="text-neutral-400 text-sm">
              Distill complex legal jargon into clear insights.
            </p>
          </div>

          {/* Minimalist Upload Area */}
          <label className="block w-full cursor-pointer group">
            <div className="border border-dashed border-neutral-700 bg-neutral-900/30 rounded-xl p-8 transition-colors group-hover:border-primary-500/50 group-hover:bg-neutral-900/80 text-center">
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="text-primary-400 mb-2" size={28} />
                  <span className="text-sm font-medium text-white">
                    {uploadedFile.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    Ready to summarize
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="text-neutral-500 mb-2" size={28} />
                  <span className="text-sm font-medium text-neutral-300">
                    Browse or drop file
                  </span>
                  <span className="text-xs text-neutral-500">
                    PDF, DOCX, TXT up to 50MB
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              onChange={(e) => setUploadedFile(e.target.files?.[0])}
              className="hidden"
            />
          </label>

          {/* Configuration Options using sleek Chips */}
          <div className="space-y-6">
            <div>
              <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Type
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "executive", label: "Executive" },
                  { id: "bullet", label: "Bullet Points" },
                  { id: "key_clauses", label: "Key Clauses" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSummaryType(type.id)}
                    className={`chip ${summaryType === type.id ? "chip-active" : ""}`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Length
              </span>
              <div className="flex flex-wrap gap-2">
                {["Short", "Medium", "Detailed"].map((len) => (
                  <button
                    key={len.toLowerCase()}
                    onClick={() => setSummaryLength(len.toLowerCase())}
                    className={`chip ${summaryLength === len.toLowerCase() ? "chip-active" : ""}`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSummarize}
            disabled={!uploadedFile || isSummarizing}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isSummarizing ? "Analyzing Document..." : "Generate Summary"}
          </button>
        </div>

        {/* Right: Output Canvas */}
        <div className="w-full md:w-1/2">
          <div className="card-base h-full min-h-125 flex flex-col relative">
            {/* Output Header */}
            <div className="border-b border-neutral-800 bg-neutral-900/80 px-6 py-4 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-300">
                Output
              </span>
              {summary && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => handleDownload("docx")}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Output Body */}
            <div className="p-6 flex-1 overflow-y-auto max-h-125 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900/50">
              {summary ? (
                <div className="prose prose-invert max-w-full">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {summary}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-neutral-600">
                  <Sparkles size={32} className="mb-3 opacity-20" />
                  <p className="text-sm">Your summary will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
