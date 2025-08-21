import dotenv from 'dotenv';
import connectDb from '../config/db.js';
import Project from '../models/Project.js';

dotenv.config();

async function run() {
  await connectDb();
  const sample = [
    {
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Full-stack commerce with cart, checkout, admin.',
      longDescription: 'Built with React/Next.js, Node/Express, MongoDB. Integrations with Stripe and JWT auth.',
      image: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1200&auto=format&fit=crop',
      techStack: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      tags: ['web', 'ecommerce'],
      githubUrl: 'https://github.com/Muhammad-Naveed704',
      liveUrl: 'https://portfolio-taupe-eta-78.vercel.app/',
      featured: true,
      order: 1
    },
    {
      title: 'SaaS Dashboard',
      slug: 'saas-dashboard',
      description: 'Analytics dashboard with role-based access.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop',
      techStack: ['Next.js', 'Tailwind', 'Node.js', 'MongoDB'],
      tags: ['web', 'saas'],
      featured: true,
      order: 2
    },
    {
      title: 'Mobile App API',
      slug: 'mobile-app-api',
      description: 'Express REST API powering a React Native app.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      techStack: ['Express', 'MongoDB', 'JWT'],
      tags: ['api', 'mobile'],
      featured: false,
      order: 3
    }
  ];

  await Project.deleteMany({});
  await Project.insertMany(sample);
  console.log('Seeded projects:', sample.length);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


