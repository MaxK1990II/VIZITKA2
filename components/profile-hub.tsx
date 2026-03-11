"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Download, ExternalLink, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

import { PROFILE } from "@/lib/site-content";
import { downloadVCard, shareOrDownloadVCard } from "@/lib/vcard";
import { PowerStackSection } from "@/components/power-stack-section";
import { TechStack } from "@/components/tech-stack";
import { ContactButton } from "@/components/contact-button";

type ProfileHubProps = {
  isMobile: boolean;
  onReturn: () => void;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

export function ProfileHub({ isMobile, onReturn }: ProfileHubProps) {
  const [shareState, setShareState] = useState<
    "idle" | "shared" | "downloaded"
  >("idle");

  const handleShare = async () => {
    try {
      const result = await shareOrDownloadVCard();
      setShareState(result);
    } catch {
      downloadVCard();
      setShareState("downloaded");
    }
  };

  return (
    <motion.main
      className="profile-hub"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
      exit={{ opacity: 0 }}
    >
      {/* Back to hero */}
      <motion.div
        className="hub-back-row"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <button
          type="button"
          className="hub-back-btn"
          data-hover
          onClick={onReturn}
        >
          <ArrowLeft size={16} />
          Назад
        </button>
      </motion.div>

      {/* Profile Card */}
      <motion.section
        className="hub-card hub-profile"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="hub-profile-photo">
          <Image
            src={PROFILE.photoSrc}
            alt={PROFILE.photoAlt}
            fill
            sizes={isMobile ? "100vw" : "320px"}
            className="hub-photo-image"
            priority
          />
          <div className="hub-photo-noise" />
        </div>

        <div className="hub-profile-info">
          <h1 className="hub-name">{PROFILE.name}</h1>
          <p className="hub-status">{PROFILE.statusLine}</p>

          <div className="hub-actions">
            <ContactButton isMobile={isMobile} onAction={handleShare} />
          </div>

          {shareState !== "idle" && (
            <p className="hub-feedback">
              {shareState === "shared"
                ? "Контакт отправлен."
                : "Файл визитки сохранён."}
            </p>
          )}
        </div>
      </motion.section>

      {/* About */}
      <motion.section
        className="hub-card hub-about"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <p className="hub-kicker">About</p>
        <p className="hub-text">{PROFILE.aboutManifesto}</p>

        <div className="hub-principles">
          {PROFILE.aboutPrinciples.map((p, i) => (
            <div key={i} className="hub-principle">
              <span className="hub-principle-line" />
              <p className="hub-text-sm">{p}</p>
            </div>
          ))}
        </div>

        <div className="hub-competencies">
          {PROFILE.aboutKeyCompetencies.map((c, i) => (
            <p key={i} className="hub-text-sm hub-competency">
              {c}
            </p>
          ))}
        </div>
      </motion.section>

      {/* Power Stack */}
      <motion.section
        className="hub-card hub-power"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <p className="hub-kicker">The Power Stack</p>
        <PowerStackSection items={PROFILE.powerStack} />
      </motion.section>

      {/* Projects */}
      <motion.section
        className="hub-card hub-projects"
        custom={4}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <p className="hub-kicker">Projects</p>
        <div className={`hub-projects-grid ${isMobile ? "is-mobile" : ""}`}>
          {PROFILE.projects.map((project) => (
            <article key={project.id} className="project-card">
              <p className="project-category">{project.category}</p>
              <h3 className="project-title">{project.title}</h3>
              <p className="hub-text-sm">{project.summary}</p>

              <div className="project-power">
                <span className="project-power-label">Power Level</span>
                <div className="project-power-bar">
                  <div
                    className="project-power-fill"
                    style={{ width: `${project.powerLevel * 10}%` }}
                  />
                </div>
                <span className="project-power-value">
                  {project.powerLevel}/10
                </span>
              </div>

              <p className="project-result">{project.result}</p>
              <TechStack technologies={project.technologies} />
            </article>
          ))}
        </div>
      </motion.section>

      {/* Contacts Terminal */}
      <motion.section
        className="hub-card hub-contacts"
        custom={5}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <p className="hub-kicker">Contact Terminal</p>
        <div className="contacts-layout">
          <div className="contacts-info">
            {PROFILE.contacts.map((c) => (
              <div key={c.id} className="contact-row">
                <span className="contact-label">{c.label}</span>
                {c.href ? (
                  <a
                    href={c.href}
                    className="contact-value contact-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={14} />
                    {c.value}
                  </a>
                ) : (
                  <span className="contact-value">{c.value}</span>
                )}
              </div>
            ))}

            <div className="contacts-actions">
              {isMobile ? (
                <button
                  type="button"
                  className="contact-cta-primary"
                  onClick={handleShare}
                >
                  <Share2 size={16} />
                  Добавить в контакты
                </button>
              ) : (
                <button
                  type="button"
                  className="contact-cta-primary"
                  data-hover
                  onClick={() => downloadVCard()}
                >
                  <Download size={16} />
                  Сохранить контакт
                </button>
              )}
            </div>
          </div>

          <div className="contacts-qr">
            <QRCodeSVG
              value={PROFILE.website}
              size={isMobile ? 160 : 200}
              marginSize={1}
              bgColor="transparent"
              fgColor="#f3f1ec"
            />
            <p className="contacts-qr-hint">Отсканируйте для перехода на сайт</p>
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
}
