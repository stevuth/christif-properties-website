import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/2348012345678"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="h-8 w-8" />
    </Link>
  );
}
