import { ArrowUpRight, ChatCircleText, GithubLogo, PaperPlaneTilt, Table, TreeStructure } from '@phosphor-icons/react'
import { STUDY_BOT } from '../data.js'
import Modal from './Modal.jsx'

const FLOW_ICONS = {
  message: ChatCircleText,
  n8n: TreeStructure,
  sheets: Table,
  reply: PaperPlaneTilt,
}

// Renders text between backticks as inline code.
const withCode = (text) =>
  text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))

export default function StudyBotModal({ onClose }) {
  return (
    <Modal titleId="study-bot-title" closeLabel="Close Study Tracker Bot details" onClose={onClose}>
      {(openLightbox) => (
        <>
          <div className="modal-head">
            <span className="badge-sample">{STUDY_BOT.badge}</span>
            <h2 id="study-bot-title">Study Tracker Bot</h2>
          </div>

          <section className="summary-block" aria-labelledby="bot-problem">
            <h3 id="bot-problem">Problem</h3>
            <p>{STUDY_BOT.problem}</p>
          </section>

          <section className="summary-block" aria-labelledby="bot-built">
            <h3 id="bot-built">What I built</h3>
            <p>{withCode(STUDY_BOT.built)}</p>
            <ol className="flow" aria-label="How a message moves through the workflow">
              {STUDY_BOT.flow.map((node) => {
                const Icon = FLOW_ICONS[node.id]
                return (
                  <li className={`flow-node flow-node--${node.id}`} key={node.id}>
                    <span className="flow-head">
                      <Icon size={20} weight="duotone" aria-hidden="true" />
                      {node.title}
                    </span>
                    <ul className="flow-steps">
                      {node.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ol>
          </section>

          <section className="summary-block" aria-labelledby="bot-does">
            <h3 id="bot-does">What it does</h3>
            <p>{STUDY_BOT.does}</p>
          </section>

          <section className="summary-block" aria-labelledby="bot-shots">
            <h3 id="bot-shots">Screenshots</h3>
            <div className="bot-shots">
              {STUDY_BOT.images.map((img, i) => (
                <figure className={`bot-shot${img.w > 1000 ? ' bot-shot--wide' : ''}`} key={img.src}>
                  <button
                    type="button"
                    className="bot-shot-btn"
                    aria-haspopup="dialog"
                    onClick={(e) => openLightbox(STUDY_BOT.images, i, e.currentTarget.closest('.bot-shots'))}
                  >
                    <img src={img.src} width={img.w} height={img.h} alt={img.alt} loading="lazy" decoding="async" />
                  </button>
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <div className="summary-file">
            <a className="btn btn--primary" href={STUDY_BOT.repoUrl} target="_blank" rel="noreferrer">
              <GithubLogo size={18} weight="fill" aria-hidden="true" />
              View workflow on GitHub
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </>
      )}
    </Modal>
  )
}
