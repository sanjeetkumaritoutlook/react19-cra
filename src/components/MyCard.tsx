import React from 'react';

interface MyCardProps {
  title: string;
  description: string;
  image?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

// Declare as regular function and cast to React.FC
const MyCard = (({
  title,
  description,
  image,
  children,
  onClick,
  style,
}: MyCardProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        maxWidth: 320,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease-in-out',
        ...style,
      }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
        />
      )}
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
          {description}
        </p>
        {children && <div style={{ marginTop: 12 }}>{children}</div>}
      </div>
    </div>
  );
}) as React.FC<MyCardProps>;

export default MyCard;
