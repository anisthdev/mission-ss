import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('footer.links.about'), path: '/about' },
    { name: t('footer.links.programs'), path: '/programs' },
    { name: t('footer.links.impact'), path: '/impact' },
    { name: t('footer.links.partners'), path: '/partners' },
    { name: t('footer.links.contact'), path: '/contact' },
  ];

  const legalLinks = [
    { name: t('footer.legal.privacy'), path: '/privacy' },
    { name: t('footer.legal.terms'), path: '/terms' },
    { name: t('footer.legal.reports'), path: '/transparency' },
  ];

  return (
    <footer className="bg-sand-100 dark:bg-[rgb(var(--dark-bg-secondary))] text-slate-600 dark:text-[rgb(var(--dark-text-primary))] border-t border-sand-200 dark:border-[rgb(var(--dark-border))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <img
                src="/images/hope_logo.png"
                alt="Hope Foundation Logo"
                className="h-24 w-auto rounded-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-[rgb(var(--dark-text-secondary))] mb-4">
              {t('footer.about')}
            </p>
            <p className="text-xs font-semibold text-hope-600 dark:text-[rgb(var(--dark-accent-radiance))]">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-700 dark:text-[rgb(var(--dark-text-secondary))]
                               hover:text-hope-600 dark:hover:text-[rgb(var(--dark-accent-radiance))]
                               transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-[rgb(var(--dark-text-secondary))]">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-600 dark:text-[rgb(var(--dark-text-primary))]">
                    {t('footer.registeredOffice')}
                  </p>
                  <p>{t('footer.registeredAddress')}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-600 dark:text-[rgb(var(--dark-text-primary))]">
                    {t('footer.stateOffice')}
                  </p>
                  <p>{t('footer.stateAddress')}</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:info@missionodisha.org"
                  className="hover:text-hope-600 dark:hover:text-[rgb(var(--dark-accent-radiance))] transition-colors"
                >
                  info@missionodisha.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91-XXXXX-XXXXX</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">{t('footer.legal.heading')}</h3>
            <ul className="space-y-2 mb-4">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-700 dark:text-[rgb(var(--dark-text-secondary))]
                               hover:text-hope-600 dark:hover:text-[rgb(var(--dark-accent-radiance))]
                               transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 dark:text-[rgb(var(--dark-text-muted))]">
              NITI Aayog UID: OR/2010/0024894
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-sand-300 dark:border-[rgb(var(--dark-border))]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-[rgb(var(--dark-text-muted))]">
              {t('footer.copyright')}
            </p>
            <p className="text-xs text-gray-500 dark:text-[rgb(var(--dark-text-muted))]">
              {t('footer.builtWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
