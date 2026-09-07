# Magic Hat Adventures

## Episode: Where’s the Treasure?

國小四年級英語探索 RPG。使用官方 Pirate Ship 地圖與角色；操控穿校服的小朋友，與 Magic Hat Girl 一起找回八顆寶石、拼回地圖，再完成最終尋寶。

### 本機開啟

1. 將 ZIP **全部解壓縮**到同一資料夾。
2. 使用任何靜態網頁伺服器開啟專案。若電腦已安裝 Python 3，在包含 `index.html` 的資料夾開啟終端機，執行：

   ```sh
   python -m http.server 8000
   ```

3. 用 Chrome、Edge 或 Safari 前往 `http://localhost:8000`。

遊戲本身不需要 Node、Python、套件安裝、登入、資料庫或後端；Python 只是一種本機預覽方式。請使用 `http://` 或 `https://` 開啟，避免直接雙擊 `index.html` 的 `file://` 模式，因為瀏覽器可能限制 Canvas 讀取圖片。正式放上 GitHub Pages 後，學生只需要開啟網址。

### 上傳 GitHub Pages

1. 建立或選擇 GitHub 儲存庫。
2. 將解壓後的**內容**上傳至儲存庫根目錄，讓 `index.html` 位於最外層，與 `assets/`、`css/`、`js/` 並列。不要只上傳 ZIP，也不要多包一層資料夾。
3. 儲存庫 **Settings → Pages → Build and deployment → Source** 選擇 **Deploy from a branch**。
4. 選擇存放檔案的分支，例如 `main`，資料夾選 `/ (root)`，按 **Save**。
5. 等候發布完成，開啟 Pages 顯示的網址。網站位於儲存庫子路徑也可正常載入，因為資源使用相對路徑。

以上設定依據 [GitHub 官方 Pages 文件](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。本交付包未替您建立儲存庫，也未發布至線上。

### 操作

| 動作 | 電腦 | 平板／觸控白板 |
|---|---|---|
| 移動 | WASD 或方向鍵 | 左下方向按鈕 |
| 對話／開箱／查看桌上地圖 | 靠近後按 E 或空白鍵 | 靠近後按右下 TALK／OPEN／VIEW MAP |
| 查看收集進度 | 上方 GEMS／MAP 按鈕 | 點選上方 GEMS／MAP 按鈕 |
| 移動寶石 | 按住拖曳 | 手指按住拖曳；也可先點寶石，再點位置 |
| 離開題目或地圖 | × 或 Esc | × |
| 聲音 | Sound 按鈕 | Sound 按鈕 |
| 重新開始 | Restart → 確認 | Restart → 確認 |

建議使用電腦或**橫向平板**。主要畫面不需要捲動；視窗特別小時，題目面板可在內部捲動。NPC 只在靠近時顯示姓名和互動提示。

### 課堂玩法

1. 看完 Magic Hat 開場，按 MISSION START。
2. 在船上找船員。任務不強制固定順序，點選上方 PLAY ORDER 查看由簡單到困難的圖片路線：First Mate → Parrot → Red → Blue → Green → Yellow → Purple → Orange → Captain。
3. 每次挑戰完成後，**只會解鎖寶箱**；走到船右下方金色寶藏室，找到對應編號，再按 OPEN。
4. 每個寶箱只會發放一次寶石與地圖碎片。上方地圖按鈕可查看收集進度。
5. 收齊 8 顆寶石後，返回左上方船長室找 Captain，完成最後一題。

| 船員 | 題型 | 題數 | 寶箱／寶石 |
|---|---|---:|---|
| Parrot | 辨認 in／on／under／by | 3 | 1 · Ruby |
| First Mate | 看圖辨認物品 | 4 | 2 · Sapphire |
| Red Sailor | 選介系詞 | 3 | 3 · Emerald |
| Blue Sailor | 選物品名稱 | 3 | 4 · Topaz |
| Green Sailor | 聽句子選場景 | 3 | 5 · Amethyst |
| Yellow Sailor | 拖曳寶石到指定位置 | 3 | 6 · Aquamarine |
| Purple Sailor | 排列單字組句 | 3 | 7 · Rose Quartz |
| Orange Sailor | 選介系詞與名詞 | 5 | 8 · Diamond |

共 27 題船員練習，加 1 題最終任務。題目從合理的位置組合隨機抽取；答錯不限重試，不扣分。最終題在作答前不顯示句型填空。已完成的船員可重複練習，但不能重複領獎。

### 存檔

進度儲存在此瀏覽器、此網站的 `localStorage`，鍵名為 `magic-hat-treasure-v1`。完成挑戰、開箱、移動、聲音切換及離開頁面時會儲存；重新整理後繼續探索。不同電腦、不同瀏覽器、不同網站來源不共用存檔。未完成的單一挑戰會重新開始，已完成任務不受影響。清除網站資料也會清除遊戲進度。

Restart 和 PLAY AGAIN 都要求確認；取消不會清除進度。若瀏覽器禁止儲存，畫面底部會顯示無法存檔提示。

### 聽力

第一版使用瀏覽器 `speechSynthesis`，設定英文、較慢語速。可按 LISTEN AGAIN 重聽。英文語音品質及可用性由作業系統與瀏覽器決定；部分裝置需先安裝英文語音。無法播放時可用 Show words 改成閱讀練習，該模式不應視為純聽力測驗。

日後放入錄製 MP3 時，在 `js/game.js` 的 `audioFiles` 物件設定句子對應：

```js
const audioFiles = {
  "It's under the table.": "assets/audio/under-table.mp3"
};
```

有對應檔就優先播放 MP3，沒有則使用瀏覽器語音。

### 專案結構

```text
index.html
.nojekyll
assets/
  characters/    官方人物、鸚鵡、全體素材圖
  objects/       六種物品、閉合寶箱、八種寶石寶箱、最終寶藏
  maps/          官方船艦地圖與藏寶圖
  audio/         預留錄音位置
css/game.css     版面、對話、題目與觸控控制
js/data.js       NPC 座標、碰撞、題型、合理位置組合
js/state.js      集中狀態、存檔、獎勵規則
js/assets.js     素材載入與僅在顯示時使用的遮罩／裁切
js/game.js       世界、移動、跟隨、任務、拖曳、劇情
tests/          狀態測試與瀏覽器測試結果
ASSET_INVENTORY.md
IMPLEMENTATION_REPORT.md
```

若有 Node.js，可執行 `node tests/state.test.cjs` 檢查狀態與獎勵規則。遊戲執行本身沒有套件依賴。所有原始美術檔維持原檔內容；顯示上的必要處理詳見素材清單。

### 建議通關順序提示

首次按 MISSION START 後會顯示一次圖片路線；探索時可隨時按 PLAY ORDER 再看。以原角色圖與箭頭呈現，黃色框標示下一步，已領到寶石的步驟顯示勾選。若已完成練習但尚未開箱，會提醒寶箱編號。路線的步驟編號與原寶箱編號不同，原有解鎖與獎勵對應保持不變。
