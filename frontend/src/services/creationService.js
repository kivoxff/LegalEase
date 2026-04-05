// src/services/creationService.js

// Generate a document using the backend AI endpoint
export async function generateDocument(title, content) {
  if (!title || !content) throw new Error("Title or content is empty");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);

  const response = await fetch("http://localhost:8000/api/generate-doc", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Document generation failed");
  }

  return response.json(); // { title, content }
}

// Download/export document (PDF or DOCX)
export async function downloadDocument(content, title = "Legal Summary", fileType = "pdf") {
  if (!content) throw new Error("No content to download");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("file_type", fileType);

  const response = await fetch("http://localhost:8000/api/download-doc", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Download failed");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title}.${fileType}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}