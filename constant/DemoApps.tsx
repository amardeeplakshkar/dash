import { CheckSquare, Sparkles, BarChart, MapPin } from 'lucide-react';

export const DemoApps = [
    {
      name: "Todo App",
      description: "A sleek and interactive app to manage and track your daily tasks, with a modern UI design.",
      icon: <CheckSquare className={'w-6 h-6 text-blue-500'} />,
      prompt: `Create a single-page, fully-responsive Todo application utilizing React, which allows users to intuitively add, modify, and remove tasks. The app should feature engaging smooth animations and transitions, enhancing user experience as they interact with the task list. Additionally, ensure that the design is visually appealing and adapts seamlessly to various screen sizes and devices, providing functionality and aesthetics in equal measure.`
    },
    {
      name: "Quote Generator App",
      description: "An inspiring app that delivers motivational quotes paired with stunning background images.",
      icon: <Sparkles className='w-6 h-6 text-yellow-500' />,
      prompt: `Develop a visually captivating single-page application using React that generates random motivational quotes. This application should feature dynamic backgrounds that change to enhance the overall aesthetic, accompanied by smooth fade transitions to create a seamless user experience.`
    },
    {
      name: "Poll Creator App",
      description: "A quick and intuitive poll creation app with real-time results and a stunning, user-friendly interface.",
      icon: <BarChart className='w-6 h-6 text-green-500' />,
      prompt: `Develop a responsive, single-page application using React that allows users to create and customize polls with multiple choice options. The app should enable users to participate in voting and view live results in real-time, featuring engaging interactive animations that illustrate the updates of the voting results as they occur.`
    },
    {
      name: "Restaurant Website",
      description: "A visually appealing and user-friendly website for a new upscale restaurant named 'Gourmet Haven'.",
      icon: <MapPin className='w-6 h-6 text-red-500' />,
      prompt: `**Project Name: Gourmet Haven**

Create a stunning and user-friendly website for the upscale restaurant "Gourmet Haven." The website should encompass the following key sections:

1. **Homepage**: Develop an engaging introduction that captivates visitors with high-resolution images of the restaurant’s signature dishes. Include a concise overview of the restaurant's unique concept and a prominent call-to-action button encouraging users to make reservations.

2. **Menu**: Design a comprehensive menu page displaying all food and beverage options, complete with detailed descriptions, pricing, and vibrant imagery. Implement filters to allow users to easily navigate based on dietary preferences such as vegan, gluten-free, and more.

3. **About Us**: Create a section that narrates the story behind the restaurant, its culinary philosophy, and the talented chefs responsible for the exquisite dishes. Incorporate behind-the-scenes photographs to showcase the restaurant’s commitment to quality and authenticity.

4. **Location & Hours**: Integrate a map to illustrate the restaurant's location clearly. Provide detailed information on operating hours and add contact information for ease of communication.

5. **Events**: Implement a calendar feature that highlights upcoming events, special dining nights, and promotional activities. Include functionality for users to RSVP or book private events directly through the site.

6. **Testimonials**: Feature a dedicated section that showcases customer reviews and dining experiences to build credibility, trust, and attract new patrons to the restaurant.

7. **Blog**: Establish a blog page that offers culinary tips, recipes, and the latest updates about the restaurant. This will enhance customer engagement and contribute positively to search engine optimization.

8. **Contact**: Provide a contact form for user inquiries along with links to the restaurant's social media platforms. Incorporate an option for customers to subscribe to a newsletter, ensuring they stay updated with the latest news and promotions.

The overall design of the website should reflect a luxurious yet inviting ambiance, with a warm and earthy color palette complemented by elegant typography. It is essential to ensure the website is fully responsive for mobile devices and optimized for search engine visibility.`
    }
  ];
  