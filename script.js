const filesDiv = document.getElementById("files");
const pathText = document.getElementById("path");

let historyStack = [];

// Load branch root
function loadCategory(category) {
  historyStack = [];
  pathText.innerText = "📂 " + category.toUpperCase();
  fetchFiles(category, null);
}

// Load folder contents
function fetchFiles(category, folderId) {
  // ⚠️ APNA VERCEL DOMAIN YAHAN DALO
  let url = `https://studentmitra-gamma.vercel.app/api/drive/files?category=${category}`;
  if (folderId) url += `&folderId=${folderId}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      filesDiv.innerHTML = "";

      // BACK BUTTON
      if (historyStack.length > 0) {
        const back = document.createElement("button");
        back.innerText = "⬅ Back";
        back.className = "back-btn";
        back.onclick = () => {
          historyStack.pop();
          const prev = historyStack[historyStack.length - 1];
          fetchFiles(category, prev || null);
        };
        filesDiv.appendChild(back);
      }

      if (!Array.isArray(data)) {
        pathText.innerText = "❌ Error loading files";
        return;
      }

      data.forEach(file => {
        const card = document.createElement("div");
        card.className = "file-card";

        // 📁 Folder
        if (file.mimeType === "application/vnd.google-apps.folder") {
          card.innerHTML = `📁 <strong>${file.name}</strong>`;
          card.onclick = () => {
            historyStack.push(file.id);
            fetchFiles(category, file.id);
          };
        }
        // 🖼 Image
        else if (file.mimeType.startsWith("image/")) {
          card.innerHTML = `
            <img src="https://drive.google.com/uc?id=${file.id}" />
            <p>${file.name}</p>
          `;
        }
        // 📄 PDF / Doc / Video
        else {
          card.innerHTML = `
            <iframe src="https://drive.google.com/file/d/${file.id}/preview"></iframe>
            <p>${file.name}</p>
          `;
        }

        filesDiv.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Frontend error:", err);
      pathText.innerText = "❌ Error loading files";
    });
}
