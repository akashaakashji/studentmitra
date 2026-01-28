document.addEventListener("DOMContentLoaded", () => {
  const filesDiv = document.getElementById("files");
  const pathText = document.getElementById("path");

  let historyStack = [];

  window.loadCategory = function (category) {
    historyStack = [];
    pathText.innerText = "📂 " + category.toUpperCase();
    fetchFiles(category, null);
  };

  function fetchFiles(category, folderId) {
    let url = `/api/drive/files?category=${category}`;
    if (folderId) url += `&folderId=${folderId}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data); // debug

        filesDiv.innerHTML = "";

        if (!Array.isArray(data)) {
          filesDiv.innerHTML = "<p>No data found</p>";
          return;
        }

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

        data.forEach(file => {
          const card = document.createElement("div");
          card.className = "file-card";

          if (file.mimeType === "application/vnd.google-apps.folder") {
            card.textContent = "📁 " + file.name;
            card.onclick = () => {
              historyStack.push(file.id);
              fetchFiles(category, file.id);
            };
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
        console.error("Frontend error:", err);
        filesDiv.innerHTML = "<p>Error loading files</p>";
      });
  }
});


