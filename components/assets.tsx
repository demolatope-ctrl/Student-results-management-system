
import React from 'react';

export const SchoolLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M75 10 L130 30 L130 90 L75 130 L20 90 L20 30 Z" fill="#EBF4FF" stroke="#0C4A6E" strokeWidth="2"/>
        <path d="M75 15 L125 35 L125 85 L75 125 L25 85 L25 35 Z" fill="#FFFFFF" stroke="#0C4A6E" strokeWidth="1"/>
        
        <rect x="55" y="40" width="40" height="40" fill="#EBF4FF" stroke="#0C4A6E" strokeWidth="1" />
        <path d="M60 75 L75 50 L90 75 Z" fill="none" stroke="#0C4A6E" strokeWidth="2" />
        <path d="M75 75 L75 80" stroke="#0C4A6E" strokeWidth="2"/>
        <path d="M68 65 L82 65" stroke="#0C4A6E" strokeWidth="1.5"/>

        <path d="M50 35 L55 40 M95 40 L100 35" stroke="#0C4A6E" strokeWidth="1"/>

        <text x="75" y="32" fontFamily="Arial" fontSize="8" fill="#0C4A6E" textAnchor="middle">PRIVATE</text>
        <text x="42" y="65" fontFamily="Arial" fontSize="8" fill="#0C4A6E" textAnchor="middle" transform="rotate(-90 42 65)">OLOYE</text>
        <text x="108" y="65" fontFamily="Arial" fontSize="8" fill="#0C4A6E" textAnchor="middle" transform="rotate(90 108 65)">SCHOOL</text>

        <path d="M30 100 C 40 120, 110 120, 120 100" fill="none" stroke="#0C4A6E" strokeWidth="2"/>
        <path d="M35 105 C 45 122, 105 122, 115 105" fill="#EBF4FF" stroke="#0C4A6E" strokeWidth="1"/>
        <text x="75" y="115" fontFamily="Arial" fontSize="9" fill="#0C4A6E" textAnchor="middle" fontWeight="bold">ONE WITH GOD</text>
    </svg>
);


export const QrCode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="black" d="
        M0 0 H30 V30 H0 V0 M10 10 H20 V20 H10 V10
        M70 0 H100 V30 H70 V0 M80 10 H90 V20 H80 V10
        M0 70 H30 V100 H0 V70 M10 80 H20 V90 H10 V80
        M40 0 H60 V10 H40 V0
        M0 40 H10 V60 H0 V40
        M30 30 H40 V40 H30 V30
        M40 40 H50 V50 H40 V40
        M60 20 H70 V40 H60 V20
        M30 60 H50 V70 H30 V60
        M60 50 H70 V80 H60 V50
        M80 40 H100 V50 H80 V40
        M70 60 H90 V70 H70 V60
        M90 70 H100 V90 H90 V70
        M40 80 H60 V100 H40 V80
    "/>
  </svg>
);