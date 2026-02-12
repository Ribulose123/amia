"use client"

import { Instagram, Twitter, Youtube } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="relative z-10 dark:bg-black light:bg-white border-t dark:border-white/5 light:border-black/10">
      <div className="max-w-full lg:max-w-[80%] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Minimal Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Navigation */}
          <div>
            <h4 className="font-inter text-[10px] lg:text-xs dark:text-neutral-600 light:text-neutral-400 uppercase tracking-wider mb-3 lg:mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 lg:space-y-3 dark:text-neutral-400 light:text-neutral-600 font-inter text-xs lg:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="dark:hover:text-white light:hover:text-black transition-colors"
                >
                  {t('nav.categories')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nominees')}
                  className="dark:hover:text-white light:hover:text-black transition-colors"
                >
                  {t('nav.nominees')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jury')}
                  className="dark:hover:text-white light:hover:text-black transition-colors"
                >
                  {t('nav.jury')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hall-of-fame')}
                  className="dark:hover:text-white light:hover:text-black transition-colors"
                >
                  {t('nav.hallOfFame')}
                </button>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-inter text-[10px] lg:text-xs dark:text-neutral-600 light:text-neutral-400 uppercase tracking-wider mb-3 lg:mb-4">
              {t('nav.about')}
            </h4>
            <ul className="space-y-2 lg:space-y-3 dark:text-neutral-400 light:text-neutral-600 font-inter text-xs lg:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="dark:hover:text-white light:hover:text-black transition-colors"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="dark:hover:text-white light:hover:text-black transition-colors"
                >
                  {t('nav.news')}
                </button>
              </li>
              <li>
                <button className="dark:hover:text-white light:hover:text-black transition-colors">Press</button>
              </li>
              <li>
                <button className="dark:hover:text-white light:hover:text-black transition-colors">Contact</button>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="font-inter text-[10px] lg:text-xs dark:text-neutral-600 light:text-neutral-400 uppercase tracking-wider mb-3 lg:mb-4">
              Partners
            </h4>
            <ul className="space-y-2 lg:space-y-3 dark:text-neutral-400 light:text-neutral-600 font-inter text-xs lg:text-sm">
              <li>
                <button className="dark:hover:text-white light:hover:text-black transition-colors">Sponsors</button>
              </li>
              <li>
                <button className="dark:hover:text-white light:hover:text-black transition-colors">Media Partners</button>
              </li>
              <li>
                <button className="dark:hover:text-white light:hover:text-black transition-colors">Broadcasters</button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-inter text-[10px] lg:text-xs dark:text-neutral-600 light:text-neutral-400 uppercase tracking-wider mb-3 lg:mb-4">
              Legal
            </h4>
            <ul className="space-y-2 lg:space-y-3 dark:text-neutral-400 light:text-neutral-600 font-inter text-xs lg:text-sm">
              <li>
                <button className="dark:hover:text-white light:hover:text-black transition-colors">Privacy</button>
              </li>
              <li>
                <button className="dark:hover:text-white light:hover:text-black transition-colors">Terms</button>
              </li>
              <li>
                <button className="dark:hover:text-white light:hover:text-black transition-colors">Cookies</button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-inter text-[10px] lg:text-xs dark:text-neutral-600 light:text-neutral-400 uppercase tracking-wider mb-3 lg:mb-4">
              Follow
            </h4>
            <div className="flex gap-3 lg:gap-4">
              <button className="dark:text-neutral-400 dark:hover:text-white light:text-neutral-600 light:hover:text-black transition-colors">
                <Instagram className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <button className="dark:text-neutral-400 dark:hover:text-white light:text-neutral-600 light:hover:text-black transition-colors">
                <Twitter className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <button className="dark:text-neutral-400 dark:hover:text-white light:text-neutral-600 light:hover:text-black transition-colors">
                <Youtube className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom - Minimal */}
        <div className="pt-6 lg:pt-8 border-t dark:border-white/5 light:border-black/10 text-[10px] lg:text-xs dark:text-neutral-600 light:text-neutral-400 font-inter">
          <p>© {currentYear} African Music Icon Awards. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

