# 素材盤點與顯示處理

共檢查原始 ZIP 的 31 張圖片。30 張原圖用於遊戲並納入 assets；所有複製後的 PNG 經 SHA-256 比對，與提供的原檔逐位元相同。

沒有生成新人物、新船艦或替換美術，沒有用 emoji 代替角色。

## 必要的執行時處理

- 玩家、船長、副船長、鸚鵡、六位水手、閉合寶箱是 RGB，灰白棋盤格已烘焙在像素中。`assets.js` 在離屏 Canvas 使用外圍連通遮罩，並修補少量棋盤格孔洞；不改寫原 PNG。小尺寸顯示仍可能存在邊緣色暈。
- 藏寶圖與最終寶藏是 RGB 黑底，同樣只在顯示時遮除外圍黑色。
- 八張以寶石命名的 PNG 實際是「開啟寶箱＋寶石」合圖。開箱後直接使用該完整原圖；題目與收藏欄的單顆寶石從同一官方圖裁切並以色彩遮罩擷取，並非新畫的寶石。
- 沒有獨立的空開箱素材；八張既有寶石寶箱原圖就是永久開箱狀態，無需替代 placeholder。
- 原圖儲藏室北側沒有清楚門口。遊戲將同張官方船圖中的一小塊甲板地板裁切疊加到北側通道，讓通行位置可見；整張地圖原檔不變，沒有重新繪製房間。其他碰撞使用矩形與船身多邊形。
- 介系詞 `in` 圖題在既有箱子／袋子上加入小型剖視視窗，並讓原物品前緣遮住寶石下半部，用以表達「在裡面」。這是教學場景的合成顯示。
- 全員結尾使用官方 `Pirate 2.png`，重新命名為 `crew.png`。`Pirate 1.png` 是另一張角色／寶箱總覽，因此只盤點，不在世界中重複展示。
- 缺少錄製音檔：第一版以 Web Speech API 取代；MP3 目錄與句子映射已預留。

## 原始圖檔清單

| 來源 | 尺寸 | 模式 | 專案位置／用途 | 透明度備註 |
|---|---|---|---|---|
| `characters/captain.png` | 1254 × 1254 | RGB | `assets/characters/captain.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/first_mate.png` | 1254 × 1254 | RGB | `assets/characters/first_mate.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/magic_hat_girl.png` | 1086 × 1448 | RGBA | `assets/characters/magic_hat_girl.png` | 保留原有 alpha 透明度 |
| `characters/parrot.png` | 1254 × 1254 | RGB | `assets/characters/parrot.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/player.png` | 1086 × 1448 | RGB | `assets/characters/player.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/sailor_blue.png` | 1233 × 1276 | RGB | `assets/characters/sailor_blue.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/sailor_green.png` | 1233 × 1276 | RGB | `assets/characters/sailor_green.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/sailor_orange.png` | 1233 × 1276 | RGB | `assets/characters/sailor_orange.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/sailor_purple.png` | 1233 × 1276 | RGB | `assets/characters/sailor_purple.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/sailor_red.png` | 1233 × 1275 | RGB | `assets/characters/sailor_red.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `characters/sailor_yellow.png` | 1232 × 1277 | RGB | `assets/characters/sailor_yellow.png` | 灰白棋盤格已烘焙；遊戲執行時遮除外圍 |
| `maps/pirate_ship.png` | 1672 × 941 | RGB | `assets/maps/pirate_ship.png` | 官方世界背景；原圖完整保留 |
| `maps/treasure_map.png` | 1536 × 1024 | RGB | `assets/maps/treasure_map.png` | 黑色實底；執行時遮除外圍黑色 |
| `objects/01_chair.png` | 1104 × 1224 | RGBA | `assets/objects/chair.png` | 保留原有 alpha 透明度 |
| `objects/02_bag.png` | 984 × 1224 | RGBA | `assets/objects/bag.png` | 保留原有 alpha 透明度 |
| `objects/03_table.png` | 1344 × 864 | RGBA | `assets/objects/table.png` | 保留原有 alpha 透明度 |
| `objects/04_computer.png` | 1344 × 1224 | RGBA | `assets/objects/computer.png` | 保留原有 alpha 透明度 |
| `objects/05_box.png` | 1312 × 1232 | RGBA | `assets/objects/box.png` | 保留原有 alpha 透明度 |
| `objects/06_desk.png` | 1344 × 864 | RGBA | `assets/objects/desk.png` | 保留原有 alpha 透明度 |
| `objects/amethyst.png` | 1254 × 1254 | RGBA | `assets/objects/amethyst.png` | 保留原有 alpha 透明度 |
| `objects/aquamarine.png` | 1254 × 1254 | RGBA | `assets/objects/aquamarine.png` | 保留原有 alpha 透明度 |
| `objects/diamond.png` | 1254 × 1254 | RGBA | `assets/objects/diamond.png` | 保留原有 alpha 透明度 |
| `objects/emerald.png` | 1254 × 1254 | RGBA | `assets/objects/emerald.png` | 保留原有 alpha 透明度 |
| `objects/final_treasure.png` | 1295 × 1215 | RGB | `assets/objects/final_treasure.png` | 黑色實底；執行時遮除外圍黑色 |
| `objects/rose_quartz.png` | 1254 × 1254 | RGBA | `assets/objects/rose_quartz.png` | 保留原有 alpha 透明度 |
| `objects/ruby.png` | 1254 × 1254 | RGBA | `assets/objects/ruby.png` | 保留原有 alpha 透明度 |
| `objects/sapphire.png` | 1254 × 1254 | RGBA | `assets/objects/sapphire.png` | 保留原有 alpha 透明度 |
| `objects/topaz.png` | 1254 × 1254 | RGBA | `assets/objects/topaz.png` | 保留原有 alpha 透明度 |
| `objects/treasure_chest.png` | 1374 × 1145 | RGB | `assets/objects/treasure_chest.png` | 閉合寶箱；灰白棋盤格以執行時遮罩處理 |
| `Pirate 1.png` | 1536 × 1024 | RGB | `參考總覽，未重複放入遊戲` |  |
| `Pirate 2.png` | 1536 × 1024 | RGBA | `assets/characters/crew.png` | 保留原有 alpha 透明度 |
