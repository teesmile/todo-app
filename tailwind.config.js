export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    eextend: {
      colors: {
        // Custom colors
        primary: '#333333',
        accent: '#FFD700',
        light: '#FAFAFA', 
        muted: '#22c55e',
        completed: '#22c55e',
        
        
        border: "hsl(0, 0%, 89.8%)", 
        input: "hsl(0, 0%, 89.8%)",
        ring: "#FFD700", 
        background: "#FAFAFA", 
        foreground: "#333333", 
      },
    },
  },
  plugins: [],
}