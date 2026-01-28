import express from "express";
import axios from "axios";

const router = express.Router();

/* 🔽 YAHAN PASTE KARNA HAI */
const FOLDERS = {
  cse: "1KgLH2LJB2cukrcwq25AeQo7P_wPSWPSO",
  me: "1r79jeg6LwNQZB5AZ4xCB1KtGh50JBt4q",
  it: "1Q57HbKAl1PKdRiQxoC0096kcfDykORad",
  ee: "1GROyNAZ9V9lqa3RMEWfxUFZDN0labLaU",
  ece: "1cpiSR-TTB6iKyITUArQ9f4vTtbHWVhur",
  ce: "19DtWrlobjgX8qEB42iFqUNVMNfmx75o9"
};

/* 🔼 YAHAN TAK */

router.get("/files", async (req, res) => {
  try {
    const { category, folderId } = req.query;

    // 🔹 ROOT folder (branch)
    let parentFolder = FOLDERS[category];

    // 🔹 Sub-folder navigation
    if (folderId) {
      parentFolder = folderId;
    }

    if (!parentFolder) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const response = await axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        params: {
          q: `'${parentFolder}' in parents and trashed=false`,
          fields: "files(id,name,mimeType)",
          key: process.env.GOOGLE_API_KEY
        }
      }
    );

    res.json(response.data.files);
  } catch (error) {
    console.error("Drive API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

export default router;