# Base Shop - Smart Wallet Demo

A beautiful, modern e-commerce demo showcasing Base's Smart Wallet Profiles for seamless checkout experiences. Built with Next.js, Wagmi, and Tailwind CSS.

## ✨ Features

- 🛍️ **Modern E-commerce UI**: Clean, responsive design with smooth animations
- 🔐 **Smart Wallet Integration**: One-click checkout with Coinbase Smart Wallet
- 📋 **Profile Data Collection**: Collect customer information during checkout
- ✅ **Data Validation**: Server-side validation with custom business rules
- 🛡️ **Privacy First**: Transparent privacy policy and user consent
- 🎨 **Smooth Animations**: Polished UI with hover effects and transitions
- 📱 **Fully Responsive**: Perfect experience on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A Coinbase Smart Wallet (download from App Store/Google Play)
- Some USDC on Base Sepolia testnet

### Installation

1. **Clone and install:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Set up HTTPS for local development:**
   \`\`\`bash

   # Install ngrok globally

   npm install -g ngrok

   # In another terminal, create HTTPS tunnel

   ngrok http 3000
   \`\`\`

4. **Update callback URL in `app/page.tsx`:**
   \`\`\`typescript
   return "https://your-ngrok-url.ngrok-free.app/api/data-validation"
   \`\`\`

## 🛍️ Demo Experience

### Browse & Shop

- **Product Grid**: View 6 demo products with smooth hover effects
- **Product Cards**: Beautiful cards with images, descriptions, and pricing
- **Add to Cart**: One-click add to cart with visual feedback

### Shopping Cart

- **Slide-out Cart**: Smooth sidebar with cart contents
- **Quantity Management**: Increase/decrease quantities with smooth animations
- **Real-time Totals**: Live calculation of totals in USDC and USD

### Smart Wallet Checkout

- **Connect Wallet**: One-click connection to Coinbase Smart Wallet
- **Profile Collection**: Select which data to collect (email, name, address, phone)
- **Privacy Policy**: Clear, comprehensive privacy information
- **Payment Processing**: Seamless USDC payment on Base Sepolia
- **Order Confirmation**: Beautiful success page with collected data

## 🎨 UI/UX Highlights

### Design System

- **Gradient Backgrounds**: Subtle blue-to-indigo gradients
- **Smooth Animations**: Hover effects, scale transforms, and transitions
- **Consistent Spacing**: Well-aligned components with proper spacing
- **Typography Hierarchy**: Clear font sizes and weights
- **Color Consistency**: Blue/indigo theme throughout

### Interactive Elements

- **Hover Effects**: Cards lift and scale on hover
- **Button Animations**: Buttons scale slightly when hovered
- **Loading States**: Smooth loading animations during checkout
- **Visual Feedback**: Success/error states with appropriate colors

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Flexible Grid**: Responsive product grid (1-3 columns)
- **Touch Friendly**: Large touch targets for mobile
- **Readable Text**: Proper font sizes across devices

## 🛠️ Technical Architecture

### Frontend Stack

- **Next.js 14**: App Router with React Server Components
- **Wagmi**: Ethereum wallet integration
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **shadcn/ui**: High-quality UI components

### Smart Wallet Integration

- **Profile Data Requests**: Email, name, address, phone collection
- **Data Validation**: Custom server-side validation rules
- **USDC Payments**: ERC-20 transfers on Base Sepolia
- **Error Handling**: Comprehensive error states and messaging

### State Management

- **React Context**: Cart state management
- **useReducer**: Complex cart operations
- **Local State**: Component-level state for UI

## 🔧 Customization

### Adding Products

Edit `lib/products.ts` to add new demo products:

\`\`\`typescript
{
id: "7",
title: "New Product",
description: "Product description",
price: "0.05",
image: "/placeholder.svg?height=400&width=400",
type: "physical", // or "digital"
category: "Apparel",
}
\`\`\`

### Styling Changes

- **Colors**: Update `tailwind.config.ts` for theme colors
- **Components**: Modify components in `components/` directory
- **Layout**: Adjust spacing and layout in main page

### Validation Rules

Edit `app/api/data-validation/route.ts` for custom validation:

\`\`\`typescript
// Custom email validation
if (email && email.includes('+')) {
errors.email = "Email aliases not allowed";
}
\`\`\`

## 🚀 Production Deployment

### Environment Variables

\`\`\`bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

### Deployment Steps

1. **Build the app**: `npm run build`
2. **Deploy to Vercel**: Connect your GitHub repo
3. **Update callback URLs**: Replace ngrok URLs with production URLs
4. **Test thoroughly**: Verify all functionality works

## 🔒 Security Features

- ✅ Server-side data validation
- ✅ Input sanitization
- ✅ Privacy policy compliance
- ✅ Secure HTTPS-only callbacks
- ✅ User consent management

## 🎯 Demo Highlights

This demo showcases:

- **Modern E-commerce UX**: How online shopping should feel
- **Smart Wallet Benefits**: Frictionless checkout experience
- **Base Integration**: Real blockchain payments and data collection
- **Privacy Compliance**: Transparent data handling
- **Production Ready**: Clean, maintainable code structure

## 📚 Learn More

- [Base Smart Wallet Profiles](https://docs.base.org/smart-wallet/profiles)
- [Wagmi Documentation](https://wagmi.sh)
- [Base Developer Resources](https://base.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

**Base Shop** - Experience the future of e-commerce with Smart Wallet technology.
