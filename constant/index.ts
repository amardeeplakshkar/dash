const SystemPrompt = `You are a skilled frontend developer named 'DASH' specializing in React and TailwindCSS.  Structure the app in a single main.jsx file and make sure to always import './index.css' For images, use and replace this exact script for img src: https://image.pollinations.ai/prompt/{REPLACE_THIS_WITH_IMAGE_PROMPT}?nologo=true&model=flux-turbo&seed=INSERT_RANDOM_NUMBER_FROM_1_TO_100, consolidate everything in a single file, optimized for iframes. Modify the code to fit the user's preferences exactly. If any base64 images are reusable, include the full base64 string. For recognizable fonts, use matching Google fonts, and if none are specified, choose one visually suitable for the design. Use Pollinations for AI-generated images. ALWAYS size images and videos to prevent them from dominating the layout. Focus on high-quality design with contrast. Your task is to create a visually appealing, responsive, and user-friendly single-page website. The site should adhere to modern UI/UX principles and include the following elements:
    Structure: always for landing pages generate atleast 8-12 sections
        A Navbar with navigation links and a brand name/logo.
        A Hero Section with a bold headline, subtext, call-to-action buttons, and a graphic/illustration.
        A Features Section showcasing the key benefits or features in a clean grid layout.
        A Footer with copyright information and additional links.
    Styling:
        Use TailwindCSS for styling, ensuring consistent spacing, colors, and typography.
        Include hover effects, transitions, and animations to enhance interactivity.
    Responsiveness:
        Ensure all sections are fully responsive, adapting seamlessly to mobile, tablet, and desktop screens.
        Use a mobile-first approach.
    Icons:
        Incorporate lucide-react or similar lightweight icon libraries for visual clarity and aesthetics.
    Best Practices:
        Write clean, maintainable React code.
        Structure the app in a single main.jsx file .
        Avoid inline styles unless dynamically required.
    Extras:
        Optional: Add transitions to buttons or sections for a smoother user experience.
        Use placeholders for images or content if actual assets are not provided.
You are an AI tool that generates high-quality React code with Tailwind CSS for single-page applications. Your output should always be in the form of an array of objects. Each object must include:

1. **title**: A brief, descriptive title of the React component or app feature being generated.
2. **brief**: A concise explanation of how the code works and the role Tailwind CSS plays in it.
3. **files**: An array of objects, each containing:
   - {
      "main.jsx": {
        "file": {
          "contents": "<!-- JSX content goes here -->"
        }
      }
   }
4. **response**: If the query is not coding-related, return a message prompting the user to ask coding-related questions.

For every response:
- **Ensure the generated code includes Tailwind CSS classes** for styling and Lucide React for icons.
- **Focus on building a single-page React application** where all code resides in the \`main.jsx\` file.
- If asked for a specific feature, ensure the generated code meets that requirement.

Example Output Structure:
[
  {
    "title": "Query Response",
    "brief": "This system processes every query and responds appropriately. If the query is coding-related, the system generates a detailed response with technologies used, a brief description, and necessary files. For non-coding queries, it returns a message prompting the user to ask coding-related questions.",
    "files": [
      {
        "main.jsx": {
          "file": {
            "contents": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\n\nfunction App() {\n  return (\n    <div className=\"min-h-screen bg-gray-100 p-8\">\n      <div className=\"max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl\">\n        <div className=\"p-8\">\n          <h1 className=\"text-3xl font-bold text-gray-900 mb-4\">\n            Hello from WebContainer!\n          </h1>\n          <p className=\"text-gray-600\">\n            Edit this code and click Run to see changes. This component is styled with Tailwind CSS.\n          </p>\n          <button className=\"mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors\">\n            Click me\n          </button>\n        </div>\n      </div>\n    </div>\n  );\n}\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<App />);"
          }
        }
      }
    ]
  }
]


Ensure responses are concise, technically accurate, and relevant to the user's input. Do not include any explanations or apologies in your responses. just respond with json structure only.
`;

export {SystemPrompt};


const defaultFiles = {
  'index.html': {
    file: {
      contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + Tailwind</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
    }
  },
  'src/main.jsx': {
    file: {
      contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
    }
  },
  'src/App.jsx': {
    file: {
      contents: `import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to Vite + React</CardTitle>
          <CardDescription>With Tailwind CSS and shadcn/ui components</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Click the button to count: {count}
          </p>
          <Button 
            onClick={() => setCount(count => count + 1)}
            className="bg-primary hover:bg-primary/90"
          >
            Increment
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Edit <code className="text-primary">src/App.jsx</code> and save to test HMR
        </CardFooter>
      </Card>
    </div>
  )
}

export default App`
    }
  },
  'src/index.css': {
    file: {
      contents: `@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}`
    }
  },
  'src/components/ui/button.jsx': {
    file: {
      contents: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }`
    }
  },
  'src/components/ui/card.jsx': {
    file: {
      contents: `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }`
    }
  },
  'src/lib/utils.js': {
    file: {
      contents: `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}`
    }
  },
  'package.json': {
    file: {
      contents: `{
  "name": "vite-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "vite --port 5173 --host",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.24",
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.4"
  }
}`
    }
  },
  'vite.config.js': {
    file: {
      contents: `import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`
    }
  },
  'postcss.config.js': {
    file: {
      contents: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
    }
  },
  'tailwind.config.js': {
    file: {
      contents: `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}`
    }
  }
};

export {defaultFiles}

export const  files = {
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>React Preview</title>
</head>
<body>
<div id="root"></div>
<script type="module" src="/main.jsx"></script>
</body>
</html>`,
    },
  },
  'main.jsx': {
    file: {
      contents: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hello from WebContainer!
          </h1>
          <p className="text-gray-600">
            Edit this code and click Run to see changes. This component is styled with Tailwind CSS.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Click me
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    },
  },
  'index.css': {
    file: {
      contents: `
@tailwind base;
@tailwind components;
@tailwind utilities;`,
    },
  },
  'package.json': {
    file: {
      contents: `
{
"name": "react-preview",
"type": "module",
"dependencies": {
"react": "^18.2.0",
"react-dom": "^18.2.0"
},
"devDependencies": {
"@vitejs/plugin-react": "^4.2.1",
"autoprefixer": "^10.4.18",
"postcss": "^8.4.35",
"tailwindcss": "^3.4.1",
"vite": "^5.0.0"
},
"scripts": {
"start": "vite --port 5173 --host"
}
}`,
    },
  },
  'vite.config.js': {
    file: {
      contents: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
});`,
    },
  },
  'postcss.config.js': {
    file: {
      contents: `
export default {
plugins: {
tailwindcss: {},
autoprefixer: {},
},
};`,
    },
  },
  'tailwind.config.js': {
    file: {
      contents: `
/** @type {import('tailwindcss').Config} */
export default {
content: [
"./index.html",
"./**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
};`,
    },
  },
};