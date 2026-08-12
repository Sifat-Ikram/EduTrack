"use client";

import { motion } from "framer-motion";
import { FiBell, FiBookOpen, FiChevronDown } from "react-icons/fi";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-sm"
          >
            <FiBookOpen size={21} strokeWidth={2} />
          </motion.div>

          <div className="leading-tight">
            <h1 className="text-[17px] font-semibold tracking-tight text-slate-900">
              EduAyna
            </h1>

            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
              Student Management
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification */}
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label="Notifications"
            className="relative flex cursor-pointer h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiBell size={19} strokeWidth={1.8} />

            {/* Notification indicator */}
            <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
          </motion.button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Admin Profile */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            className="flex items-center cursor-pointer gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-200 hover:bg-slate-50"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-[#4F46E5]">
              A
            </div>

            {/* User Info */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-5 text-slate-800">
                Admin
              </p>

              <p className="text-[11px] leading-4 text-slate-500">
                Administrator
              </p>
            </div>

            <FiChevronDown
              size={15}
              className="hidden text-slate-400 sm:block"
            />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
