import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, Filter } from "lucide-react";

// IMPORTANT: This makes paths work for BOTH localhost and GitHub Pages
const BASE = import.meta.env.BASE_URL;

const LINKS = {
  githubProfile: "https://github.com/GattamaneniMad",
  linkedin: "https://linkedin.com/in/madhuchowdary999",
  email: "mailto:gattamanenimadhu.999@gmail.com",
  // Put your resume PDF in /public with this exact name
  resume: BASE + "Madhu_Chowdary_Gattamaneni_One_Page_Resume.pdf",
};

const SKILLS = [
  "Python",
  "SQL",
  "Pandas",
  "NumPy",
  "Scikit-Learn",
  "TensorFlow",
  "PyTorch",
  "Computer Vision",
  "NLP",
  "EDA",
  "Feature Engineering",
  "Model Evaluation",
  "Data Visualization",
  "Matplotlib",
  "Seaborn",
  "Power BI",
  "Tableau",
  "Git/GitHub",
  "Docker",
  "Linux",
  "AWS",
  "Spark",
];

const PROJECTS = [
  {
    title: "Brain Tumor Classification",
    category: "CV",
    highlight: "99.79% accuracy (ResNet50V3)",
    description:
      "MRI-based brain tumor classification using transfer learning; compared multiple CNN architectures.",
    tech: ["Python", "TensorFlow", "CNN", "Transfer Learning"],
    repoUrl: "https://github.com/GattamaneniMad/Brain-tumor",
  },
  {
    title: "Skin Lesion Classification",
    category: "CV",
    highlight: "91.48% accuracy (Ensemble DCNNs)",
    description:
      "Skin lesion classification using HAM10000 dataset with ensemble learning and fine-tuned pre-trained models.",
    tech: ["Python", "TensorFlow", "DCNN", "Ensemble"],
    repoUrl: "https://github.com/GattamaneniMad/skin-lesion",
  },
  {
    title: "Leaf Tutor",
    category: "Systems",
    highlight: "Secure multi-language code runner",
    description:
      "Capstone group project: sandboxed multi-language compilation/execution platform (Python/Java/C/C++), multi-file support.",
    tech: ["Python", "CLI", "Sandboxing", "Git"],
    repoUrl: "https://github.com/GattamaneniMad/LeafTutor",
  },
  {
    title: "Fake News Detection",
    category: "NLP",
    highlight: "TF-IDF + Logistic Regression",
    description:
      "NLP pipeline for detecting fake news with TF-IDF vectorization and classification metrics.",
    tech: ["Python", "NLP", "Scikit-Learn"],
    repoUrl: "https://github.com/GattamaneniMad",
  },
];

const FILTERS = ["All", "ML", "CV", "NLP", "Systems"];

function Chip({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid #e5e7eb",
        borderRadius: 999,
        padding: "6px 10px",
        fontSize: 12,
        color: "#374151",
        background: "#fff",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: 20,
        background: "#fff",
        boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{children}</h2>
      <div style={{ height: 1, flex: 1, background: "#e5e7eb" }} />
    </div>
  );
}

function Btn({ href, children, variant = "solid" }) {
  const solid = {
    background: "#111827",
    color: "white",
    border: "1px solid #111827",
  };
  const outline = {
    background: "white",
    color: "#111827",
    border: "1px solid #e5e7eb",
  };

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      style={{
        textDecoration: "none",
        padding: "10px 14px",
        borderRadius: 14,
        fontSize: 14,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        ...(variant === "solid" ? solid : outline),
      }}
    >
      {children}
    </a>
  );
}

function BigProfilePhoto() {
  return (
    <div
      style={{
        width: 220,
        height: 220,
        borderRadius: "50%",
        overflow: "hidden",
        border: "4px solid #111827",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        background: "#fff",
        marginLeft: "auto",
      }}
    >
      <img
        src={BASE + "profile.jpg"}
        alt="Madhu Chowdary Gattamaneni"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#111827" }}>
      {/* Top Bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(248,250,252,0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "12px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 14 }}>Madhu Gattamaneni</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Btn href={LINKS.resume} variant="outline">
              <FileDown size={16} /> Resume
            </Btn>
            <Btn href={LINKS.githubProfile} variant="outline">
              <Github size={16} /> GitHub
            </Btn>
            <Btn href={LINKS.linkedin} variant="outline">
              <Linkedin size={16} /> LinkedIn
            </Btn>
          </div>
        </div>
      </div>

      {/* MAIN: make it centered and remove huge blank area */}
      <main
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "28px 24px",
        }}
      >
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 26,
            padding: 26,
            background: "#fff",
            boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 260px",
              gap: 24,
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div style={{ minWidth: 260 }}>
              <h1 style={{ fontSize: 42, margin: 0, letterSpacing: -0.5 }}>
                Madhu Chowdary Gattamaneni
              </h1>
              <p style={{ margin: "10px 0 0", color: "#4b5563", fontSize: 18 }}>
                MS Data Science | Machine Learning & AI | Medical Image Classification | AWS
                Certification (In Progress)
              </p>

              {/* Skills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {SKILLS.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <BigProfilePhoto />
              <Btn href="#projects">View Projects</Btn>
              <Btn href={LINKS.resume} variant="outline">
                <FileDown size={16} /> Download Resume
              </Btn>
              <Btn href={LINKS.email} variant="outline">
                <Mail size={16} /> Contact
              </Btn>
            </div>
          </div>

          {/* Mobile fix */}
          <style>
            {`
              @media (max-width: 900px) {
                main > section:first-of-type > div {
                  grid-template-columns: 1fr !important;
                }
              }
            `}
          </style>
        </motion.section>

        {/* Featured */}
        <section style={{ marginTop: 34 }}>
          <SectionTitle>Featured Highlights</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
              marginTop: 14,
            }}
          >
            <Card>
              <div style={{ padding: 18 }}>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Research</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginTop: 6 }}>Medical AI</div>
                <p style={{ color: "#4b5563", fontSize: 14, marginTop: 8 }}>
                  Brain tumor & skin lesion classification using transfer learning and ensemble DCNNs.
                </p>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Engineering</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginTop: 6 }}>
                  Secure Code Execution
                </div>
                <p style={{ color: "#4b5563", fontSize: 14, marginTop: 8 }}>
                  Leaf Tutor capstone: sandboxed multi-language runner with multi-file compilation.
                </p>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Career</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginTop: 6 }}>
                  Open to Internships
                </div>
                <p style={{ color: "#4b5563", fontSize: 14, marginTop: 8 }}>
                  Data Science / ML / AI roles — building cloud-ready ML skills.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" style={{ marginTop: 34 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 12,
            }}
          >
            <SectionTitle>Projects</SectionTitle>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  gap: 6,
                  alignItems: "center",
                  color: "#6b7280",
                  fontSize: 13,
                }}
              >
                <Filter size={16} /> Filter:
              </div>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  style={{
                    borderRadius: 999,
                    padding: "8px 12px",
                    border: active === f ? "1px solid #111827" : "1px solid #e5e7eb",
                    background: active === f ? "#111827" : "#fff",
                    color: active === f ? "#fff" : "#111827",
                    cursor: "pointer",
                    fontWeight: 800,
                    fontSize: 13,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
            {filtered.map((p) => (
              <Card key={p.title}>
                <div style={{ padding: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ minWidth: 260, flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <h3 style={{ margin: 0, fontSize: 18 }}>{p.title}</h3>
                        <Chip>{p.category}</Chip>
                        <Chip>{p.highlight}</Chip>
                      </div>
                      <p style={{ margin: "10px 0 0", color: "#4b5563" }}>{p.description}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                        {p.tech.map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "start" }}>
                      <Btn href={p.repoUrl} variant="outline">
                        <Github size={16} /> Repo
                      </Btn>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p style={{ marginTop: 10, color: "#6b7280", fontSize: 13 }}>
            Tip: make sure each project has the exact <b>repoUrl</b> to the correct GitHub repository.
          </p>
        </section>

        {/* Contact */}
        <section
          style={{
            marginTop: 40,
            border: "1px solid #e5e7eb",
            borderRadius: 26,
            padding: 24,
            textAlign: "center",
            background: "#fff",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22 }}>Contact</h2>
          <p style={{ marginTop: 8, color: "#4b5563" }}>
            Reach out for internships, collaborations, or project discussions.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 16 }}>
            <a href={LINKS.email} aria-label="Email">
              <Mail />
            </a>
            <a href={LINKS.githubProfile} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin />
            </a>
          </div>
          <p style={{ marginTop: 14, color: "#9ca3af", fontSize: 12 }}>
            © {new Date().getFullYear()} Madhu Gattamaneni
          </p>
        </section>
      </main>
    </div>
  );
}