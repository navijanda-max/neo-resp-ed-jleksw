
# Running Your App as a Web Application

Your Natively app is fully configured to run as a web application! Here's everything you need to know:

## 🚀 Quick Start

### Development Mode

To run your app in the browser during development:

```bash
npm run web
```

Or with Expo CLI:

```bash
npx expo start --web
```

This will:
- Start the Metro bundler
- Open your app in the default browser at `http://localhost:8081`
- Enable hot reloading for instant updates

### Production Build

To create a production-ready web build:

```bash
npm run build:web
```

This will:
- Create an optimized production build in the `dist` folder
- Generate a service worker for offline support
- Minify and bundle all assets

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build your app:
   ```bash
   npm run build:web
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir dist
   ```

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Build your app:
   ```bash
   npm run build:web
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

### Option 3: GitHub Pages

1. Build your app:
   ```bash
   npm run build:web
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:
   ```bash
   firebase init hosting
   ```

3. Build your app:
   ```bash
   npm run build:web
   ```

4. Deploy:
   ```bash
   firebase deploy
   ```

## ✨ Web-Specific Features

Your app includes several web optimizations:

### Progressive Web App (PWA)
- **Installable**: Users can install your app on their desktop/mobile
- **Offline Support**: Service worker caches assets for offline use
- **App-like Experience**: Runs in standalone mode without browser UI

### Responsive Design
- Adapts to different screen sizes
- Touch and mouse input support
- Keyboard navigation

### Performance Optimizations
- Code splitting for faster initial load
- Asset optimization and compression
- Lazy loading of routes

## 🔧 Configuration

### Web-Specific Settings

Your `app.json` includes web configuration:

```json
{
  "web": {
    "favicon": "./assets/images/final_quest_240x240.png",
    "bundler": "metro"
  }
}
```

### Custom HTML

The web build uses `web/index.html` which includes:
- Meta tags for SEO
- PWA manifest
- Custom splash screen
- Optimized loading experience

### Manifest File

The `web/manifest.json` defines your PWA settings:
- App name and description
- Icons for different sizes
- Theme colors
- Display mode

## 📱 Platform Differences

Some features work differently on web:

### Native Modules
- **expo-haptics**: No haptic feedback on web (gracefully ignored)
- **expo-blur**: Uses CSS backdrop-filter instead of native blur
- **SafeAreaView**: Uses CSS safe-area-inset on web

### Navigation
- Uses browser history API
- Back button works with browser back
- Deep linking via URL paths

### Styling
- CSS properties like `boxShadow` work better than React Native shadow props
- `backdropFilter` for blur effects
- Responsive units (vw, vh) available

## 🐛 Troubleshooting

### Port Already in Use

If port 8081 is busy:
```bash
npx expo start --web --port 8082
```

### Build Errors

Clear cache and rebuild:
```bash
npx expo start --web --clear
```

### Module Not Found

Ensure all dependencies are installed:
```bash
npm install
```

### Blank Screen

Check browser console for errors:
1. Open DevTools (F12)
2. Check Console tab
3. Look for error messages

## 🎨 Customization

### Change Theme Colors

Edit `styles/commonStyles.ts`:
```typescript
export const colors = {
  primary: '#007AFF',
  background: '#000000',
  // ... other colors
};
```

### Modify Web HTML

Edit `web/index.html` to customize:
- Meta tags
- Favicon
- Loading screen
- Analytics scripts

### Update PWA Settings

Edit `web/manifest.json` to change:
- App name
- Icons
- Theme colors
- Display mode

## 📊 Analytics

To add analytics, edit `web/index.html` and add your tracking code:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security

For production deployments:

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Use `.env` files for sensitive data
3. **CSP Headers**: Configure Content Security Policy
4. **CORS**: Set up proper CORS headers if using APIs

## 📚 Additional Resources

- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## 💡 Tips

1. **Test on Multiple Browsers**: Chrome, Firefox, Safari, Edge
2. **Mobile Testing**: Use browser DevTools device emulation
3. **Performance**: Use Lighthouse to audit performance
4. **Accessibility**: Test with screen readers and keyboard navigation
5. **SEO**: Add proper meta tags and structured data

---

Your app is now ready to run on the web! 🎉

For any issues or questions, check the Expo documentation or open an issue on GitHub.
