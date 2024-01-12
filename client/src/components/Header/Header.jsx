// HEADER COMPONENTS
import { UploadModals } from "../ModalForm/UploadModals";
function Header() {
  return (
    <header className="sticky top-0 z-50 max-w-screen">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-700">
        <div className="flex flex-wrap justify-between items-center max-w-screen">
          {/* LOGO AND TITLE */}
          <div className="flex justify-start ">
            <img src="/logo.png" className="mr-3 h-8 sm:h-9 rounded-lg" alt="logo" />
            <span className="self-center xl:text-2xl lg:text-xl md:text-xl sm:text-xl h-8 text-lg font-semibold whitespace-nowrap dark:text-white">VGallery</span>
          </div>
          <UploadModals />
        </div>
      </nav>
    </header>
  );
}
export default Header;
