import { CheckSquare, Sparkles, BarChart, MapPin } from 'lucide-react';

export const DemoApps = [
    {
      name: "Todo App",
      description: "A sleek and interactive app to manage and track your daily tasks, with a modern UI design.",
      icon: <CheckSquare className={'w-6 h-6 text-blue-500'} />,
      prompt: `Design a one-page, fully-responsive Todo app where users can seamlessly add, edit, and delete tasks with smooth animations and transitions.`
    },
    {
      name: "Quote Generator App",
      description: "An inspiring app that delivers motivational quotes paired with stunning Unsplash background images.",
      icon: <Sparkles className='w-6 h-6 text-yellow-500' />,
      prompt: `Create a visually engaging one-page app that generates random motivational quotes, with dynamic Unsplash backgrounds and smooth fade transitions.`
    },
    {
      name: "Poll Creator App",
      description: "A quick and intuitive poll creation app with real-time results and a stunning, user-friendly interface.",
      icon: <BarChart className='w-6 h-6 text-green-500' />,
      prompt: `Build a responsive, one-page app where users can create polls with various choices, view live voting results, and enjoy interactive animations as results update in real-time.`
    },
    {
      name: "Travel Inspiration App",
      description: "Explore breathtaking travel destinations with vibrant images powered by Unsplash and immersive UX design.",
      icon: <MapPin className='w-6 h-6 text-red-500' />,
      prompt: `Design a visually appealing one-page travel inspiration app that showcases beautiful travel destinations with stunning images, interactive details, and smooth scroll effects.`
    }
  ];
  