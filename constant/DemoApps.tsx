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
      description: "An inspiring app that delivers motivational quotes paired with stunning background images.",
      icon: <Sparkles className='w-6 h-6 text-yellow-500' />,
      prompt: `Create a visually engaging one-page app that generates random motivational quotes, with dynamic backgrounds and smooth fade transitions.`
    },
    {
      name: "Poll Creator App",
      description: "A quick and intuitive poll creation app with real-time results and a stunning, user-friendly interface.",
      icon: <BarChart className='w-6 h-6 text-green-500' />,
      prompt: `Build a responsive, one-page app where users can create polls with various choices, view live voting results, and enjoy interactive animations as results update in real-time.`
    },
    {
      name: "Restaurant Website",
      description: "A visually appealing and user-friendly website for a new upscale restaurant named 'Gourmet Haven'.",
      icon: <MapPin className='w-6 h-6 text-red-500' />,
      prompt: `This is the user's prompt: **Project Name: Gourmet Haven** Design a visually appealing and user-friendly website for a new upscale restaurant named "Gourmet Haven". The website should feature the following sections: 1. **Homepage**: An enticing introduction with high-quality images of signature dishes, a brief description of the restaurant's concept, and a call-to-action button for reservations.

2. **Menu**: A detailed menu page showcasing all food and beverage offerings, including descriptions, prices, and vibrant images. Include filters for dietary preferences (vegan, gluten-free, etc.).

3. **About Us**: A section detailing the restaurant's story, philosophy, and the chefs behind the culinary creations. Include behind-the-scenes photos to emphasize the restaurant's dedication to quality.

4. **Location & Hours**: A map integration showcasing the restaurant's location, along with operating hours and contact information.

5. **Events**: A calendar feature for upcoming events, special dining nights, and promotions, with the option to RSVP or book private events.

6. **Testimonials**: A section that highlights customer reviews and dining experiences to establish credibility and attract new patrons.

7. **Blog**: A blog page to share culinary tips, recipes, and updates on the restaurant, helping to engage customers and improve SEO.

8. **Contact**: A contact form for inquiries, along with social media links and a newsletter subscription option to keep customers informed.

The overall design should exude a luxurious yet welcoming atmosphere, utilizing a color palette of warm, earthy tones, and elegant typography. Ensure that the website is mobile-responsive and optimized for search engines`
    }
  ];
  