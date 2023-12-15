/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        content: "rgba(var(--content))",
        border: "rgba(var(--border))",
        card: "rgba(var(--card))",
        logo: "rgba(var(--logo))",
        primary: "rgba(var(--copy-primary))",
        secondary: "rgba(var(--copy-secondary))",
        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-text": "rgba(var(--cta-text))",
      },
    },
  },
  plugins: [],
}