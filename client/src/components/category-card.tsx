import { Link } from "wouter";
import { useLanguage } from "@/lib/context";

type CategoryCardProps = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
};

export default function CategoryCard({ id, name, slug, imageUrl }: CategoryCardProps) {
  return (
    <Link href={`/shop/${slug}`} className="group">
      <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
        <div className="aspect-square overflow-hidden">
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-heading font-semibold">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
