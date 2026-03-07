# React Native Mobile App Setup Guide

## Prerequisites

### For iOS Development
- macOS
- Xcode 14+
- CocoaPods
- Node.js 18+

### For Android Development
- Android Studio
- Android SDK
- Java Development Kit (JDK)
- Node.js 18+

## Installation

1. **Install React Native CLI** (optional - can use npx instead):
   ```bash
   # Option 1: Install globally (if you want react-native command available everywhere)
   npm install -g react-native-cli
   
   # Option 2: Skip this - use npx react-native instead (no global install needed)
   # npx will use the local version from node_modules
   ```

2. **Navigate to mobile directory**:
   ```bash
   cd frontend-mobile
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **For iOS**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

5. **Start Metro bundler**:
   ```bash
   npm start
   ```

6. **Run on iOS** (in another terminal):
   ```bash
   npm run ios
   ```

7. **Run on Android** (in another terminal):
   ```bash
   npm run android
   ```

## Configuration

### API URL

Update the API URL in `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3001/api/v1';
```

For physical devices, use your computer's IP address:
```typescript
const API_BASE_URL = 'http://192.168.1.100:3001/api/v1';
```

### Android Network Security

For Android, you may need to allow HTTP traffic. Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<application
    android:usesCleartextTraffic="true"
    ...>
```

## Project Structure

```
frontend-mobile/
├── src/
│   ├── screens/        # Screen components
│   ├── components/     # Reusable components
│   ├── services/      # API services
│   ├── contexts/      # React contexts
│   └── App.tsx        # Main app component
├── ios/               # iOS native code
├── android/           # Android native code
└── package.json
```

## Features

- Home screen with date selection
- Boat listing and search
- Boat detail view
- Experience selection
- Booking flow
- User authentication
- Profile and booking history

## Building for Production

### iOS
```bash
cd ios
xcodebuild -workspace BOAT.xcworkspace -scheme BOAT -configuration Release
```

### Android
```bash
cd android
./gradlew assembleRelease
```

