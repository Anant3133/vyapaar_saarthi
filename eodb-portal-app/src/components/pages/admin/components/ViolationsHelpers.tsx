import { AlertTriangle, AlertCircle, Flag, CheckCircle } from 'lucide-react';

export function getViolationSeverityBadge(severity: string, language: 'en' | 'hi') {
  const translations = {
    en: { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' },
    hi: { critical: 'अति गंभीर', high: 'उच्च', medium: 'मध्यम', low: 'निम्न' }
  };

  const t = translations[language];
  
  const severityConfig = {
    critical: { label: t.critical, class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
    high: { label: t.high, class: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
    medium: { label: t.medium, class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
    low: { label: t.low, class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' }
  };
  
  return severityConfig[severity as keyof typeof severityConfig] || severityConfig.medium;
}

export function getViolationStatusBadge(status: string, language: 'en' | 'hi') {
  const translations = {
    en: { open: 'Open', inProgress: 'In Progress', resolved: 'Resolved', closed: 'Closed' },
    hi: { open: 'खुला', inProgress: 'प्रगति में', resolved: 'हल किया गया', closed: 'बंद' }
  };

  const t = translations[language];
  
  const statusConfig = {
    open: { label: t.open, class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
    inProgress: { label: t.inProgress, class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
    resolved: { label: t.resolved, class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    closed: { label: t.closed, class: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' }
  };
  
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.open;
}

export function getViolationSeverityIcon(severity: string) {
  switch (severity) {
    case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
    case 'high': return <AlertCircle className="w-4 h-4 text-orange-600" />;
    case 'medium': return <Flag className="w-4 h-4 text-yellow-600" />;
    case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
    default: return <Flag className="w-4 h-4 text-yellow-600" />;
  }
}

export function getViolationTypeLabel(type: string, language: 'en' | 'hi') {
  const translations = {
    en: { safety: 'Safety', documentation: 'Documentation', health: 'Health', environmental: 'Environmental', other: 'Other' },
    hi: { safety: 'सुरक्षा', documentation: 'दस्तावेज़ीकरण', health: 'स्वास्थ्य', environmental: 'पर्यावरणीय', other: 'अन्य' }
  };

  const t = translations[language];
  const typeLabels = {
    safety: t.safety,
    documentation: t.documentation,
    health: t.health,
    environmental: t.environmental,
    other: t.other
  };
  
  return typeLabels[type as keyof typeof typeLabels] || type;
}