# DNS на REG.RU для kanochkinmm.ru

Текущий IP сервера: **84.201.154.71**

1. Войти: https://www.reg.ru/user/account/card/109238663/nss/
2. DNS-серверы: **Бесплатные DNS-серверы Reg.ru** (`ns1.reg.ru`, `ns2.reg.ru`)
3. Записи в зоне:

| Тип | Имя (поддомен) | Значение       | TTL  |
|-----|----------------|----------------|------|
| A   | @              | 84.201.154.71  | 3600 |
| A   | www            | 84.201.154.71  | 3600 |

4. Удалить старые записи на `103.76.54.135`, если остались.
5. Смена может занять от нескольких минут до нескольких часов.

Проверка:

```powershell
nslookup -type=NS kanochkinmm.ru 8.8.8.8
nslookup kanochkinmm.ru 8.8.8.8
curl -H "Host: kanochkinmm.ru" http://84.201.154.71
curl -I https://kanochkinmm.ru
```

HTTPS: на сервере certbot (cron каждые 2 ч) после обновления глобального DNS.
