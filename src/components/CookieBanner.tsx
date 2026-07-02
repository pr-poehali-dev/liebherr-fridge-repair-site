import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const COOKIE_KEY = 'cookie_consent_accepted';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, '1');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, '0');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
      <div className="container flex flex-col items-start gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Мы используем файлы cookie для аналитики, колл-трекинга и защиты от ботов. Продолжая использовать сайт, вы соглашаетесь с{' '}
          <Link to="/privacy" className="underline hover:text-foreground">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="outline" onClick={decline}>
            Отказать
          </Button>
          <Button size="sm" onClick={accept}>
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
}