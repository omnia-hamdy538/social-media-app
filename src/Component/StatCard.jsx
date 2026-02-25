export default function StatCard({ title, value, image }) {
  return (
    <div className="bg-white rounded-lg p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition">
      
      
      <div className="w-12 h-12 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      
      <div>
        <span className="text-2xl font-bold text-gray-800">
          {value}
        </span>
        <p className="text-sm text-gray-500">
          {title}
        </p>
      </div>

    </div>
  );
}
