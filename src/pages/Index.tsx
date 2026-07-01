import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const NAV = [
  { label: 'Главная', href: '#home' },
  { label: 'О сервисе', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Прайс', href: '#pricing' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Гарантии', href: '#guarantees' },
  { label: 'Контакты', href: '#contacts' },
];

const ADVANTAGES = [
  { icon: 'Clock', title: 'Выезд в день заявки', text: 'Мастер приедет в удобное время уже сегодня' },
  { icon: 'ShieldCheck', title: 'Гарантия до 3 лет', text: 'Официальная гарантия на работу и запчасти' },
  { icon: 'Package', title: 'Оригинальные запчасти', text: 'Только сертифицированные детали Liebherr' },
  { icon: 'Wallet', title: 'Диагностика бесплатно', text: 'При заказе ремонта выезд и диагностика — 0 ₽' },
];

const SERVICES = [
  { icon: 'Snowflake', title: 'Не морозит камера', text: 'Замена компрессора, заправка фреоном, ремонт системы охлаждения' },
  { icon: 'Thermometer', title: 'Не держит температуру', text: 'Диагностика и замена термостата, датчиков и электроники' },
  { icon: 'Droplets', title: 'Течёт вода / наледь', text: 'Чистка дренажа, замена уплотнителей, ремонт No Frost' },
  { icon: 'Zap', title: 'Не включается', text: 'Ремонт платы управления, проводки и пусковых реле' },
  { icon: 'Volume2', title: 'Шумит и вибрирует', text: 'Замена вентиляторов, амортизаторов и подвески компрессора' },
  { icon: 'Wind', title: 'Обслуживание No Frost', text: 'Профилактика системы No Frost и BioFresh Liebherr' },
];

const PORTFOLIO = [
  { model: 'Liebherr CBNes 4898', task: 'Замена компрессора', time: '2 часа' },
  { model: 'Liebherr SBSes 8483', task: 'Ремонт платы No Frost', time: '1.5 часа' },
  { model: 'Liebherr CNef 4315', task: 'Заправка системы фреоном', time: '1 час' },
  { model: 'Liebherr IKB 3560', task: 'Замена термостата', time: '40 минут' },
];

const PRICING = [
  { name: 'Диагностика', price: 'Бесплатно*', note: 'при заказе ремонта' },
  { name: 'Заправка фреоном', price: 'от 2 500 ₽', note: 'с гарантией' },
  { name: 'Замена термостата', price: 'от 2 000 ₽', note: 'оригинал' },
  { name: 'Замена компрессора', price: 'от 6 500 ₽', note: 'до 3 лет гарантии' },
  { name: 'Ремонт платы No Frost', price: 'от 3 500 ₽', note: 'в тот же день' },
  { name: 'Замена уплотнителя', price: 'от 1 800 ₽', note: 'оригинал Liebherr' },
];

const REVIEWS = [
  { name: 'Анна М.', text: 'Мастер приехал через 2 часа после звонка, быстро нашёл поломку и заменил компрессор. Холодильник работает как новый!', rating: 5 },
  { name: 'Дмитрий К.', text: 'Профессионалы своего дела. Оригинальные детали, чек, гарантия 3 года. Рекомендую всем владельцам Liebherr.', rating: 5 },
  { name: 'Елена В.', text: 'Отремонтировали No Frost, объяснили причину поломки. Цена честная, без накруток. Спасибо!', rating: 5 },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Icon name="Snowflake" size={20} />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-700 tracking-wide text-primary">LIEBHERR</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Сервисный центр</div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+74951234567" className="text-sm font-600 text-primary">+7 (495) 123-45-67</a>
            <Button asChild size="sm">
              <a href="#order">Вызвать мастера</a>
            </Button>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-border bg-white lg:hidden">
            <nav className="container flex flex-col py-3">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-foreground/80">
                  {n.label}
                </a>
              ))}
              <Button asChild className="mt-2">
                <a href="#order" onClick={() => setMenuOpen(false)}>Вызвать мастера</a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="hero-gradient relative overflow-hidden text-white">
        <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Icon name="BadgeCheck" size={16} /> Официальный сервис Liebherr
            </span>
            <h1 className="mt-6 font-display text-4xl font-700 leading-tight sm:text-5xl lg:text-6xl">
              Ремонт холодильников <span className="text-sky-300">Liebherr</span> с выездом на дом
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              Восстановим работу вашего холодильника в день обращения. Оригинальные запчасти, гарантия до 3 лет, честные цены.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <a href="#order"><Icon name="Wrench" size={18} className="mr-2" />Заказать выезд мастера</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                <a href="tel:+74951234567"><Icon name="Phone" size={18} className="mr-2" />Позвонить</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {['12 лет опыта', '15 000+ ремонтов', 'Гарантия до 3 лет'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm text-white/85">
                  <Icon name="Check" size={16} className="text-sky-300" /> {s}
                </div>
              ))}
            </div>
          </div>

          {/* Order form */}
          <div id="order" className="animate-fade-up rounded-2xl bg-white p-6 text-foreground shadow-2xl sm:p-8">
            <h2 className="font-display text-2xl font-600 text-primary">Вызвать мастера на дом</h2>
            <p className="mt-1 text-sm text-muted-foreground">Перезвоним в течение 5 минут и согласуем время выезда</p>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" />
              <Input placeholder="Телефон" type="tel" />
              <Input placeholder="Модель холодильника (если знаете)" />
              <Textarea placeholder="Опишите проблему" rows={3} />
              <Button type="submit" size="lg" className="w-full">
                <Icon name="Send" size={18} className="mr-2" /> Оставить заявку
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="container -mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADVANTAGES.map((a) => (
          <Card key={a.title} className="hover-lift border-none bg-white p-6 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name={a.icon} size={24} />
            </div>
            <h3 className="mt-4 font-display text-lg font-600">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
          </Card>
        ))}
      </section>

      {/* About */}
      <section id="about" className="container py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://cdn.poehali.dev/projects/2bad4f0d-9b26-462e-bd9c-740ae791c0d2/files/1b62734f-e805-48f3-8d77-18aef4b120ec.jpg"
              alt="Мастер по ремонту холодильников Liebherr"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="font-display text-sm font-600 uppercase tracking-[0.2em] text-accent">О сервисе</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary sm:text-4xl">
              Специализируемся только на технике Liebherr
            </h2>
            <p className="mt-4 text-muted-foreground">
              Мы — команда сертифицированных инженеров, которые ремонтируют исключительно холодильники Liebherr более 12 лет.
              Знаем каждую модель, используем оригинальные запчасти и профессиональное оборудование.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {[
                { num: '15 000+', label: 'ремонтов выполнено' },
                { num: '4.9', label: 'средняя оценка' },
                { num: '98%', label: 'ремонтов за 1 визит' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-700 text-accent">{s.num}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-display text-sm font-600 uppercase tracking-[0.2em] text-accent">Услуги</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary sm:text-4xl">Что мы ремонтируем</h2>
            <p className="mt-3 text-muted-foreground">Решаем любые неисправности холодильников Liebherr</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Card key={s.title} className="hover-lift group border-border/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="mt-4 font-display text-xl font-600">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-sm font-600 uppercase tracking-[0.2em] text-accent">Портфолио</span>
          <h2 className="mt-3 font-display text-3xl font-700 text-primary sm:text-4xl">Наши работы</h2>
          <p className="mt-3 text-muted-foreground">Реальные примеры выполненных ремонтов</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PORTFOLIO.map((p) => (
            <Card key={p.model} className="hover-lift overflow-hidden">
              <div className="hero-gradient flex h-32 items-center justify-center text-white">
                <Icon name="Refrigerator" size={48} />
              </div>
              <div className="p-5">
                <div className="font-display font-600 text-primary">{p.model}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.task}</div>
                <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-accent">
                  <Icon name="Clock" size={14} /> {p.time}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-display text-sm font-600 uppercase tracking-[0.2em] text-accent">Прайс</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary sm:text-4xl">Стоимость ремонта</h2>
            <p className="mt-3 text-muted-foreground">Честные цены без скрытых доплат. Точную сумму назовём после диагностики</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {PRICING.map((p) => (
              <div key={p.name} className="hover-lift flex items-center justify-between rounded-xl border border-border/60 bg-white p-5">
                <div>
                  <div className="font-600 text-foreground">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.note}</div>
                </div>
                <div className="font-display text-xl font-700 text-primary">{p.price}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">* Диагностика бесплатна при заказе ремонта</p>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <a href="#order">Узнать стоимость ремонта</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-sm font-600 uppercase tracking-[0.2em] text-accent">Отзывы</span>
          <h2 className="mt-3 font-display text-3xl font-700 text-primary sm:text-4xl">Нам доверяют</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <Card key={r.name} className="hover-lift p-6">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Icon key={i} name="Star" size={18} className="fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground/80">«{r.text}»</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display font-600 text-primary">
                  {r.name[0]}
                </div>
                <div className="font-600">{r.name}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <section id="guarantees" className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-display text-sm font-600 uppercase tracking-[0.2em] text-accent">Гарантии</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary sm:text-4xl">Работаем с полной ответственностью</h2>
            <p className="mt-3 text-muted-foreground">Каждый ремонт подтверждается официальными документами</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: 'FileText', title: 'Официальный договор', text: 'Заключаем договор на выполнение работ перед началом ремонта. Всё прозрачно и юридически закреплено.' },
              { icon: 'ShieldCheck', title: 'Гарантия до 3 лет', text: 'На все виды ремонта и установленные запчасти. Гарантийный талон выдаётся сразу по завершении работ.' },
              { icon: 'Package', title: 'Оригинальные запчасти', text: 'Работаем только с сертифицированными деталями Liebherr с подтверждёнными документами качества.' },
              { icon: 'ReceiptText', title: 'Чек и акт выполненных работ', text: 'Выдаём кассовый чек и подробный акт с перечнем всех проведённых работ и замененных деталей.' },
              { icon: 'PhoneCall', title: 'Гарантийная поддержка', text: 'Если в гарантийный период возникнут вопросы — мастер приедет повторно бесплатно.' },
              { icon: 'BadgeCheck', title: 'Сертифицированные мастера', text: 'Наши инженеры имеют профильное образование и прошли официальное обучение по технике Liebherr.' },
            ].map((g) => (
              <div key={g.title} className="hover-lift relative overflow-hidden rounded-2xl border border-primary/10 bg-white p-7 shadow-sm">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/5" />
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                  <Icon name={g.icon} size={26} />
                </div>
                <h3 className="mt-5 font-display text-xl font-600 text-primary">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 rounded-2xl bg-primary p-8 text-center text-primary-foreground sm:flex-row sm:text-left">
            <Icon name="Shield" size={48} className="shrink-0 text-sky-300" />
            <div>
              <div className="font-display text-xl font-700">Не устраивает результат — вернём деньги</div>
              <div className="mt-1 text-sm text-primary-foreground/80">Если ремонт не устранил неисправность, мы возвращаем полную стоимость работ. Без споров и условий.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="font-display text-sm font-600 uppercase tracking-[0.2em] text-accent">Вопросы</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary sm:text-4xl">Частые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {[
              { q: 'Как быстро приедет мастер?', a: 'В большинстве случаев мастер приезжает в день обращения. Точное время согласуем по телефону.' },
              { q: 'Даёте ли вы гарантию?', a: 'Да, мы предоставляем официальную гарантию до 3 лет на работу и установленные запчасти.' },
              { q: 'Используете оригинальные запчасти?', a: 'Мы устанавливаем только оригинальные сертифицированные запчасти Liebherr.' },
              { q: 'Сколько стоит выезд и диагностика?', a: 'Диагностика бесплатна при заказе ремонта. Выезд по городу также входит в стоимость.' },
            ].map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-display font-600">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contacts + CTA */}
      <section id="contacts" className="hero-gradient py-20 text-white">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-700 sm:text-4xl">Остались вопросы?</h2>
            <p className="mt-4 max-w-md text-white/85">
              Свяжитесь с нами удобным способом — ответим на вопросы и запишем на ремонт.
            </p>
            <div className="mt-8 space-y-4">
              <a href="tel:+74951234567" className="flex items-center gap-3 text-lg">
                <Icon name="Phone" size={22} className="text-sky-300" /> +7 (495) 123-45-67
              </a>
              <div className="flex items-center gap-3 text-lg">
                <Icon name="Mail" size={22} className="text-sky-300" /> service@liebherr-repair.ru
              </div>
              <div className="flex items-center gap-3 text-lg">
                <Icon name="MapPin" size={22} className="text-sky-300" /> Москва и область
              </div>
              <div className="flex items-center gap-3 text-lg">
                <Icon name="Clock" size={22} className="text-sky-300" /> Ежедневно с 8:00 до 22:00
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-8 text-foreground shadow-2xl">
            <h3 className="font-display text-2xl font-600 text-primary">Заказать ремонт</h3>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" />
              <Input placeholder="Телефон" type="tel" />
              <Textarea placeholder="Что случилось с холодильником?" rows={3} />
              <Button type="submit" size="lg" className="w-full">Отправить заявку</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-10 text-primary-foreground">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="Snowflake" size={20} />
            <span className="font-display text-lg font-700 tracking-wide">LIEBHERR СЕРВИС</span>
          </div>
          <p className="text-sm text-primary-foreground/70">© 2026 Сервисный центр Liebherr. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;