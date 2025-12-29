# Romantic Interactive Proposal Website 💖

A beautiful, interactive romantic proposal website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

### Phase 1: The Proposal
- Glassmorphism design with animated gradient background
- "Will you be my Valentine?" proposal card
- **Runaway Button**: The "No" button physically runs away when your cursor gets close (using Framer Motion)
- **Yes Button**: Triggers confetti explosion and smooth transition to Phase 2
- Floating hearts, lilies, and roses animation
- Bilingual support (English & Malayalam)

### Phase 2: The Shrine
- Divine golden temple aesthetic
- Ornate golden frame with halo glow effect
- Animated Diyas (oil lamps) with flickering effect
- Decorative lilies and roses (her favorite flowers)
- "Offer Flowers" button with flower/heart emoji confetti
- Server actions ready for database integration

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **canvas-confetti** (celebration effects)
- **lucide-react** (icons)
- **clsx & tailwind-merge** (dynamic styling)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
love-nextjs/
├── app/
│   ├── page.tsx          # Main page with phase management
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles and fonts
├── components/
│   ├── RunawayButton.tsx  # The runaway "No" button component
│   └── Shrine.tsx         # Phase 2 shrine component
├── lib/
│   ├── actions.ts         # Server actions (ready for database)
│   └── utils.ts           # Utility functions (cn helper)
└── public/
    └── DPZY-165.jpg       # Place your image here
```

## Adding Her Photo

1. Place the image file in the `public/` folder
2. Update the `imageUrl` prop in `app/page.tsx`:
   ```tsx
   <Shrine imageUrl="/your-image.jpg" />
   ```

## Database Integration

The project includes mock server actions in `lib/actions.ts`:

- `recordYesClick()` - Records when "Yes" is clicked
- `incrementFlowerCount()` - Tracks flower offerings
- `getFlowerCount()` - Retrieves flower count

To connect to Supabase/Postgres:

1. Install your database client
2. Replace the mock functions in `lib/actions.ts` with actual database calls
3. The components are already wired up to use these actions

Example:
```typescript
export async function recordYesClick() {
  await supabase.from('interactions').insert({ 
    type: 'yes_click', 
    timestamp: new Date() 
  })
  return { success: true }
}
```

## Customization

### Changing the Proposal Text

Edit the text in `app/page.tsx` in the `ProposalPhase` component.

### Adjusting Colors

All colors are defined using Tailwind classes. Modify the gradient backgrounds in:
- `app/page.tsx` (background gradients)
- `components/Shrine.tsx` (shrine frame colors)

### Adding Music

Uncomment the audio element in `components/Shrine.tsx` and add your music file to the `public/` folder.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy!

The app will automatically build and deploy.

## License

Made with 💖 for someone special
