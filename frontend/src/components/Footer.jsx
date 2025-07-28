import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-4 text-center border-t mt-10 text-sm text-gray-500">
      Desenvolvido por{' '}
      <a
        href="https://tatitodev.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        okan
      </a>
    </footer>
  );
}