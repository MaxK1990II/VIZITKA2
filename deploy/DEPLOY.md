# Деплой kanochkinmm.ru

Краткая инструкция для разработчиков и AI-агентов. Полные правила Cursor: `.cursor/rules/kanochkinmm-portfolio.mdc`.

## Быстрый цикл

```
правки → npm run dev → npm run build → git push → deploy.ps1 → проверка
```

## Локально

```powershell
cd c:\VIZITKA\kanochkinmm-portfolio
npm run dev
```

Проверка prod-сборки:

```powershell
npm run build
npm run start
```

## Прод (способ A — основной)

```powershell
cd c:\VIZITKA\kanochkinmm-portfolio\deploy
.\deploy.ps1
```

Параметры по умолчанию: IP `84.201.154.71`, ключ `C:\Prox\keys\yc-vm\ssh-key-1781809043313`.

## Проверка

```powershell
curl -H "Host: kanochkinmm.ru" http://84.201.154.71
ssh -i "C:\Prox\keys\yc-vm\ssh-key-1781809043313" ubuntu@84.201.154.71 "systemctl is-active kanochkinmm nginx"
```

## DNS

См. `REG-RU-DNS.md`. Целевой IP: **84.201.154.71**.

## Первичная настройка сервера

Только один раз: `bootstrap-site.sh` (не для обновлений контента).
