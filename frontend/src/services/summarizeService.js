// src/services/summarizeService.js

/**
 * Uploads a file to the backend and returns the summarized text.
 * @param {File} file - The file to summarize
 * @param {string} length - 'short', 'medium', 'detailed'
 * @param {string} type - 'executive', 'bullet', 'clauses'
 */
export async function summarizeFile(file, length = 'medium', type = 'bullet') {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("length", length);
  formData.append("s_type", type);

  try {
    const response = await fetch("http://localhost:8000/api/summarize", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to summarize");
    }

    const data = await response.json();
    return data.summary;
  } catch (err) {
    console.error("Summarization error:", err);
    throw err;
  }
}