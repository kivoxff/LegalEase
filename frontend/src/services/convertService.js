export async function convertFile(file, targetFormat) {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("target_format", targetFormat);

  const response = await fetch("http://localhost:8000/api/convert-doc", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.detail || "Conversion failed");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  return { blob, url, filename: `${file.name.split(".")[0]}.${targetFormat}` };
}