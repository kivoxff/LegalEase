"use client";

import { useState } from "react";
import {
  Wand2,
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
  FileText,
} from "lucide-react";
import { generateDocument } from "@/services/creationService";
import { downloadDocument } from "@/services/downloadService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CreateSection() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentContent, setDocumentContent] = useState("");
  const [copied, setCopied] = useState(false);

  // AI Prompt Suggestions with both title & prompt
  const suggestions = [
    {
      title: "Leave Application",
      prompt:
        "Write a formal leave application addressed to the manager requesting leave for 5 days due to personal reasons. Include polite language, dates of leave, and a request for approval.",
    },
    {
      title: "Job Offer Letter",
      prompt:
        "Create a professional job offer letter for a candidate selected as a Software Engineer. Include position, start date, salary, reporting manager, and welcome message.",
    },
    {
      title: "Complaint Letter",
      prompt:
        "Draft a formal complaint letter to the building management regarding repeated water leakage issues in the apartment. Mention previous complaints, request for urgent action, and a polite closing.",
    },
    {
      title: "Rental Agreement",
      prompt:
        "Write a simple rental agreement between a landlord and tenant. Include property details, rental amount, duration of lease, payment terms, and responsibilities of both parties.",
    },
    {
      title: "Event Invitation",
      prompt:
        "Draft a professional event invitation email for a corporate seminar. Include event name, date, time, venue, agenda, RSVP details, and a polite invitation to attend.",
    },
  ];

  const handleGenerate = async () => {
    if (!title.trim() || !prompt.trim()) {
      alert("Please provide both a title and a prompt.");
      return;
    }

    setIsGenerating(true);
    setDocumentContent("");

    try {
      const result = await generateDocument(title, prompt);
      const formattedContent = result.content.replace(/\n{2,}/g, "\n\n"); // max 1 empty line
      setDocumentContent(formattedContent);
    } catch (err) {
      console.error(err);
      alert("Failed to generate document: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (fileType = "pdf") => {
    if (!documentContent) return;

    try {
      await downloadDocument(
        documentContent,
        title || "Legal Document",
        fileType,
      );
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="create" className="max-w-4xl mx-auto px-6 mb-32 scroll-mt-24">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Sparkles className="text-primary-400" size={28} />
          Create with AI
        </h2>
        <p className="text-neutral-400 text-sm">
          Provide a title and description, and our AI will draft a legally sound
          document.
        </p>
      </div>

      <div className="space-y-6">
        {/* Title Input with Glow */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-primary-500/30 to-blue-500/30 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition duration-500"></div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document Title (e.g., NDA Agreement)"
            className="relative w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 p-4 rounded-2xl border border-neutral-800 focus:outline-none text-lg"
          />
        </div>

        {/* Prompt Input */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-primary-500/30 to-blue-500/30 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-2 backdrop-blur-xl transition-all shadow-2xl">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the content for your document..."
              className="w-full bg-transparent text-neutral-200 placeholder-neutral-500 p-4 resize-none focus:outline-none min-h-30 text-lg leading-relaxed custom-scrollbar"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 border-t border-neutral-800 mt-2">
              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTitle(suggestion.title);
                      setPrompt(suggestion.prompt);
                    }}
                    className="text-xs bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full transition-colors border border-neutral-700/50"
                  >
                    {suggestion.title}
                  </button>
                ))}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!title.trim() || !prompt.trim() || isGenerating}
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
                  {copied ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={() => handleDownload("docx")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 text-neutral-300 text-sm transition-colors border border-neutral-800"
                >
                  <Download size={14} />
                  Export PDF
                </button>
              </div>
            </div>

            {/* Dark Mode "Paper" with scroll + markdown */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 sm:p-12 shadow-2xl relative backdrop-blur-md max-h-125 overflow-y-auto custom-scrollbar">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary-500 to-blue-500 opacity-80"></div>

              {/* Markdown content with Tailwind Typography */}
              <div className="prose prose-invert max-w-full text-[15px] sm:text-base leading-loose selection:bg-primary-500/30">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {documentContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
