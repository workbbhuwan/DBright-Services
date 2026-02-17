export const frontPage = {
  hero: {
    headline: '株式会社D.Bright\nTrusted Expertise For Cleaning',
    subtitle:
      '株式会社D.Bright delivers professional cleaning services\nwith rigorous quality standards you can count on.',
    ctaPrimary: 'Book Your Cleaning',
    ctaSecondary: 'View All Services',
  },
  intro: {
    badge: 'About Us',
    headlineSegments: [
      '株式会社D.Bright is a trusted team delivering spotless results through experience',
      ', reliability, consistency, and customer-focused',
      ' service every time.',
    ],
    stats: [
      { label: 'Completed', value: 500, suffix: '+', description: 'Projects Done' },
      { label: 'Satisfaction', value: 98, suffix: '%', description: 'Satisfaction Rating' },
    ],
  },
  services: {
    title: 'Our Services',
    items: [
      {
        num: '01',
        title: 'Home Cleaning',
        tags: ['Eco-Friendly', 'Family Safe', 'Routine Clean', 'Trained Cleaners'],
        showTags: true,
        image: '/service-page/home-cleaning.png',
      },
      { num: '02', title: 'Office Cleaning', tags: [], showTags: false, image: '/service-page/office-cleaning.png' },
      { num: '03', title: 'Deep Cleaning', tags: [], showTags: false, image: '/service-page/deep-cleaning.png' },
      { num: '04', title: 'Window Cleaning', tags: [], showTags: false, image: '/service-page/window-cleaning.png' },
    ],
  },
  whyChooseUs: {
    badge: 'Why Choose Us',
    title: 'Why Customers Trust\n株式会社D.Bright',
    reasons: [
      {
        title: 'Professional & Trained Cleaners',
        description:
          'Our cleaners are fully trained, background-checked, and dedicated to delivering consistent.',
      },
      {
        title: 'Eco-Safe Cleaning Products',
        description:
          'We use non-toxic, eco-friendly materials that protect families, pets, and the environment.',
      },
      {
        title: 'Fast, Flexible Scheduling',
        description:
          'Choose times that fit your day, book instantly online, and easily reschedule plans change.',
      },
      {
        title: 'Guaranteed Service Quality',
        description:
          'We guarantee exceptional cleaning quality and offer free corrections if something expectations.',
      },
    ],
  },
};
