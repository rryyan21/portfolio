# Color Guide - Where to Change Colors

## 🎨 Quick Color Reference

### Main Colors Used:

- **Primary Accent**: `#14b8a6` (Teal) - Used for text, glows, accents
- **Background**: `#0a0a0f` (Dark blue-black)
- **Secondary Background**: `#0f0f15` (Slightly lighter for cards)
- **Cyan Accent**: `rgba(6, 182, 212, ...)` - Used in glitch effects

---

## 📁 File Locations

### 1. **`src/app/globals.css`** - Main Color Definitions

#### Name Glow Colors (Lines 33-75):

```css
/* Broken/flickering name - CHANGE THESE */
.glitch-text {
  color: #14b8a6; /* ← Change this to your accent color */
  text-shadow: 0 0 5px rgba(20, 184, 166, 0.6), ...; /* ← Change rgba values */
}

/* Clean glow name - CHANGE THESE */
.glow-text {
  color: #14b8a6; /* ← Change this to your accent color */
  text-shadow: 0 0 10px rgba(20, 184, 166, 0.6), ...; /* ← Change rgba values */
}
```

#### Glitch Effect Colors (Lines 55-67):

```css
.glitch-text::before {
  text-shadow: -1px 0 rgba(6, 182, 212, 0.5); /* ← Cyan accent for glitch */
}

.glitch-text::after {
  text-shadow: 1px 0 rgba(20, 184, 166, 0.5); /* ← Teal accent for glitch */
}
```

#### Body Background (Line 23):

```css
body {
  background: #0a0a0f; /* ← Main background color */
}
```

---

### 2. **`src/components/InteractiveBackground.tsx`** - Background Colors

#### Main Background (Line 3):

```tsx
<div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">
```

#### Gradient Sky (Line 8):

```tsx
background: `linear-gradient(180deg, #0a0a0f 0%, #050508 50%, #0a0a0f 100%)`;
```

#### Grid Pattern (Lines 17-18):

```tsx
linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),  /* ← Teal grid */
linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)  /* ← Cyan grid */
```

#### Corner Glow (Line 28):

```tsx
background: "radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)";
```

---

### 3. **`src/app/layout.tsx`** - Body Background

#### Body Background (Line 25):

```tsx
<body className="font-sans bg-[#0a0a0f]">
```

---

### 4. **Component Files** - Use Tailwind Classes

All components use Tailwind's `teal-*` classes. To change colors globally, replace:

#### Search and Replace Patterns:

- `teal-400` → `your-color-400` (text colors)
- `teal-500` → `your-color-500` (borders, backgrounds)
- `bg-[#0a0a0f]` → `bg-[#your-hex]` (background colors)
- `bg-[#0f0f15]` → `bg-[#your-hex]` (card backgrounds)

#### Files to Update:

- `src/components/HeroSection.tsx` - Buttons, social links, profile ring
- `src/components/About.tsx` - Headings, icons, tags, timeline
- `src/components/ProjectCard.tsx` - Card borders, hover effects, tags
- `src/components/NavBar.tsx` - Logo, links, borders

---

## 🎯 Quick Color Change Tips

### To Change to a Different Accent Color:

1. **Pick your color** (e.g., `#8b5cf6` for purple, `#f59e0b` for amber)

2. **Convert to RGB** for rgba values:

   - `#14b8a6` = `rgb(20, 184, 166)`
   - Use online tool: https://www.rapidtables.com/convert/color/hex-to-rgb.html

3. **Update `globals.css`**:

   - Replace `#14b8a6` with your hex color
   - Replace `rgba(20, 184, 166, ...)` with your rgba values

4. **Update `InteractiveBackground.tsx`**:

   - Replace `rgba(20, 184, 166, ...)` with your rgba values

5. **Update components**:
   - Replace `teal-400` with `your-color-400`
   - Replace `teal-500` with `your-color-500`
   - Or use custom hex: `text-[#your-hex]`

---

## 📝 Example: Changing to Purple

### In `globals.css`:

```css
.glitch-text {
  color: #8b5cf6; /* Changed from #14b8a6 */
  text-shadow: 0 0 5px rgba(139, 92, 246, 0.6), ...;
}

.glow-text {
  color: #8b5cf6; /* Changed from #14b8a6 */
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.6), ...;
}
```

### In Components:

```tsx
// Change from:
className = "text-teal-400";

// To:
className = "text-purple-400";
// Or custom:
className = "text-[#8b5cf6]";
```

---

## 🎨 Popular Color Schemes

### Purple:

- Accent: `#8b5cf6` or `#a855f7`
- Background: `#0f0a1a` or `#1a0a2e`

### Amber/Orange:

- Accent: `#f59e0b` or `#fb923c`
- Background: `#0f0a0a` or `#1a0f0a`

### Blue:

- Accent: `#3b82f6` or `#60a5fa`
- Background: `#0a0f1a` or `#0f1419`

### Green:

- Accent: `#10b981` or `#34d399`
- Background: `#0a0f0a` or `#0f1410`
