"use client";

import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import {
  CONTACT_ACTIONS,
  CONTACT_INTRO,
  type ContactAction,
} from "@/lib/site-content";

import { PanelShell } from "./panel-shell";

type ContactPanelProps = {
  open: boolean;
  onClose: () => void;
};

function ContactCard({
  action,
  onCopy,
}: {
  action: ContactAction;
  onCopy: (value: string) => void;
}) {
  const isReady = Boolean(action.href);

  return (
    <article className="contact-card">
      <div className="contact-card-top">
        <p className="contact-label">{action.label}</p>
        <span className={`contact-status ${isReady ? "is-ready" : "is-pending"}`}>
          {isReady ? "Live" : "Setup"}
        </span>
      </div>
      <p className="contact-value">{action.value}</p>
      <p className="contact-note">{action.note}</p>
      <div className="contact-card-actions">
        {isReady ? (
          <a href={action.href} className="contact-link" data-hover>
            Открыть
          </a>
        ) : (
          <span className="contact-link is-disabled">Добавить данные</span>
        )}
        <button
          type="button"
          className="contact-copy"
          onClick={() => onCopy(action.copyValue ?? action.value)}
          data-hover
        >
          Скопировать
        </button>
      </div>
    </article>
  );
}

export function ContactPanel({ open, onClose }: ContactPanelProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const qrValue = useMemo(() => CONTACT_INTRO.qrValue, []);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedText(value);
      window.setTimeout(() => setCopiedText(null), 1800);
    } catch {
      setCopiedText("Ошибка буфера обмена");
      window.setTimeout(() => setCopiedText(null), 1800);
    }
  };

  return (
    <PanelShell
      open={open}
      onClose={onClose}
      eyebrow={CONTACT_INTRO.eyebrow}
      title={CONTACT_INTRO.title}
      description={CONTACT_INTRO.description}
    >
      <div className="contact-grid">
        {CONTACT_ACTIONS.map((action) => (
          <ContactCard key={action.id} action={action} onCopy={handleCopy} />
        ))}
      </div>

      <div className="contact-secondary-grid">
        <article className="contact-download-card">
          <p className="contact-label">vCard</p>
          <h3 className="contact-secondary-title">Сохранить визитку</h3>
          <p className="contact-note">
            Файл уже подключён как отдельный ресурс. После замены контактных
            значений его можно мгновенно сохранять в адресную книгу.
          </p>
          <div className="contact-card-actions">
            <a
              href={CONTACT_INTRO.vcardHref}
              download
              className="contact-link"
              data-hover
            >
              Скачать .vcf
            </a>
            <a
              href={CONTACT_INTRO.website}
              target="_blank"
              rel="noreferrer"
              className="contact-copy"
              data-hover
            >
              Открыть сайт
            </a>
          </div>
        </article>

        <article className="contact-qr-card">
          <p className="contact-label">QR</p>
          <h3 className="contact-secondary-title">Быстрый перенос</h3>
          <p className="contact-note">
            Отсканируйте код с другого устройства, чтобы быстро открыть карточку
            контакта или сам сайт.
          </p>
          <div className="contact-qr-frame" aria-label="QR-код сайта">
            <QRCodeSVG
              value={qrValue}
              size={176}
              marginSize={2}
              bgColor="transparent"
              fgColor="#f2f5f8"
            />
          </div>
        </article>
      </div>

      <div className="contact-footer">
        <p className="contact-footnote">
          Статусы Setup отмечают поля, для которых ещё не внесены публичные
          данные. Структура готова, достаточно подставить реальные значения.
        </p>
        <span className="contact-copy-feedback">
          {copiedText ? `Скопировано: ${copiedText}` : " "}
        </span>
      </div>
    </PanelShell>
  );
}
