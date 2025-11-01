
# Getting Started with Your Web App

Welcome! Your NICU Respiratory Therapist Training app is ready to run on the web. Follow these simple steps:

## 🎯 Step 1: Run the App Locally

Open your terminal and run:

```bash
npm run web
```

This will:
- ✅ Start the development server
- ✅ Open your browser automatically
- ✅ Show your app at `http://localhost:8081`

**What you'll see:**
- Your app running in the browser
- All features working just like on mobile
- Hot reloading when you make changes

## 🖥️ Step 2: Test Your App

### Desktop Testing
1. Open the app in your browser
2. Try all the features:
   - Navigate between Home, Training, and Profile tabs
   - View training modules
   - Check your progress
   - View certifications

### Mobile Testing
1. Open browser DevTools (F12)
2. Click the device toolbar icon (or press Ctrl+Shift+M)
3. Select a mobile device (iPhone, Android)
4. Test touch interactions

### Different Browsers
Test in multiple browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if on Mac)

## 📱 Step 3: Install as PWA (Optional)

Your app can be installed like a native app!

### On Desktop (Chrome/Edge):
1. Look for the install icon in the address bar
2. Click "Install Natively"
3. The app opens in its own window
4. Access from your desktop/start menu

### On Mobile:
1. Open in Safari (iOS) or Chrome (Android)
2. Tap the share button
3. Select "Add to Home Screen"
4. The app appears on your home screen

## 🚀 Step 4: Deploy to Production

When you're ready to share your app:

### Quick Deploy with Netlify:

1. **Sign up** at [netlify.com](https://netlify.com)

2. **Build your app:**
   ```bash
   npm run build:web
   ```

3. **Deploy:**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir dist
     ```

4. **Get your URL:**
   - Netlify gives you a URL like `your-app.netlify.app`
   - Share this with anyone!

### Alternative: Vercel

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Build your app:**
   ```bash
   npm run build:web
   ```

3. **Deploy:**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

## 🎨 Customization

### Change App Name
Edit `web/manifest.json`:
```json
{
  "name": "Your Custom Name",
  "short_name": "Custom"
}
```

### Change Colors
Edit `styles/commonStyles.ts`:
```typescript
export const colors = {
  primary: '#007AFF',  // Change this
  accent: '#34C759',   // And this
  // ...
};
```

### Change Icon
Replace these files:
- `assets/images/natively-dark.png`
- `assets/images/final_quest_240x240.png`

## 🔍 Troubleshooting

### App Won't Start
```bash
# Clear cache and restart
npx expo start --web --clear
```

### Port Already in Use
```bash
# Use a different port
npx expo start --web --port 8082
```

### Blank Screen
1. Open browser console (F12)
2. Look for error messages
3. Check that all dependencies are installed:
   ```bash
   npm install
   ```

### Slow Performance
1. Build for production:
   ```bash
   npm run build:web
   ```
2. Serve the production build:
   ```bash
   npx serve dist
   ```

## 📊 Features Working on Web

✅ **Fully Supported:**
- Navigation (tabs, screens)
- Training modules
- Progress tracking
- Certifications
- Dark/Light mode
- Animations
- Touch/Click interactions

⚠️ **Limited Support:**
- Haptic feedback (no vibration on web)
- Native blur (uses CSS backdrop-filter)

## 💡 Pro Tips

1. **Keyboard Shortcuts:**
   - Tab: Navigate between elements
   - Enter: Activate buttons
   - Escape: Close modals

2. **Performance:**
   - Use production build for best performance
   - Enable caching for faster loads
   - Optimize images

3. **SEO:**
   - Edit meta tags in `web/index.html`
   - Add structured data
   - Create sitemap

4. **Analytics:**
   - Add Google Analytics to `web/index.html`
   - Track user interactions
   - Monitor performance

## 🎉 You're Ready!

Your app is now running on the web. Here's what you can do:

1. ✅ Run locally: `npm run web`
2. ✅ Test on different devices
3. ✅ Install as PWA
4. ✅ Deploy to production
5. ✅ Share with users

## 📚 Learn More

- [Expo Web Docs](https://docs.expo.dev/workflow/web/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [PWA Guide](https://web.dev/progressive-web-apps/)

---

Need help? Check the full documentation in `WEB_DEPLOYMENT.md`

Happy coding! 🚀
