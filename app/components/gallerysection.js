"use client";

export default function MasonryGallery() {
  return (
    <section className="bg-light-gray py-12 px-4 md:px-20">
      <h2 className="text-4xl font-bold text-slate-dark mb-8 text-center">
        Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="grid gap-4">
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400?text=Image+1" alt="Image 1" />
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/400x600?text=Image+2" alt="Image 2" />
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x500?text=Image+3" alt="Image 3" />
        </div>

        {/* Column 2 */}
        <div className="grid gap-4">
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/500x400?text=Image+4" alt="Image 4" />
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x600?text=Image+5" alt="Image 5" />
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/400x450?text=Image+6" alt="Image 6" />
        </div>

        {/* Column 3 */}
        <div className="grid gap-4">
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/450x600?text=Image+7" alt="Image 7" />
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x350?text=Image+8" alt="Image 8" />
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/500x500?text=Image+9" alt="Image 9" />
        </div>

        {/* Column 4 */}
        <div className="grid gap-4">
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x300?text=Image+10" alt="Image 10" />
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/400x400?text=Image+11" alt="Image 11" />
          <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/550x600?text=Image+12" alt="Image 12" />
        </div>
      </div>
    </section>
  );
}
