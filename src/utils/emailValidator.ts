// Comprehensive list and heuristic detector for temporary/disposable email services
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'mailinator.net', 'mailinator.org', 'mailinator2.com',
  'tempmail.com', 'temp-mail.org', 'temp-mail.io', 'tempmail.net', 'tempmail.de', 'tempmailgen.com',
  '10minutemail.com', '10minutemail.net', '10minutemail.co.za', '10minutemail.de', '10minemail.com',
  'guerrillamail.com', 'guerrillamail.info', 'guerrillamail.biz', 'guerrillamail.de', 'guerrillamail.net', 'guerrillamail.org',
  'guerrillamailblock.com', 'sharklasers.com', 'grr.la', 'pokemail.net', 'spam4.me',
  'yopmail.com', 'yopmail.net', 'yopmail.fr', 'cool.fr.nf', 'jetable.fr.nf', 'courriel.fr.nf', 'moncourrier.fr.nf',
  'throwawaymail.com', 'throwaway.email', 'trashmail.com', 'trashmail.net', 'trashmail.me', 'trashmail.io',
  'getnada.com', 'nada.ltd', 'abcvg.com', 'inboxkitten.com', 'dispostable.com',
  'fakeinbox.com', 'fakemailgenerator.com', 'generator.email', 'dropmail.me', 'mohmal.com', 'mohmal.in',
  'burnerdigital.com', 'burnermail.io', 'crazymailing.com', 'emailondeck.com', 'zillamail.com',
  'tempail.com', 'mintemail.com', 'discard.email', 'spambox.us', 'maildrop.cc', 'binkmail.com',
  'safetymail.info', 'mailnesia.com', 'spamgourmet.com', 'harakirimail.com', 'mytrashmail.com',
  'jetable.org', '0-mail.com', 'anonbox.net', 'anonymbox.com', 'armyspy.com', 'cuvox.de',
  'dayrep.com', 'einrot.com', 'frapmail.com', 'gustr.com', 'journeys.ca', 'rhyta.com',
  'superrito.com', 'teleworm.us', 'tempinbox.com', 'tmpmail.net', 'tmpmail.org', 'tmail.ws',
  'tempmailaddress.com', 'emailfake.com', 'mygenerator.org',
  'moakt.com', 'moakt.ws', 'tmailor.com', 'crazymail.com',
  'inboxbear.com', 'getairmail.com', 'mytemp.email', 'fakemail.net', 'trashcanmail.com',
  'tempmailo.com', 'luxusmail.org', 'clipmail.eu', 'mailpoof.com', 'instantemailaddress.com',
  'emailtemp.org', 'trash-mail.at', 'trash-mail.com', 'trash-mail.de', 'inboxalias.com'
]);

// Substring keywords that indicate temporary or burner email services
const DISPOSABLE_KEYWORDS = [
  'tempmail',
  'temp-mail',
  'temporarymail',
  'disposable',
  'throwaway',
  'fakeinbox',
  'fakemail',
  'trashmail',
  '10minute',
  '10min',
  'guerrillamail',
  'mailinator',
  'burnermail',
  'mytemp',
  'emailondeck',
  'yopmail',
  'dropmail',
  'mohmal',
  'sharklasers',
  'dispostable',
  'maildrop',
  'mailnesia',
  'tempinbox',
  'tmpmail',
  'emailfake',
  'moakt',
  'trashcanmail',
  'generator.email'
];

/**
 * Checks if an email address belongs to a known temporary/disposable email provider
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const parts = email.trim().toLowerCase().split('@');
  if (parts.length !== 2) return false;
  
  const domain = parts[1].trim();
  if (!domain) return false;

  // Direct set lookup
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return true;
  }

  // Check subdomains (e.g. abc.mailinator.com)
  for (const known of DISPOSABLE_EMAIL_DOMAINS) {
    if (domain.endsWith('.' + known)) {
      return true;
    }
  }

  // Check domain keywords
  const domainBase = domain.split('.')[0] || '';
  for (const keyword of DISPOSABLE_KEYWORDS) {
    if (domain.includes(keyword) || domainBase.includes(keyword)) {
      return true;
    }
  }

  return false;
}
