# Daman VIP Games - Mobile App

Android-first React Native Expo app with WebView wrapper and 2-day server-controlled expiry.

## Architecture

```
App Launch → Check Network → Verify Backend → Active / Expired / Offline
                                              ↓
                                         WebView (if active)
```

- **Backend** is the source of truth for expiry
- **Countdown** uses server `expiryTime` + clock offset from `serverTime`
- **Periodic checks** every 5 minutes + on foreground + WebView focus
- **Offline**: valid cached access allows continued use; expired cache blocks access

## Setup

```bash
cd daman-frontend
npm install
cp .env.example .env
```

Set your backend URL in `.env`:

```env
# Android emulator → host machine
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000

# Physical device on same WiFi → your PC LAN IP
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000

# Production
EXPO_PUBLIC_API_URL=https://api.yourdomain.com
```

Start backend first (see `daman-backend/README.md`), then:

```bash
npx expo start
```

Press `a` for Android emulator or scan QR for physical device.

## Development Build

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile development
```

## Production Build

```bash
eas build -p android --profile production
```

## Project Structure

```
src/
├── app/              Expo Router entry
├── components/       UI components
├── screens/          WebView & Expired screens
├── hooks/            useCountdown, useAppExpiry
├── services/         API & expiry cache
├── constants/        Config & URLs
├── types/            TypeScript interfaces
└── utils/            Date & device helpers
```

## Website URL

Hardcoded as required:
`https://damanvipgames.com/#/register?invitationCode=546523888661`

## Features

- WebView with JS, DOM storage, cookies, back navigation
- External link handling (tel, mailto, payment schemes)
- Loading & error screens with retry
- Expired modal on first expiry detection
- Android hardware back button support
- AppState background/foreground re-verification
- Camera/photo permissions for website uploads
