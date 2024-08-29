import React from 'react';
import { Book, Users, Globe } from 'lucide-react';
import Mis1 from '../../assets/Mis1.jpg';
import Mis2 from '../../assets/Mis2.jpg';
import Mis3 from '../../assets/Mis3.jpg';
import Mis4 from '../../assets/Mis4.jpg';
import Mis5 from '../../assets/Mis5.jpeg';
import Mis6 from '../../assets/Mis6.jpg';

const MissionAction = () => {
  const cardItems = [
    {
      icon: Book,
      title: 'Education',
      description:
        'We believe education is the cornerstone of a better future. Our mission focuses on providing quality education to underprivileged children, equipping them with the knowledge and skills they need to break the cycle of poverty and succeed in life.',
      backgroundImage: Mis1,
    },
    {
      icon: Users,
      title: 'Community Development',
      description:
        'Through community-driven initiatives, we work hand-in-hand with local communities to develop sustainable projects that empower individuals, foster economic growth, and improve overall living conditions for everyone involved.',
      backgroundImage: Mis2,
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description:
        'Our efforts extend beyond borders, striving to create positive change on a global scale. We focus on initiatives that address pressing global challenges, promoting a more equitable and sustainable world for all.',
      backgroundImage: Mis3,
    },
    {
      icon: Book,
      title: 'Literacy Programs',
      description:
        'Literacy is a critical component of personal and societal growth. Our literacy programs promote access to books and learning materials for people of all ages, fostering a love for reading and continuous learning.',
      backgroundImage: Mis4,
    },
    {
      icon: Users,
      title: 'Healthcare Initiatives',
      description:
        'Our healthcare initiatives aim to improve medical services in underserved areas. We work to ensure that everyone, regardless of location, has access to essential healthcare services and life-saving treatments.',
      backgroundImage: Mis5,
    },
    {
      icon: Globe,
      title: 'Environmental Conservation',
      description:
        'Protecting our planet is at the core of our mission. We are committed to environmental conservation efforts that safeguard natural ecosystems, reduce pollution, and promote sustainable practices for future generations.',
      backgroundImage: Mis6,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 bg-white-100">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-green-600 sm:text-4xl">
          Our Mission
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-green-500">
          We strive to create lasting change through education, community development, and sustainable initiatives.
        </p>
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cardItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                className="h-56 w-full object-cover"
                src={item.backgroundImage}
                alt={item.title}
              />
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 mb-4">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{item.title}</h3>
                <p className="mt-4 text-base text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionAction;
