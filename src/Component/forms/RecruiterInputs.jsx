export default function InputField({ label, register, name, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="font-medium">{label}</label>

      <input
        {...register(name)}
        placeholder={placeholder}
        className={`
          p-2 rounded-lg outline-none transition-all duration-200
          ${error 
            ? "border border-red-500 shadow-[0_0_5px_red]"
            : "border border-gray-300"
          }
        `}
      />

      {error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
}
