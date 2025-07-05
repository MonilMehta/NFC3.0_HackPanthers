import React, { useEffect } from 'react';
import { Book, Users, Globe } from 'lucide-react';

const MissionAction = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 150) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    return () => window.removeEventListener('scroll', reveal);
  }, []);

  const cardItems = [
    {
      icon: Book,
      title: 'Education',
      description:
        'We believe education is the cornerstone of a better future. Our mission focuses on providing quality education to underprivileged children, equipping them with the knowledge and skills they need to break the cycle of poverty and succeed in life.',
      backgroundImage: 'https://www.smilefoundationindia.org/wp-content/uploads/2023/03/Layer-109-1-1024x757.png',
    },
    {
      icon: Users,
      title: 'Community Development',
      description:
        'Through community-driven initiatives, we work hand-in-hand with local communities to develop sustainable projects that empower individuals, foster economic growth, and improve overall living conditions for everyone involved.',
      backgroundImage: 'https://media.istockphoto.com/id/508497052/photo/unity-of-indian-children-asia.jpg?s=612x612&w=0&k=20&c=kG5rMa8k0HngLbT5CcgJaXA_wu2ufHoVwSLrj--YVQs=',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description:
        'Our efforts extend beyond borders, striving to create positive change on a global scale. We focus on initiatives that address pressing global challenges, promoting a more equitable and sustainable world for all.',
      backgroundImage: 'https://www.economist.com/content-assets/images/20240224_ASP002.jpg',
    },
    {
      icon: Book,
      title: 'Literacy Programs',
      description:
        'Literacy is a critical component of personal and societal growth. Our literacy programs promote access to books and learning materials for people of all ages, fostering a love for reading and continuous learning.',
      backgroundImage: 'https://www.uil.unesco.org/sites/default/files/structured_data/uil001/2811611_tcsphotolearners1_0.jpg',
    },
    {
      icon: Users,
      title: 'Healthcare Initiatives',
      description:
        'Our healthcare initiatives aim to improve medical services in underserved areas. We work to ensure that everyone, regardless of location, has access to essential healthcare services and life-saving treatments.',
      backgroundImage: 'https://give.do/blog/wp-content/uploads/2021/12/Main-Banner-3.jpg',
    },
    {
      icon: Globe,
      title: 'Environmental Conservation',
      description:
        'Protecting our planet is at the core of our mission. We are committed to environmental conservation efforts that safeguard natural ecosystems, reduce pollution, and promote sustainable practices for future generations.',
      backgroundImage: 'https://growbilliontrees.com/cdn/shop/files/grow-billion-trees-plantation-1.jpg?v=1712395590&width=1500',
    },
  ];

  return (
    <div className="max-w-full mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-24 lg:px-8 xl:px-16 bg-white">
      <div className="px-0 sm:px-4 lg:px-8 xl:px-16 reveal">
        <h2 className="text-3xl font-extrabold text-[#003E1F] sm:text-4xl lg:text-5xl">
          Our Mission
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-semibold text-[#003E1F] sm:text-xl">
          We strive to create lasting change through education, community development, and sustainable initiatives.
        </p>
      </div>
      <div className="mt-12 px-0 sm:px-4 lg:px-8 xl:px-16 sm:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardItems.map((item, index) => (
            <div key={index} className="reveal group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Background Image with Black & White Filter */}
                <img
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110 filter grayscale brightness-50"
                  src={item.backgroundImage}
                  alt={item.title}
                />
                
                {/* Dark Overlay for better contrast */}
                <div className="absolute inset-0 bg-black bg-opacity-60 transition duration-300 group-hover:bg-opacity-70"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-white">
                    {/* Icon */}
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm mb-4">
                      <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 leading-tight text-white">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-100 leading-relaxed line-clamp-4 opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition duration-300 group-hover:border-white group-hover:border-opacity-50"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MissionAction;