export default function ApplyModal({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      
      <div className="relative bg-white w-full max-w-md rounded-xl p-6 z-10">
        <h2 className="text-xl font-semibold mb-2">Apply for Internship</h2>
        <p className="text-sm text-gray-500 mb-4">
          Please fill your information below
        </p>

        
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <input
          type="file"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <textarea
          placeholder="Why should we hire you?"
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 border rounded py-2"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-500 text-white rounded py-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
