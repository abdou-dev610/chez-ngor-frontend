import { Star } from 'lucide-react';

export default function TestimonialCard({ name, message, rating }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-cream p-6 shadow-sm">
      <div className="flex gap-0.5 text-primary">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm italic leading-relaxed text-gray-600">"{message}"</p>
      <p className="mt-4 text-sm font-semibold text-brand">— {name}</p>
    </div>
  );
}
