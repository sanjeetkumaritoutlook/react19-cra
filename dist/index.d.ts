import React from 'react';

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
}
declare const MyButton: React.FC<MyButtonProps>;

interface MyCardProps {
    title: string;
    description: string;
    image?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
}
declare const MyCard: React.FC<MyCardProps>;

export { MyButton, MyCard };
