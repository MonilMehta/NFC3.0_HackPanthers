import React from 'react';

const DonationText = () => {
  const styles = {
    container: {
      backgroundColor: '#e9ecef',
      padding: '2rem',
      borderRadius: '8px',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      color: '#202124',
    },
    heading: {
      marginBottom: '1rem',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    paragraph: {
      marginBottom: '1.5rem',
      fontSize: '16px',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Support Children's Futures Today</h2>
      <p style={styles.paragraph}>
        Your donation is instrumental in improving the lives of children in need. 
        Each contribution helps us provide essential services such as education, healthcare, 
        and emotional support to vulnerable children. With your support, we can address urgent needs 
        and create a brighter future for every child. No matter the size, your donation has a profound impact.
      </p>
      <p style={styles.paragraph}>
        We believe in the power of community and collective action. Every donation enables us to fund 
        programs that nurture and protect children, helping them reach their full potential. By supporting us, 
        you join a network of compassionate individuals committed to making a difference in the lives of children.
      </p>
      <p style={styles.paragraph}>
        Our organization is dedicated to transparency and effective use of resources. We ensure that 
        every donation is directed towards initiatives that deliver real, positive outcomes for children. 
        You can be assured that your support is making a meaningful difference in building a better world for all.
      </p>
      <p style={styles.paragraph}>
        Thank you for your invaluable contribution and for standing with us in our mission. Your support 
        drives our efforts and brings hope to countless children. We are deeply grateful for your commitment 
        and generosity, which empower us to continue our work.
      </p>
      <p style={styles.paragraph}>
        If you have any questions or need more information about our programs or how your donation is utilized, 
        please feel free to reach out. We are here to provide any additional details you need and to ensure 
        a fulfilling giving experience. Together, let’s continue to make a difference and create a brighter future 
        for every child.
      </p>
    </div>
  );
}

export default DonationText;
