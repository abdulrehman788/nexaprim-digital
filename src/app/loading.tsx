export default function Loading() {
  return (
    <div className="min-h-[50vh] animate-pulse bg-black" aria-hidden="true">
      <div className="mx-auto flex h-full max-w-content flex-col gap-6 px-4 py-28 sm:px-6 lg:px-8">
        <div className="h-4 w-40 rounded bg-white/10" />
        <div className="h-12 w-2/3 max-w-xl rounded bg-white/10" />
        <div className="h-24 w-full max-w-lg rounded bg-white/10" />
      </div>
    </div>
  );
}
