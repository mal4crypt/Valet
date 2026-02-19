import React from 'react';

export function Footer() {
    return (
        <footer className="w-full py-6 mt-12 border-t border-neutral-200 bg-white">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-600">

                {/* Credits */}
                <div className="font-medium">
                    Made by <span className="font-bold text-neutral-900">Malcrypt</span>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                    <a
                        href="https://wa.me/2349164703407"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                        <span>WhatsApp:</span>
                        <span className="font-mono text-neutral-800">+234 916 470 3407</span>
                    </a>

                    <a
                        href="mailto:mal4crypt404@gmail.com"
                        className="hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                        <span>Email:</span>
                        <span className="font-mono text-neutral-800">mal4crypt404@gmail.com</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
