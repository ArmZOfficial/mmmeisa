 🐰 mmmeisa - vtuber — Website Build Prompt

> เอกสารนี้ใช้เป็น **prompt/spec** สำหรับ AI coding agent (เช่น Claude Code) หรือ developer
> ในการสร้างเว็บไซต์ personal link-page แนะนำตัว VTuber ชื่อ **mmmeisa** ให้ครบตามที่ระบุด้านล่าง
> ธีมหลัก: **น่ารัก (kawaii) โทนสีชมพู** เคลื่อนไหวดึงดูดตั้งแต่แรกเห็น

---

## 1. ภาพรวมโปรเจกต์

- **ชื่อเว็บไซต์ / Title:** `mmmeisa - vtuber 🐰`
- **ประเภท:** เว็บ Personal / Link-in-bio หน้าเดียว (single landing page) สำหรับแนะนำตัว VTuber
- **กลุ่มเป้าหมาย:** แฟนคลับที่กดลิงก์เข้ามาจาก social media ต่างๆ → ต้อง "ว้าว" และน่ารักตั้งแต่วินาทีแรกที่เห็น
- **โทนอารมณ์ (mood reference):**
  - `example_theme.jpg` → โทน anime/Y2K profile page สีชมพูพาสเทล มีโบว์ หัวใจ ตัวละคร chibi, การจัดวางแบบ soft girl aesthetic
  - `example_theme_2.png` → โทน retro Windows/desktop kawaii (notepad, popup "I LOVE YOU", loading bar, gameboy สีชมพู) → ใช้เป็นแรงบันดาลใจสำหรับ **micro-UI elements / notification / popup** ให้มีกลิ่นอาย retro-cute
- ต้องมี **การเคลื่อนไหว (motion)** ทั่วเว็บแบบนุ่มนวล ไม่ใช่หน้านิ่งๆ — นี่คือจุดขายหลัก

---

## 2. Design System

### 2.1 Color Palette (อ้างอิงจาก Bg.png และ element ต่างๆ)
| การใช้งาน | สี (ประมาณ) |
|---|---|
| Primary Pink | `#F7A8C0` – `#F292B0` |
| Deep Accent Pink | `#E8698C` |
| Soft Background Pink | `#FDE6ED` |
| Glow / Neon Pink (สำหรับ hover, shadow) | `#FF6FA5` |
| Night sky navy (จากหน้าต่างใน Bg.png, ใช้เป็น accent/section คั่น) | `#1E2338` |
| White / Cream | `#FFF7FA` |

### 2.2 Typography
- ฟอนต์ไทย: **Mali** หรือ **Chonburi** (โค้งมน น่ารัก อ่านง่าย) จาก Google Fonts
- ฟอนต์อังกฤษ/ตัวเลข: **Baloo 2** หรือ **Poppins** (rounded, friendly)
- หัวเรื่องใหญ่ให้มี glow/shadow สีชมพูอ่อนๆ แบบ neon sign (อ้างอิงป้ายไฟหัวใจ/คลาวด์ใน Bg.png)

### 2.3 Layout Direction
- Hero section เต็มจอ ใช้ `Bg.png` เป็นพื้นหลัง (มีห้องสีชมพู, จอมอนิเตอร์, โซฟา, หน้าต่างเห็นเมือง) — ใส่ overlay gradient จางๆ ด้านล่างให้ตัวอักษรอ่านง่าย
- กึ่งกลาง/ค่อนบน: รูปโปรไฟล์ `Vtuber.png` (ตัวละคร ผมเทา หูกระต่าย โบว์ชมพู) ใส่กรอบวงกลมนุ่มๆ มี glow รอบขอบ
- ใต้ชื่อ: tagline สั้นๆ + ปุ่ม social 4 ปุ่ม
- Section เสริม (ถ้าต้องการ): "แนะนำตัว/About" โดยใช้ของประกอบโต๊ะ (`Keyboard_Day.png`, `Mouse_Day.png`, `Milk_Day.png`, `Books_Day.png`, `Plant_Pot_Day.png`) จัดวางเป็น floating props ลอยๆ รอบข้อความ เหมือนของวางบนโต๊ะสตรีมมิ่งในภาพ `Bg.png`

---

## 3. Asset Mapping (วิเคราะห์จากไฟล์ที่แนบ)

| ไฟล์ | ลักษณะภาพ | ใช้งานตรงไหน |
|---|---|---|
| `Bg.png` | ห้องสีชมพู มีโต๊ะคอม จอมอนิเตอร์ ป้ายนีออนหัวใจ/เมฆ พีซี โซฟา หน้าต่างเมืองยามค่ำ | พื้นหลังหลักของ Hero section |
| `Vtuber.png` | Avatar ตัวละคร VTuber (ผมเทา หูกระต่าย โบว์ชมพู) มีสติกเกอร์กระต่าย/หัวใจล้อมกรอบ | รูปโปรไฟล์หลัก + favicon (crop เฉพาะหน้า) |
| `element1.gif` | ตัวละครพิกเซลสไตล์ Kuromi พร้อมเครื่องหมายตกใจ | มุมจอ ลอยเบาๆ (idle bounce) |
| `element2.gif` | หัวใจพิกเซล | ใช้เป็น particle หัวใจลอยขึ้นทั่วจอ (ambient floating hearts) |
| `element3.gif` | โบว์พิกเซลสีชมพู | ตกแต่งข้าง title/ปุ่ม |
| `element4.gif` | อุ้งเท้าแมวพิกเซล | hover effect ปุ่ม / cursor accent |
| `element5.gif` | หัวใจในขวด/ชามมีประกาย | หน้า loading screen ตอนโหลดเว็บ |
| `element6.gif` | กระต่ายชมพูหูตกถือสตรอว์เบอร์รี | มุมล่างเป็น mascot ประจำเว็บ |
| `element7.gif` | บับเบิลข้อความมีหัวใจ | tooltip / ข้อความแจ้งเตือนเล็กๆ |
| `element8.gif` | กระต่ายแก้มแดงยกมือ | footer หรือ empty state / success state |
| `Books_Day.png`, `Keyboard_Day.png`, `Milk_Day.png`, `Mouse_Day.png`, `Plant_Pot_Day.png` | ของตกแต่งโต๊ะสตรีมมิ่งสไตล์เดียวกับ Bg.png | floating decorative props รอบ section "About" หรือขอบจอ (parallax เบาๆ) |
| `example_theme.jpg`, `example_theme_2.png` | Mood board เท่านั้น | **ไม่ใช้เป็นรูปจริงบนเว็บ** ใช้เป็นแรงบันดาลใจ layout/สไตล์ popup, notification, profile card |
| `cursor.gif` | ลูกอม/ไม้กายสิทธิ์สีชมพูพิกเซล มีประกายรอบๆ | **Custom cursor** แทน mouse pointer ปกติทั้งเว็บ (หน้าแรก) |

### Ambient Effects ที่ต้องมี
- **Dust/sparkle particles**: จุดกลิบเบา ล่องลอยช้าๆ ทั่วพื้นหลัง (opacity ต่ำ ~20-40%, ขนาดเล็ก, ใช้ canvas หรือ CSS particles)
- **Floating hearts**: หัวใจ (`element2.gif` หรือ SVG heart) ลอยขึ้นจากล่างขึ้นบนแบบสุ่มตำแหน่ง/ความเร็ว จางหายไปด้านบน
- ทุก gif element ควรมี **subtle idle animation** (ลอยขึ้นลงเบาๆ / หมุนนิดๆ) ไม่ใช่วางนิ่ง
- **Custom cursor**: ใช้ `cursor.gif` (ลูกอมชมพูมีประกาย) แทน mouse pointer เริ่มต้นทั้งหน้าเว็บ — ปลาย cursor (จุดคลิกจริง) ควรอยู่ที่ปลายไม้/มุมล่างของภาพให้คลิกแม่นยำ, บนมือถือ (ไม่มี cursor) ไม่ต้องทำอะไรเพิ่ม

---

## 4. หน้าเว็บ (Pages)

### 4.1 หน้าแรก (Public: `/`)
- Hero: `Vtuber.png` + ชื่อ `mmmeisa 🐰` + tagline + bio สั้น (ข้อมูลทั้งหมดดึงจาก database แก้ผ่าน admin ได้)
- **ปุ่ม Social — มีแค่ 4 ปุ่มเท่านั้น:**
  1. **X (Twitter)**
  2. **Twitch**
  3. **Discord**
  4. **EasyDonate**
  - ปุ่มทรงแคปซูล/วงกลม สีชมพู ใช้ icon แบรนด์จริงของแต่ละแพลตฟอร์ม
  - Hover: ขยายเบาๆ (scale) + glow shadow ชมพู + อาจมี `element4.gif` (อุ้งเท้า) โผล่ตอน hover
  - แต่ละปุ่มเปิด/ปิดการแสดงผล และแก้ URL ได้จากหน้า admin
- มุมขวาล่าง: **ปุ่มฟันเฟือง (⚙️) ทรงวงกลม** ลอยอยู่ตลอด กดแล้วไปหน้า `/admin` (มีระบบ login ป้องกันก่อนเข้าถึงจริง)
- Footer: mascot กระต่าย (`element8.gif`) + ข้อความลิขสิทธิ์เล็กๆ

### 4.2 หน้า Admin (`/admin`)
- ต้อง login ก่อน (username/password หรือ password เดียวก็พอ เนื่องจากมี admin คนเดียว)
- จัดการข้อมูลได้ทั้งหมดโดย **ไม่ต้องแก้โค้ด**:
  - โปรไฟล์: ชื่อที่แสดง, tagline, bio
  - รูปภาพ: avatar, background — มี **ปุ่มอัปโหลดรูป** (พร้อม preview รูปปัจจุบันก่อน/หลังอัปโหลด)
  - Social links: ช่องกรอก URL ของ X / Twitch / Discord / EasyDonate พร้อม toggle เปิด-ปิดปุ่มแต่ละอัน
- ปุ่ม **"⬅ กลับหน้าหลัก"** อยู่ตำแหน่งชัดเจน (มุมบนซ้าย)
- กด **Save/Update** แล้วต้องมี **notification สวยงามตามธีม** (popup/toast ทรงมนสีชมพู มีไอคอนหัวใจ/ประกาย เด้งเข้ามาแล้ว fade หายไปเอง ~3 วินาที) แสดงสถานะสำเร็จ/ผิดพลาด — ดีไซน์ให้กลิ่นอาย popup แบบ `example_theme_2.png` (เช่น popup "I LOVE YOU") แต่ปรับให้ดูทันสมัยขึ้น

---

## 5. Data Schema (ตัวอย่าง)

```json
{
  "profile": {
    "displayName": "mmmeisa",
    "tagline": "…",
    "bio": "…",
    "avatarUrl": "",
    "backgroundUrl": ""
  },
  "socials": [
    { "platform": "x", "url": "", "enabled": true },
    { "platform": "twitch", "url": "", "enabled": true },
    { "platform": "discord", "url": "", "enabled": true },
    { "platform": "easydonate", "url": "", "enabled": true }
  ]
}
```

---

## 6. Tech Stack & Deployment

- **Framework:** Next.js (App Router) — เข้ากับ Vercel ได้ดีที่สุด
- **Styling/Animation:** Tailwind CSS + Framer Motion (สำหรับ floating hearts / dust / hover bounce)
- **Database:** Vercel Postgres (Neon) หรือ Vercel KV — ข้อมูลมีโครงสร้างเล็ก (โปรไฟล์ + 4 ลิงก์) จึงใช้ **Vercel KV** ก็เพียงพอ แต่แนะนำ Postgres ถ้าจะขยาย feature ในอนาคต (เช่น gallery, blog)
- **Image storage:** Vercel Blob (สำหรับรูป avatar/background ที่อัปโหลดจากหน้า admin)
- **Auth (admin):** ระบบ login ง่ายๆ ด้วย password (เก็บ hash ใน env var) + session cookie
- **Deployment:** ต้อง deploy ขึ้น Vercel ได้ทันทีแบบไม่ต้องตั้งค่าซับซ้อน, มี `.env.example` ระบุ ENV ที่ต้องตั้ง (DB connection, Blob token, ADMIN_PASSWORD)
- **Audio assets:** ยังไม่มีไฟล์เพลง lofi และเสียงคลิกแนบมา — ต้องเตรียมไฟล์ `.mp3`/`.ogg` เพิ่ม (เพลง lofi ที่มีลิขสิทธิ์ถูกต้อง/royalty-free และเสียง soft pop สั้นๆ) วางไว้ที่ `/public/audio/` แล้ว reference ในโค้ด

---

## 7. Checklist สรุป (MVP)

- [ ] Hero section ใช้ `Bg.png` + `Vtuber.png`
- [ ] ปุ่ม social ครบ 4 ปุ่ม (X, Twitch, Discord, EasyDonate) พร้อม hover animation
- [ ] Floating hearts + dust particles ทั่วหน้า
- [ ] นำ element1-8.gif มาตกแต่งแบบมีการเคลื่อนไหว (ไม่วางนิ่ง)
- [ ] ปุ่มฟันเฟืองมุมขวาล่าง → ลิงก์ไปหน้า admin (ต้อง login)
- [ ] หน้า admin: แก้ไขโปรไฟล์ + อัปโหลดรูป (พร้อม preview) + จัดการ 4 ลิงก์ social
- [ ] ปุ่ม "กลับหน้าหลัก" ในหน้า admin
- [ ] Notification สวยงามตามธีมตอน save/update
- [ ] เชื่อมต่อ Vercel Database + Vercel Blob
- [ ] พร้อม deploy บน Vercel
- [ ] **Custom cursor** ใช้ `cursor.gif` แทน mouse pointer ปกติทั้งเว็บ
- [ ] **เสียงคลิกเบาๆ** (soft pop sound) ตอนกดปุ่ม social / ปุ่มต่างๆ
- [ ] **ปุ่มเพลง lofi พื้นหลัง** เปิด/ปิดได้ (โทนเดียวกับบรรยากาศห้องใน Bg.png) — เริ่มต้นเป็น "ปิด" ไว้ก่อน (กันปัญหา autoplay เสียงของเบราว์เซอร์) แล้วให้ผู้ใช้กดเปิดเอง
- [ ] **Loading screen** ตอนเปิดเว็บครั้งแรก ใช้ `element5.gif` (หัวใจในขวด) หมุน/เด้ง ระหว่างรอโหลด asset

---

## 8. ไอเดียเสริมที่แนะนำให้เพิ่ม (Optional / Nice-to-have)

- **OG image** (สำหรับตอนแชร์ลิงก์ไปที่อื่น) ออกแบบให้น่ารักเข้าธีม ไม่ใช่ default
- **Favicon** ครอปจาก `Vtuber.png`
- Toggle ความหนาแน่นของ dust/particle ได้จากหน้า admin (เผื่ออยากปรับลด/เพิ่ม)
- ปุ่ม mute/unmute เพลง lofi แบบลอยมุมจอ ให้กดเข้าถึงง่ายตลอดเวลา

---

## 9. คำถามที่ควรตัดสินใจก่อนเริ่มพัฒนา

1. Auth หน้า admin: ใช้ password เดียวพอ หรืออยากมี username ด้วย?
= password พอ
2. EasyDonate ต้องการใช้โลโก้ทางการของแพลตฟอร์ม หรือให้ออกแบบไอคอนเองให้เข้าธีมชมพู?
= ใช้ logo ทางการเลย
3. อยากได้ favicon/OG image เตรียมไว้เลยไหม หรือให้ทีมพัฒนาออกแบบเพิ่ม?
= เตรียมไว้เลย
4. ต้องการ section "About/แนะนำตัว" แยกเพิ่มจาก Hero หรือให้ทุกอย่างอยู่ในหน้าเดียวจบ?
= ก็อยากได้แยก
5. มีโดเมนที่จะใช้ deploy แล้วหรือยัง (เพื่อเตรียม config บน Vercel)?
= deploy บน vercel
6. อยากได้ให้เว็ป ดูมีลูกเล่นเล่นไม่ได้ทื่่อเกินไปไม่ได้อยากให้ดูว่าเป็น ai ออกแบบ 
ดู เว็ป https://softcreamzx.vercel.app/ เป็นอ้างอิงเฉยๆ ว่าสวยงาม น่ารักได้ตามนี้ หรือ ทำให้เข้าตาม theme ของ .md ผสมด้วยได้เลย
---

*จบเอกสาร — พร้อมใช้เป็น prompt ป้อนให้ AI coding agent หรือ developer เพื่อเริ่มสร้างเว็บไซต์ได้ทันที*