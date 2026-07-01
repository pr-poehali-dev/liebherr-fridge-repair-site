import json
import os
import smtplib
import urllib.request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import psycopg2


def handler(event: dict, context) -> dict:
    """Приём заявки с сайта: сохранение в БД, письмо на почту, уведомление в Telegram."""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    model = body.get('model', '').strip()
    description = body.get('description', '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'name and phone required'})}

    # Сохранить в БД
    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.orders (name, phone, model, description) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, model or None, description or None),
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    # Письмо на почту с полными данными (не блокирует при ошибке)
    try:
        _send_email(order_id, name, phone, model, description)
    except Exception as e:
        print(f'[EMAIL ERROR] {e}')

    # Уведомление в Telegram БЕЗ персональных данных
    try:
        _send_telegram(order_id)
    except Exception as e:
        print(f'[TG ERROR] {e}')

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True, 'id': order_id})}


def _send_email(order_id, name, phone, model, description):
    host = os.environ.get('SMTP_HOST', '')
    port = int(os.environ.get('SMTP_PORT', 465))
    user = os.environ.get('SMTP_USER', '').strip()
    password = os.environ.get('SMTP_PASSWORD', '').strip()
    to = os.environ.get('SMTP_TO', '').strip()
    if not all([host, user, password, to]):
        return
    # Убедиться что адреса только ASCII (защита от опечаток в секретах)
    user = user.encode('ascii', errors='ignore').decode()
    to = to.encode('ascii', errors='ignore').decode()

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка #{order_id} — Ремонт Liebherr'
    msg['From'] = user
    msg['To'] = to

    html = f"""
    <html><body style="font-family:Arial,sans-serif;color:#1a2e4a">
    <h2 style="color:#003d8f">Новая заявка #{order_id}</h2>
    <table cellpadding="8" style="border-collapse:collapse">
      <tr><td><b>Имя:</b></td><td>{name}</td></tr>
      <tr><td><b>Телефон:</b></td><td>{phone}</td></tr>
      <tr><td><b>Модель:</b></td><td>{model or '—'}</td></tr>
      <tr><td><b>Описание:</b></td><td>{description or '—'}</td></tr>
    </table>
    </body></html>
    """
    msg.attach(MIMEText(html, 'html'))

    import ssl
    ctx = ssl.create_default_context()
    with smtplib.SMTP_SSL(host, port, context=ctx) as smtp:
        smtp.ehlo()
        smtp.login(user, password)
        smtp.sendmail(user, to, msg.as_string())


def _send_telegram(order_id):
    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
    if not token or not chat_id:
        return

    text = f'🔔 Новая заявка #{order_id} на ремонт Liebherr. Детали — в почте.'
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = json.dumps({'chat_id': chat_id, 'text': text}).encode()
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    urllib.request.urlopen(req, timeout=5)