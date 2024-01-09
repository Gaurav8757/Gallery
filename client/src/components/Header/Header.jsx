import { UploadModals } from "../ModalForm/UploadModals";

function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-700">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* LOGO AND TITLE */}
          <div className="flex justify-start">
            <img src="/logo.png" className="mr-3 h-8 sm:h-9 rounded-lg" alt="logo" />
            <span className="self-center  h-8 text-2xl font-semibold whitespace-nowrap dark:text-white">Gallery</span>
          </div>
          <UploadModals />
        </div>
      </nav>
    </header>
  );
}

export default Header;
