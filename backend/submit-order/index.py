import json
import os
import smtplib
import ssl
import time
import urllib.request
from email.message import EmailMessage

UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']


def handler(event: dict, context) -> dict:
    """Приём заявки с сайта: письмо на почту и сделка в Битрикс24 (с UTM-метками)."""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    phone = body.get('phone', '').strip()
    model = body.get('model', '').strip()
    description = body.get('description', '').strip()
    utm = {k: (body.get(k) or '').strip() for k in UTM_KEYS}
    page_url = (body.get('page_url') or '').strip()

    if not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'phone required'})}

    order_id = int(time.time())

    try:
        _send_email(order_id, phone, model, description, utm, page_url)
    except Exception as e:
        print(f'[EMAIL ERROR] {e}')

    try:
        _send_bitrix(order_id, phone, model, description, utm, page_url)
    except Exception as e:
        print(f'[BITRIX ERROR] {e}')

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True, 'id': order_id})}


def _send_email(order_id, phone, model, description, utm, page_url):
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    smtp_to = os.environ.get('SMTP_TO')

    if not all([smtp_host, smtp_user, smtp_password, smtp_to]):
        print('[EMAIL ERROR] SMTP env vars are not fully set')
        return

    msg = EmailMessage()
    msg['Subject'] = f'Новая заявка #{order_id} — Ремонт Liebherr'
    msg['From'] = smtp_user
    msg['To'] = smtp_to

    utm_rows = ''.join(
        f'<tr><td><b>{k.upper()}:</b></td><td>{v}</td></tr>' for k, v in utm.items() if v
    )
    page_row = f'<tr><td><b>Страница:</b></td><td>{page_url}</td></tr>' if page_url else ''

    html = f"""
    <html><body style="font-family:Arial,sans-serif;color:#1a2e4a">
    <h2 style="color:#003d8f">Новая заявка #{order_id}</h2>
    <table cellpadding="8" style="border-collapse:collapse">
      <tr><td><b>Телефон:</b></td><td>{phone}</td></tr>
      <tr><td><b>Модель:</b></td><td>{model or '—'}</td></tr>
      <tr><td><b>Описание:</b></td><td>{description or '—'}</td></tr>
      {page_row}
      {utm_rows}
    </table>
    </body></html>
    """
    msg.set_content('Смотрите письмо в HTML-формате.')
    msg.add_alternative(html, subtype='html')

    ctx = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_host, smtp_port, context=ctx) as smtp:
        smtp.login(smtp_user, smtp_password)
        smtp.send_message(msg)


def _send_bitrix(order_id, phone, model, description, utm, page_url):
    webhook_url = os.environ.get('BITRIX24_WEBHOOK_URL')
    if not webhook_url:
        print('[BITRIX ERROR] BITRIX24_WEBHOOK_URL is not set')
        return

    comments_parts = [f'Телефон: {phone}']
    if model:
        comments_parts.append(f'Модель: {model}')
    if description:
        comments_parts.append(f'Описание: {description}')
    if page_url:
        comments_parts.append(f'Страница: {page_url}')
    comments = '\n'.join(comments_parts)

    utm_source = (utm.get('utm_source') or '').lower()
    source_id = 'YANDEX_DIRECT' if utm_source in ('yandex', 'direct') else 'WEB'

    fields = {
        'TITLE': f'Заявка с сайта #{order_id} — Ремонт Liebherr',
        'COMMENTS': comments,
        'SOURCE_ID': source_id,
        'CATEGORY_ID': 5,
    }
    for k in UTM_KEYS:
        if utm.get(k):
            fields[k.upper()] = utm[k]

    deal_webhook_url = webhook_url.rsplit('/', 1)[0] + '/crm.deal.add.json'
    payload = json.dumps({'fields': fields, 'params': {'REGISTER_SONET': 'Y'}}).encode()
    req = urllib.request.Request(deal_webhook_url, data=payload, headers={'Content-Type': 'application/json'})
    for attempt in range(2):
        try:
            urllib.request.urlopen(req, timeout=4)
            break
        except Exception as e:
            print(f'[BITRIX ERROR] attempt={attempt + 1}: {e}')