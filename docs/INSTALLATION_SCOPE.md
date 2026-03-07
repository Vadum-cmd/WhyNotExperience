# Installation Scope Guide

This document clarifies which commands install packages **globally** vs **locally** (project-specific).

## ✅ Commands that install LOCALLY (project-specific)

These commands install packages in the project directory and do NOT affect your system globally:

### Backend (Rails)
```bash
cd backend-rails
bundle install          # ✅ Installs gems locally in vendor/bundle (or system gems, but project-scoped)
rails db:create         # ✅ No installation, just runs command
rails db:migrate        # ✅ No installation, just runs command
rails db:seed           # ✅ No installation, just runs command
rails server            # ✅ No installation, just runs command
```

### Frontend Web (React)
```bash
cd frontend-web
npm install             # ✅ Installs packages locally in node_modules/
npm start               # ✅ No installation, just runs command
```

### Frontend Mobile (React Native)
```bash
cd frontend-mobile
npm install             # ✅ Installs packages locally in node_modules/
cd ios
pod install             # ✅ Installs CocoaPods dependencies locally in ios/Pods/
cd ..
npm run ios             # ✅ No installation, just runs command
npm run android         # ✅ No installation, just runs command
```

## ⚠️ Commands that install GLOBALLY (system-wide)

These commands install packages system-wide and affect your entire system:

### Prerequisites (one-time setup)
```bash
# Ruby (if not installed)
brew install ruby       # ⚠️ Installs Ruby globally (but this is a system requirement)

# Rails (optional - only if you want 'rails' command available everywhere)
gem install rails       # ⚠️ Installs Rails globally

# React Native CLI (optional - only if you want 'react-native' command everywhere)
npm install -g react-native-cli  # ⚠️ Installs globally
```

## 🎯 How to Avoid Global Installs

### For Rails
You don't need to install Rails globally! After `bundle install`, use:
```bash
bundle exec rails server
bundle exec rails db:create
# etc.
```

Or add to your Gemfile (already done):
```ruby
gem 'rails', '~> 8.0.0'
```
Then `bundle install` will install Rails locally for this project.

### For React Native
You don't need the CLI globally! Use `npx` instead:
```bash
npx react-native run-ios
npx react-native run-android
```

Or use the npm scripts (already configured):
```bash
npm run ios
npm run android
```

## Summary

**The main setup commands I provided install everything LOCALLY:**
- ✅ `bundle install` - local
- ✅ `npm install` - local  
- ✅ `pod install` - local

**Only prerequisites might need global installs:**
- ⚠️ Ruby (system requirement)
- ⚠️ Rails CLI (optional - can use bundle exec)
- ⚠️ React Native CLI (optional - can use npx)

## Verification

To verify where packages are installed:

```bash
# Check npm global packages
npm list -g --depth=0

# Check gem global location
gem env

# Check local node_modules
ls node_modules/        # In project directory

# Check local gems
bundle show             # Shows where gems are installed
```

