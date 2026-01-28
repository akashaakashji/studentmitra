function fetchFiles(category, folderId) {
  let url = `https://studentmitra-gamma.vercel.app/api/drive/files?category=${category}`;
  if (folderId) url += `&folderId=${folderId}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      filesDiv.innerHTML = "";
      pathText.innerText = "📂 " + category.toUpperCase();

      data.forEach(file => {
        const card = document.createElement("div");
        card.className = "file-card";

        if (file.mimeType === "application/vnd.google-apps.folder") {
          card.innerHTML = `📁 <strong>${file.name}</strong>`;
          card.onclick = () => fetchFiles(category, file.id);
        } else {
          card.innerHTML = `
            <iframe src="https://drive.google.com/file/d/${file.id}/preview"></iframe>
            <p>${file.name}</p>
          `;
        }

        filesDiv.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      pathText.innerText = "❌ Error loading files";
    });
}
