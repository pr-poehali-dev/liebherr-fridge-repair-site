import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white py-4">
        <div className="container flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-700 tracking-wide text-primary">
            LIEBHERR СЕРВИС
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← На главную
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-700 text-primary">Политика конфиденциальности</h1>
          <p className="mt-2 text-sm text-muted-foreground">Дата последнего обновления: 03 июля 2026 г.</p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground">

            <section>
              <h2 className="font-display text-xl font-600 text-primary">1. Общие положения</h2>
              <p className="mt-3">
                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта <strong>liebherr-repair.ru</strong> (далее — «Сайт»), оператором которого является Сервисный центр Liebherr (далее — «Оператор»).
              </p>
              <p className="mt-3">
                Политика разработана в соответствии с Федеральным законом № 152-ФЗ от 27.07.2006 «О персональных данных» и иными нормативными правовыми актами Российской Федерации в области защиты персональных данных.
              </p>
              <p className="mt-3">
                Используя Сайт, вы выражаете согласие с условиями настоящей Политики. Если вы не согласны с условиями Политики, прекратите использование Сайта.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">2. Какие данные мы собираем</h2>
              <p className="mt-3">Оператор может собирать следующие категории персональных данных:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li><strong>Контактные данные</strong> — имя, номер телефона, которые вы добровольно указываете при заполнении формы заявки на сайте.</li>
                <li><strong>Технические данные</strong> — IP-адрес, тип и версия браузера, операционная система, страницы посещения, время визита, источник перехода. Эти данные собираются автоматически сервисами аналитики и колл-трекинга.</li>
                <li><strong>Данные файлов cookie</strong> — идентификаторы сессий и предпочтений пользователя, необходимые для работы сервисов аналитики.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">3. Цели обработки персональных данных</h2>
              <p className="mt-3">Персональные данные обрабатываются в следующих целях:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Обработка заявок и обратная связь с пользователями по вопросам ремонта техники.</li>
                <li>Анализ посещаемости сайта и улучшение качества его работы.</li>
                <li>Отслеживание источников обращений (колл-трекинг) для оценки эффективности рекламы.</li>
                <li>Защита от мошеннических действий и ботов.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">4. Третьи стороны, получающие данные</h2>
              <p className="mt-3">При использовании Сайта данные могут передаваться следующим сервисам:</p>

              <div className="mt-4 space-y-4">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <h3 className="font-600">Яндекс.Метрика (ООО «Яндекс»)</h3>
                  <p className="mt-1 text-muted-foreground">Сервис веб-аналитики. Собирает технические данные о посещениях: IP-адрес, поведение на сайте, источники трафика. Использует файлы cookie. Данные хранятся на серверах Яндекса. Политика конфиденциальности Яндекса: <a href="https://yandex.ru/legal/confidential/" target="_blank" rel="noopener noreferrer" className="text-primary underline">yandex.ru/legal/confidential</a>. Вы можете отключить сбор данных, установив плагин <a href="https://yandex.ru/support/metrica/general/opt-out.html" target="_blank" rel="noopener noreferrer" className="text-primary underline">Яндекс.Метрика Opt-out</a>.</p>
                </div>

                <div className="rounded-xl border bg-muted/30 p-4">
                  <h3 className="font-600">Mango Office (ООО «Манго Телеком»)</h3>
                  <p className="mt-1 text-muted-foreground">Сервис виртуальной АТС и колл-трекинга. Фиксирует факт и параметры телефонных звонков (номер телефона, время звонка, источник рекламы). Обработка данных осуществляется в соответствии с политикой ООО «Манго Телеком»: <a href="https://www.mango-office.ru/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mango-office.ru/legal/privacy</a>.</p>
                </div>

                <div className="rounded-xl border bg-muted/30 p-4">
                  <h3 className="font-600">Botfaqtor</h3>
                  <p className="mt-1 text-muted-foreground">Сервис защиты от ботов и недействительного трафика. Анализирует технические параметры посетителей (IP-адрес, поведение на сайте, характеристики браузера) для выявления автоматизированных запросов. Персональные данные в целях идентификации физических лиц не используются. Подробнее: <a href="https://botfaqtor.ru" target="_blank" rel="noopener noreferrer" className="text-primary underline">botfaqtor.ru</a>.</p>
                </div>
              </div>

              <p className="mt-4">
                Оператор не продаёт и не передаёт персональные данные третьим лицам в коммерческих целях. Передача данных указанным сервисам осуществляется исключительно в рамках их функционального назначения.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">5. Файлы cookie</h2>
              <p className="mt-3">
                Сайт использует файлы cookie — небольшие текстовые файлы, сохраняемые на вашем устройстве. Cookie применяются для корректной работы сервисов аналитики (Яндекс.Метрика) и защиты от ботов (Botfaqtor).
              </p>
              <p className="mt-3">
                Вы можете отключить использование cookie в настройках браузера. Обратите внимание: отключение cookie может повлиять на работу отдельных функций сайта.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">6. Правовое основание обработки</h2>
              <p className="mt-3">Обработка персональных данных осуществляется на следующих основаниях:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Согласие субъекта персональных данных (ст. 9 Федерального закона № 152-ФЗ) — при отправке формы заявки.</li>
                <li>Законный интерес Оператора в обеспечении безопасности и анализе работы сайта.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">7. Сроки хранения данных</h2>
              <p className="mt-3">
                Персональные данные, переданные через форму заявки, хранятся не дольше, чем это необходимо для достижения целей обработки, либо до момента отзыва согласия пользователем, но не более 3 (трёх) лет.
              </p>
              <p className="mt-3">
                Технические данные, собираемые сервисами аналитики, хранятся в соответствии с политиками соответствующих сервисов.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">8. Права субъектов персональных данных</h2>
              <p className="mt-3">В соответствии с Федеральным законом № 152-ФЗ вы имеете право:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Получить информацию об обработке ваших персональных данных.</li>
                <li>Потребовать уточнения, блокировки или уничтожения персональных данных.</li>
                <li>Отозвать согласие на обработку персональных данных.</li>
                <li>Обжаловать действия Оператора в Роскомнадзор (rkn.gov.ru).</li>
              </ul>
              <p className="mt-3">
                Для реализации своих прав направьте обращение по телефону: <strong>+7 (499) 638-27-51</strong>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">9. Защита данных</h2>
              <p className="mt-3">
                Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения. Доступ к персональным данным имеет ограниченный круг лиц, обязанных соблюдать конфиденциальность.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">10. Изменения Политики</h2>
              <p className="mt-3">
                Оператор вправе вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента её размещения на Сайте. Рекомендуем периодически проверять актуальность Политики.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-600 text-primary">11. Контакты</h2>
              <p className="mt-3">
                По вопросам, связанным с обработкой персональных данных, обращайтесь:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Телефон: <strong>+7 (499) 638-27-51</strong></li>
                <li>Сайт: <strong>liebherr-repair.ru</strong></li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <footer className="mt-12 border-t bg-white py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © 2012 Сервисный центр Liebherr. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
