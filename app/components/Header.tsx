export default function Header() {

  

  return (
    <header className="fixed top-0 left-0 right-0 h-14 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex justify-end items-center">
        <nav className="flex gap-4">
          <button className="px-4 py-1.5 text-sm text-white hover:text-red-300 transition-colors">
            Login
          </button>
          <button className="px-4 py-1.5 text-sm text-white bg-red-400 rounded-full hover:bg-red-600 transition-colors">
            Register
          </button>
        </nav>
      </div>
    </header>
  );
} 