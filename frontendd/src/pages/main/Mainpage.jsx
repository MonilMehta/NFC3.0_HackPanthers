import React from 'react';
import Proj1 from '../../assets/Proj1.png';
import Proj3 from '../../assets/Proj3.jpg';
import CustomCard from './CustomCard';
import Rotationlogo from './rotation/Rotationlogo';
const Navbar = () => (
  <nav className="bg-[#003E1F] p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-[#FFFFFF] font-bold text-xl">ChildCare NGO</div>
      <div className="space-x-4">
        <a href="#" className="text-[#FFFFFF] hover:text-[#6BCB80]">Home</a>
        <a href="#" className="text-[#FFFFFF] hover:text-[#6BCB80]">About</a>
        <a href="#" className="text-[#FFFFFF] hover:text-[#6BCB80]">Events</a>
        <a href="#" className="text-[#FFFFFF] hover:text-[#6BCB80]">Donate</a>
      </div>
    </div>
  </nav>
);



const HomePage = () => {
  const upcomingEvents = [
    { image: Proj1, title: "Charity Run", date: "2023-09-15", description: "Annual 5K run to raise funds for children's education" },
    { image: Proj1, title: "Art Workshop", date: "2023-09-22", description: "Creative workshop for underprivileged children" },
  ];

  const completedEvents = [
    { image: Proj1, title: "School Supply Drive", date: "2023-08-10", description: "Distributed school supplies to 500 children" },
    { image: Proj1, title: "Summer Camp", date: "2023-07-15", description: "Two-week summer camp for 100 children" },
  ];

  const donationCases = [
    { image: Proj3, title: "Education Fund", isDonation: true, goal: 10000, current: 7500, description: "Help us provide education to underprivileged children" },
    { image: Proj3, title: "Healthcare Initiative", isDonation: true, goal: 5000, current: 3200, description: "Support our healthcare programs for children in need" },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#003E1F] text-[#FFFFFF] py-20">
        <div className="container mx-auto px-4 text-center">
          <Rotationlogo />
          <h1 className="text-5xl font-bold mb-6">Empowering Children, Transforming Lives</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join our mission to provide education, healthcare, and support to children in need. Together, we can create a brighter future for all.</p>
          <button className="bg-[#4CAF50] text-[#FFFFFF] font-bold py-3 px-8 rounded-full hover:bg-[#6BCB80] transition duration-300">
            Get Involved
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#003E1F]">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => (
            <CustomCard key={index} {...event} />
          ))}
        </div>
      </div>

      {/* Completed Events */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#003E1F]">Successful Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {completedEvents.map((event, index) => (
              <CustomCard key={index} {...event} />
            ))}
          </div>
        </div>
      </div>

      {/* Help Someone Out */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#003E1F]">Help Someone Out</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {donationCases.map((donation, index) => (
            <CustomCard key={index} {...donation} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003E1F] text-[#FFFFFF] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About ChildCare NGO</h3>
              <p>We are dedicated to improving the lives of children through education, healthcare, and community support.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>123 NGO Street, Charity City</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@childcarengo.org</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#FFFFFF] hover:text-[#6BCB80]">Facebook</a>
                <a href="#" className="text-[#FFFFFF] hover:text-[#6BCB80]">Twitter</a>
                <a href="#" className="text-[#FFFFFF] hover:text-[#6BCB80]">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 ChildCare NGO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;