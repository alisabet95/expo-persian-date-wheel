# expo-persian-date-wheel / انتخابگر تاریخ و زمان چرخ‌مانند فارسی

[![npm version](https://badge.fury.io/js/expo-persian-date-wheel.svg)](https://www.npmjs.com/package/expo-persian-date-wheel)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A beautiful, customizable Persian/Jalali date wheel picker for React Native and Expo with multiple elegant themes.

یک انتخابگر تاریخ و زمان چرخ‌مانند فارسی زیبا و قابل تنظیم برای ری‌اکت نیتیو و اکسپو با چندین تم زیبا
با استفاده از moment-jalaali

---

## 📸 Screenshots / تصاویر

| Adeleh (Light) |
| (Screenshots/screenshot (3).jpg) (

| Atlas (Dark) |
| (Screenshots/screenshot (6).jpg) |

| Shadi (Dark) |
|(Screenshots/screenshot (1).jpg) |

| Esi (Light) |
|Screenshots/screenshot (4).jpg) |

---

## ✨ Features / ویژگی‌ها

**English:**

- 🎨 4 Beautiful themes (Adeleh, Atlas, Shadi, Esi)
- 📅 Full Persian/Jalali calendar support
- ⏰ Optional time picker (hour & minute)
- 🎯 Auto-scroll to selected values
- 🖌️ Custom font support (use any Persian font)
- 🔘 "Now" button to jump to current date/time
- 🔢 Persian numeral support (optional)
- 🚀 Lightweight with zero extra dependencies
- 📱 Works with Expo & React Native CLI

**فارسی:**

- 🎨 ۴ تم زیبا (Adeleh، Atlas، Shadi، Esi)
- 📅 پشتیبانی کامل از تقویم شمسی (جلالی)
- ⏰ انتخابگر زمان (ساعت و دقیقه)
- 🎯 اسکرول خودکار به مقدار انتخاب شده
- 🖌️ پشتیبانی از فونت‌های دلخواه
- 🔘 دکمه "اکنون" برای رفتن به زمان حال
- 🔢 پشتیبانی از اعداد فارسی
- 🚀 سبک و بدون وابستگی اضافی
- 📱 کار با Expo و React Native CLI

---

## 📦 Installation / نصب

**English:**

```bash
npm install expo-persian-date-wheel moment-jalaali
```

## 📚 Full Documentation

### How It Works

The picker uses `moment-jalaali` for Persian calendar conversion and provides a smooth wheel-style interface similar to iOS date pickers.

**Key Features Explained:**

1. **Auto-scroll** - Automatically scrolls to selected date/time when opened
2. **Persian Numbers** - Converts English numbers to Persian (optional)
3. **RTL Support** - Full right-to-left layout for Persian text
4. **Themes** - 4 built-in themes with light/dark options

### API Reference

#### PersianDateWheel Props

| Prop                | Type                          | Required | Default          | Description               |
| ------------------- | ----------------------------- | -------- | ---------------- | ------------------------- |
| `visible`           | `boolean`                     | ✅ Yes   | -                | Controls modal visibility |
| `onConfirm`         | `(timestamp: number) => void` | ✅ Yes   | -                | Called when user confirms |
| `onCancel`          | `() => void`                  | ✅ Yes   | -                | Called when user cancels  |
| `value`             | `number`                      | ❌ No    | `Date.now()`     | Initial timestamp         |
| `showTime`          | `boolean`                     | ❌ No    | `false`          | Show time picker          |
| `variant`           | `string`                      | ❌ No    | `'atlas'`        | Theme name                |
| `minYear`           | `number`                      | ❌ No    | `1320`           | Minimum selectable year   |
| `maxYear`           | `number`                      | ❌ No    | `1440`           | Maximum selectable year   |
| `title`             | `string`                      | ❌ No    | `'انتخاب تاریخ'` | Modal title               |
| `cancelText`        | `string`                      | ❌ No    | `'انصراف'`       | Cancel button text        |
| `confirmText`       | `string`                      | ❌ No    | `'تأیید'`        | Confirm button text       |
| `showNowButton`     | `boolean`                     | ❌ No    | `false`          | Show "Now" button         |
| `nowButtonText`     | `string`                      | ❌ No    | `'اکنون'`        | Custom "Now" button text  |
| `fontFamily`        | `string`                      | ❌ No    | `'System'`       | Custom font name          |
| `usePersianNumbers` | `boolean`                     | ❌ No    | `true`           | Use Persian numerals      |

### Understanding the Value

The picker returns a **JavaScript timestamp** (milliseconds since Unix epoch). You can convert it using moment-jalaali:

```tsx
import moment from "moment-jalaali";

// Convert timestamp to Persian date
const persianDate = moment(timestamp);
console.log(persianDate.format("jYYYY/jMM/jDD HH:mm"));
// Output: ۱۴۰۳/۰۴/۱۵ ۱۴:۳۰

// Convert to Gregorian if needed
const gregorian = new Date(timestamp);
console.log(gregorian.toLocaleDateString("en-US"));
```
