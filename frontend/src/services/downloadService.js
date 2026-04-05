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
    throw new Error("Download failed");
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