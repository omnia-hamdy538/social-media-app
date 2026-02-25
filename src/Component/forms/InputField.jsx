

export default function InputField({ label, register, name, placeholder, error }) {
  return (
    <div>
      <label className="font-semibold text-sm block mb-1">{label}</label>

      <input
        {...register(name)}
        placeholder={placeholder}
        className={`
          w-full h-12 px-4 border rounded-md 
          focus:outline-blue-500
          ${error ? "border-red-500 shadow-md shadow-red-200" : "border-gray-300"}
        `}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
