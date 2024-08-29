import React from 'react';
import { Calendar, Heart, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import the Link component
import './CustomCard.css'; // Import the CSS file

const CustomCard = ({ image, title, date, description, isDonation, goal, current }) => {
  return (
    <div className="custom-card">
      <div className="custom-card__image">
        <img src={image} alt={title} />
        <div className="custom-card__overlay"></div>
        <div className="custom-card__content">
          <h3 className="custom-card__title">{title}</h3>
          {date && (
            <div className="custom-card__date">
              <Calendar size={16} className="mr-2" />
              <span>{date}</span>
            </div>
          )}
        </div>
      </div>
      <div className="custom-card__description">
        <p>{description}</p>
        {isDonation && (
          <div className="custom-card__donation">
            <div className="custom-card__progress-bar">
              <span>Raised: ${current}</span>
              <span>Goal: ${goal}</span>
            </div>
            <div className="custom-card__progress">
              <div
                className="custom-card__progress-fill"
                style={{ width: `${(current / goal) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        {isDonation ? (
          <Link to="/donation" className="custom-card__button">
            <DollarSign size={18} className="mr-2" />
            Donate Now
          </Link>
        ) : (
          <Link to="/events" className="custom-card__button">
            <Heart size={18} className="mr-2" />
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
