import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileDown,
  Filter,
  Phone,
  MapPin,
  Copy,
  ExternalLink,
  Check,
  Sun,
  Moon,
  ArrowUpRight,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL;

// ====== PROFILE ======
const PROFILE = {
  name: "Madhu Chowdary Gattamaneni",
  tagline:
    "Data Analyst | Business Intelligence | Supply Chain Analytics | Power BI | SQL | Python",
  location: "Houston, TX",
  email: "gattamanenimadhu.999@gmail.com",
  phone: "+1-346-605-9292",
  photo: BASE + "profile.jpg",
  resume: BASE + "Resume.Madhu.pdf",
  githubProfile: "https://github.com/GattamaneniMad",
  linkedin: "https://linkedin.com/in/madhuchowdary999",
  now: "Building BI dashboards and analytics solutions across supply chain, retail, customer, and financial data",
};

// ====== SKILLS ======
const SKILLS = [
  "Power BI",
  "SQL",
  "Python",
  "Excel",
  "Tableau",
  "DAX",
  "Dashboard Design",
  "KPI Reporting",
  "Data Visualization",
  "EDA",
  "Forecasting",
  "A/B Testing",
  "Supply Chain Analytics",
  "Business Intelligence",
  "ETL",
  "Data Warehousing",
  "Pandas",
  "NumPy",
  "PostgreSQL",
  "Git",
];

// ====== PROJECTS ======
const PROJECTS = [
  {
    title: "Customer Insights Dashboard",
    category: "Analytics",
    highlight: "Customer segmentation & retention insights",
    description:
      "Delivered a customer analytics solution using Power BI and Python to identify segmentation patterns, purchase behavior trends, repeat customers, and regional distribution insights supporting retention strategy.",
    tech: ["Power BI", "Python", "Customer Analytics", "Segmentation"],
    repoUrl: "https://github.com/GattamaneniMad",
  },
  {
    title: "Financial Market Analysis",
    category: "Analytics",
    highlight: "Python & SQL time-series analysis",
    description:
      "Analyzed financial market data using SQL and Python to evaluate stock price movement, trading volume trends, monthly return patterns, and high-performing equities across market sectors.",
    tech: ["Python", "SQL", "Pandas", "Matplotlib"],
    repoUrl: "https://github.com/GattamaneniMad",
  },
  {
    title: "Supply Chain Analytics Dashboard",
    category: "Analytics",
    highlight: "Inventory, supplier & logistics KPIs",
    description:
      "Built an end-to-end Power BI supply chain dashboard with DAX modeling to track inventory turnover, supplier delivery rates, logistics KPIs, and demand variability for operational decision-making.",
    tech: ["Power BI", "DAX", "Excel", "Supply Chain Analytics"],
    repoUrl: "https://github.com/GattamaneniMad",
  },
  {
    title: "Retail Sales Analytics Dashboard",
    category: "Analytics",
    highlight: "Sales, region & product performance",
    description:
      "Developed an interactive Power BI retail analytics dashboard analyzing sales trends, regional performance, product categories, and profitability to support inventory planning and business reporting.",
    tech: ["Power BI", "Excel", "Data Visualization", "Business Intelligence"],
    repoUrl:
      "https://github.com/GattamaneniMad/Retail-Sales-Powerbi-DashBoard",
  },
  {
    title: "Brain Tumor Detection & Classification",
    category: "AI",
    highlight: "99.79% accuracy",
    description:
      "Developed a CNN-based model using ResNet50V3 for MRI brain tumor detection and classification, achieving high accuracy through transfer learning, data segmentation, and preprocessing.",
    tech: ["Python", "TensorFlow", "CNN", "Transfer Learning"],
    repoUrl: "https://github.com/GattamaneniMad/Brain-tumor",
  },
  {
    title: "Skin Lesion Classification",
    category: "AI",
    highlight: "91.48% accuracy",
    description:
      "Built an ensemble deep learning model using VGG16, InceptionResNetV2, InceptionV3, and DenseNet201 for HAM10000 skin lesion classification using transfer learning and fine-tuning.",
    tech: ["Python", "TensorFlow", "DCNN", "Ensemble Learning"],
    repoUrl: "https://github.com/GattamaneniMad/skin-lesion",
  },
  {
    title: "Leaf Tutor AI Assistant",
    category: "Systems",
    highlight: "Multi-language compiler runner",
    description:
      "Built a multi-language execution system supporting Python, Java, C, and C++ with structured output logging for debugging and AI-based code analysis.",
    tech: ["Python", "Java", "C/C++", "Automation"],
    repoUrl: "https://github.com/GattamaneniMad/LeafTutor",
  },
];

const FILTERS = ["All", "Analytics", "AI", "Systems"];

// ====== UTIL ======
function clampContainerStyle() {
  return {
    width: "min(1200px, calc(100% - 48px))",
    margin: "0 auto",
  };
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useScrollSpy(ids = []) {
  const [active, setActive] = useState(ids[0] ?? "");
  const observer = useRef(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0.1, 0.2, 0.35],
      }
    );

    elements.forEach((el) => observer.current.observe(el));
    return () => observer.current?.disconnect();
  }, [ids]);

  return active;
}

// ====== UI ======
function Chip({ children, dark }) {
  return (
    <span
      className="chip"
      style={{
        border: dark
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid #e5e7eb",
        color: dark ? "rgba(255,255,255,0.88)" : "#374151",
        background: dark ? "rgba(17,24,39,0.35)" : "#fff",
      }}
    >
      {children}
    </span>
  );
}

function Card({ children, dark, glow = false }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.002 }}
      transition={{ duration: 0.16 }}
      style={{
        border: dark
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid #f0f0f0",
        borderRadius: 22,
        background: dark ? "rgba(17,24,39,0.55)" : "#fff",
        boxShadow: dark
          ? "0 14px 42px rgba(0,0,0,0.35)"
          : "0 1px 10px rgba(0,0,0,0.04)",
        backdropFilter: "blur(14px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: -120,
            background:
              "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(circle at 80% 30%, rgba(34,211,238,0.14), transparent 55%)",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative" }}>{children}</div>
    </motion.div>
  );
}

function SectionTitle({ children, dark }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 6,
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 950,
          margin: 0,
          color: dark ? "rgba(255,255,255,0.92)" : "#111827",
          letterSpacing: -0.2,
        }}
      >
        {children}
      </h2>
      <div
        style={{
          height: 1,
          flex: 1,
          background: dark ? "rgba(255,255,255,0.12)" : "#e5e7eb",
        }}
      />
    </div>
  );
}

function Btn({ href, children, variant = "solid", dark, onClick }) {
  const solid = dark
    ? {
        background: "rgba(255,255,255,0.92)",
        color: "#0b1220",
        border: "1px solid rgba(255,255,255,0.92)",
      }
    : {
        background: "#111827",
        color: "white",
        border: "1px solid #111827",
      };

  const outline = dark
    ? {
        background: "rgba(17,24,39,0.35)",
        color: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(255,255,255,0.12)",
      }
    : {
        background: "white",
        color: "#111827",
        border: "1px solid #e5e7eb",
      };

  const style = {
    textDecoration: "none",
    padding: "11px 14px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 900,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    ...(variant === "solid" ? solid : outline),
    transition: "transform 120ms ease",
    cursor: "pointer",
  };

  if (!href) {
    return (
      <button style={style} onClick={onClick}>
        {children}
      </button>
    );
  }

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      style={style}
    >
      {children}
    </a>
  );
}

function BigProfilePhoto({ src }) {
  return (
    <div
      style={{
        width: 220,
        height: 220,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid rgba(255,255,255,0.65)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
        background: "rgba(255,255,255,0.08)",
        marginLeft: "auto",
      }}
    >
      <img
        src={src}
        alt={PROFILE.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

function CopyRow({ label, value, icon, dark, href }) {
  const [copied, setCopied] = useState(false);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        borderRadius: 16,
        border: dark
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid #e5e7eb",
        background: dark ? "rgba(17,24,39,0.35)" : "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            background: dark ? "rgba(255,255,255,0.10)" : "#f1f5f9",
            color: dark ? "rgba(255,255,255,0.9)" : "#111827",
            flex: "0 0 auto",
          }}
        >
          {icon}
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 12,
              color: dark ? "rgba(255,255,255,0.65)" : "#6b7280",
            }}
          >
            {label}
          </div>

          {href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              style={{
                display: "inline-flex",
                gap: 6,
                alignItems: "center",
                textDecoration: "none",
                color: dark ? "rgba(255,255,255,0.92)" : "#111827",
                fontWeight: 900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {value}
              </span>
              <ExternalLink size={14} />
            </a>
          ) : (
            <div
              style={{
                color: dark ? "rgba(255,255,255,0.92)" : "#111827",
                fontWeight: 900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
              title={value}
            >
              {value}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={doCopy}
        style={{
          border: "none",
          background: dark ? "rgba(255,255,255,0.10)" : "#f1f5f9",
          color: dark ? "rgba(255,255,255,0.9)" : "#111827",
          borderRadius: 12,
          padding: "8px 10px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 900,
        }}
        title="Copy"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay }}
    >
      {children}
    </motion.div>
  );
}

// ====== MAIN ======
export default function App() {
  const [active, setActive] = useState("All");
  const [dark, setDark] = useState(true);

  const sectionIds = ["top", "about", "projects", "contact"];
  const spy = useScrollSpy(sectionIds);

  const filtered = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest?.("a[href^='#']");
      if (!a) return;

      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const pageBg = dark
    ? {
        background:
          "radial-gradient(1100px 600px at 20% 8%, rgba(99,102,241,0.20), transparent 55%), radial-gradient(900px 520px at 70% 20%, rgba(34,211,238,0.15), transparent 60%), linear-gradient(180deg, #070b14 0%, #050810 100%)",
        color: "rgba(255,255,255,0.92)",
      }
    : {
        background:
          "radial-gradient(900px 520px at 20% 10%, rgba(99,102,241,0.12), transparent 55%), radial-gradient(900px 520px at 70% 20%, rgba(34,211,238,0.10), transparent 60%), #f8fafc",
        color: "#111827",
      };

  return (
    <div id="top" style={{ minHeight: "100vh", ...pageBg }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: dark ? "rgba(7,11,20,0.78)" : "rgba(248,250,252,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: dark
            ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            ...clampContainerStyle(),
            padding: "12px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ fontWeight: 950, fontSize: 14, letterSpacing: 0.2 }}>
            Madhu Gattamaneni
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Btn onClick={() => setDark((v) => !v)} variant="outline" dark={dark}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}{" "}
              {dark ? "Light" : "Dark"}
            </Btn>

            <Btn href={PROFILE.resume} variant="outline" dark={dark}>
              <FileDown size={16} /> Resume
            </Btn>

            <Btn href={PROFILE.githubProfile} variant="outline" dark={dark}>
              <Github size={16} /> GitHub
            </Btn>

            <Btn href={PROFILE.linkedin} variant="outline" dark={dark}>
              <Linkedin size={16} /> LinkedIn
            </Btn>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 50,
          display: "grid",
          gap: 10,
        }}
      >
        <Btn href={PROFILE.resume} variant="solid" dark={dark}>
          <FileDown size={16} /> Resume
        </Btn>

        <Btn href={`mailto:${PROFILE.email}`} variant="outline" dark={dark}>
          <Mail size={16} /> Email
        </Btn>

        <Btn href={PROFILE.linkedin} variant="outline" dark={dark}>
          <Linkedin size={16} /> LinkedIn
        </Btn>
      </div>

      <main style={{ ...clampContainerStyle(), padding: "26px 0 46px" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 14,
          }}
        >
          {[
            { id: "top", label: "Top" },
            { id: "about", label: "About" },
            { id: "projects", label: "Projects" },
            { id: "contact", label: "Contact" },
          ].map((x) => (
            <button
              key={x.id}
              onClick={() => scrollToId(x.id)}
              style={{
                borderRadius: 999,
                padding: "8px 12px",
                border:
                  spy === x.id
                    ? dark
                      ? "1px solid rgba(255,255,255,0.85)"
                      : "1px solid #111827"
                    : dark
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid #e5e7eb",
                background:
                  spy === x.id
                    ? dark
                      ? "rgba(255,255,255,0.92)"
                      : "#111827"
                    : dark
                    ? "rgba(17,24,39,0.35)"
                    : "#fff",
                color:
                  spy === x.id
                    ? dark
                      ? "#0b1220"
                      : "#fff"
                    : dark
                    ? "rgba(255,255,255,0.90)"
                    : "#111827",
                cursor: "pointer",
                fontWeight: 900,
                fontSize: 13,
              }}
            >
              {x.label}
            </button>
          ))}
        </div>

        <Reveal>
          <motion.section
            style={{
              border: dark
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid #e5e7eb",
              borderRadius: 28,
              padding: 26,
              background: dark ? "rgba(10,14,26,0.55)" : "#fff",
              boxShadow: dark
                ? "0 22px 70px rgba(0,0,0,0.55)"
                : "0 1px 12px rgba(0,0,0,0.05)",
              backdropFilter: "blur(16px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -160,
                background:
                  "radial-gradient(circle at 12% 20%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(circle at 78% 30%, rgba(34,211,238,0.14), transparent 55%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 360px",
                gap: 24,
                alignItems: "center",
              }}
            >
              <div style={{ minWidth: 260 }}>
                <div
                  style={{
                    display: "inline-flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <Chip dark={dark}>Now: {PROFILE.now}</Chip>
                </div>

                <h1
                  style={{
                    fontSize: 46,
                    margin: "10px 0 0",
                    letterSpacing: -0.8,
                    fontWeight: 980,
                  }}
                >
                  {PROFILE.name}
                </h1>

                <p
                  style={{
                    margin: "10px 0 0",
                    color: dark ? "rgba(255,255,255,0.78)" : "#4b5563",
                    fontSize: 18,
                  }}
                >
                  {PROFILE.tagline}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 14,
                  }}
                >
                  {SKILLS.map((skill) => (
                    <Chip key={skill} dark={dark}>
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <BigProfilePhoto src={PROFILE.photo} />

                <div style={{ display: "grid", gap: 10 }}>
                  <Btn onClick={() => scrollToId("projects")} variant="solid" dark={dark}>
                    View Projects <ArrowUpRight size={16} />
                  </Btn>

                  <Btn href={PROFILE.resume} variant="outline" dark={dark}>
                    <FileDown size={16} /> Download Resume
                  </Btn>

                  <Btn href={`mailto:${PROFILE.email}`} variant="outline" dark={dark}>
                    <Mail size={16} /> Contact
                  </Btn>
                </div>
              </div>
            </div>

            <style>
              {`
                @media (max-width: 980px) {
                  main section:first-of-type > div {
                    grid-template-columns: 1fr !important;
                  }
                }
              `}
            </style>
          </motion.section>
        </Reveal>

        <section id="about" style={{ marginTop: 26 }}>
          <Reveal>
            <SectionTitle dark={dark}>About</SectionTitle>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 14,
              marginTop: 14,
            }}
          >
            <Reveal delay={0.05}>
              <Card dark={dark} glow>
                <div style={{ padding: 18 }}>
                  <div
                    style={{
                      color: dark ? "rgba(255,255,255,0.65)" : "#6b7280",
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    Quick summary
                  </div>

                  <p
                    style={{
                      marginTop: 10,
                      lineHeight: 1.65,
                      color: dark ? "rgba(255,255,255,0.86)" : "#111827",
                    }}
                  >
                    I’m a Data Science graduate student at the University of
                    Houston–Clear Lake with hands-on experience delivering
                    analytics solutions using Power BI, SQL, Python, and Excel.
                    I focus on business intelligence, supply chain analytics,
                    retail analytics, customer insights, and financial data
                    analysis.
                  </p>

                  <p
                    style={{
                      marginTop: 12,
                      lineHeight: 1.65,
                      color: dark ? "rgba(255,255,255,0.78)" : "#374151",
                    }}
                  >
                    My work focuses on transforming complex datasets into
                    dashboards, KPI reports, and actionable insights that support
                    operational efficiency, forecasting, and strategic
                    decision-making.
                  </p>
                </div>
              </Card>
            </Reveal>

            <div style={{ display: "grid", gap: 14 }}>
              <Reveal delay={0.08}>
                <Card dark={dark}>
                  <div style={{ padding: 18 }}>
                    <div style={{ fontWeight: 950, fontSize: 16 }}>
                      Open to roles
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        color: dark ? "rgba(255,255,255,0.72)" : "#6b7280",
                        fontSize: 13,
                      }}
                    >
                      Data Analyst • Business Analyst • BI Analyst • Supply Chain
                      Analyst • Operations Analyst
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={0.12}>
                <Card dark={dark}>
                  <div style={{ padding: 18 }}>
                    <div style={{ fontWeight: 950, fontSize: 16 }}>
                      Business domains
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        color: dark ? "rgba(255,255,255,0.72)" : "#6b7280",
                        fontSize: 13,
                      }}
                    >
                      Supply Chain Analytics • Retail Analytics • Customer
                      Analytics • Financial Analytics • Business Intelligence
                    </div>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>

          <style>
            {`
              @media (max-width: 980px) {
                #about > div { grid-template-columns: 1fr !important; }
              }
            `}
          </style>
        </section>

        <section id="projects" style={{ marginTop: 26 }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 12,
              }}
            >
              <SectionTitle dark={dark}>Projects</SectionTitle>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    gap: 6,
                    alignItems: "center",
                    color: dark ? "rgba(255,255,255,0.65)" : "#6b7280",
                    fontSize: 13,
                    fontWeight: 800,
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
                      border:
                        active === f
                          ? dark
                            ? "1px solid rgba(255,255,255,0.80)"
                            : "1px solid #111827"
                          : dark
                          ? "1px solid rgba(255,255,255,0.12)"
                          : "1px solid #e5e7eb",
                      background:
                        active === f
                          ? dark
                            ? "rgba(255,255,255,0.92)"
                            : "#111827"
                          : dark
                          ? "rgba(17,24,39,0.35)"
                          : "#fff",
                      color:
                        active === f
                          ? dark
                            ? "#0b1220"
                            : "#fff"
                          : dark
                          ? "rgba(255,255,255,0.9)"
                          : "#111827",
                      cursor: "pointer",
                      fontWeight: 900,
                      fontSize: 13,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
            {filtered.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.04, 0.18)}>
                <Card dark={dark}>
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
                          <h3
                            style={{
                              margin: 0,
                              fontSize: 18,
                              fontWeight: 980,
                            }}
                          >
                            {p.title}
                          </h3>
                          <Chip dark={dark}>{p.category}</Chip>
                          <Chip dark={dark}>{p.highlight}</Chip>
                        </div>

                        <p
                          style={{
                            margin: "10px 0 0",
                            color: dark ? "rgba(255,255,255,0.75)" : "#4b5563",
                            lineHeight: 1.55,
                          }}
                        >
                          {p.description}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                            marginTop: 10,
                          }}
                        >
                          {p.tech.map((t) => (
                            <Chip key={t} dark={dark}>
                              {t}
                            </Chip>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "start" }}>
                        <Btn href={p.repoUrl} variant="outline" dark={dark}>
                          <Github size={16} /> Repo <ArrowUpRight size={16} />
                        </Btn>
                      </div>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" style={{ marginTop: 26 }}>
          <Reveal>
            <SectionTitle dark={dark}>Contact</SectionTitle>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginTop: 14,
            }}
          >
            <Reveal delay={0.05}>
              <Card dark={dark} glow>
                <div style={{ padding: 18 }}>
                  <div style={{ fontWeight: 980, fontSize: 16 }}>
                    Contact details
                  </div>

                  <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                    <CopyRow
                      label="Email"
                      value={PROFILE.email}
                      icon={<Mail size={16} />}
                      dark={dark}
                      href={`mailto:${PROFILE.email}`}
                    />

                    <CopyRow
                      label="Phone"
                      value={PROFILE.phone}
                      icon={<Phone size={16} />}
                      dark={dark}
                      href={`tel:${PROFILE.phone}`}
                    />

                    <CopyRow
                      label="Location"
                      value={PROFILE.location}
                      icon={<MapPin size={16} />}
                      dark={dark}
                    />

                    <CopyRow
                      label="LinkedIn"
                      value="linkedin.com/in/madhuchowdary999"
                      icon={<Linkedin size={16} />}
                      dark={dark}
                      href={PROFILE.linkedin}
                    />

                    <CopyRow
                      label="GitHub"
                      value="github.com/GattamaneniMad"
                      icon={<Github size={16} />}
                      dark={dark}
                      href={PROFILE.githubProfile}
                    />
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.09}>
              <Card dark={dark}>
                <div style={{ padding: 18 }}>
                  <div style={{ fontWeight: 980, fontSize: 16 }}>
                    Quick message
                  </div>

                  <p
                    style={{
                      marginTop: 10,
                      color: dark ? "rgba(255,255,255,0.78)" : "#4b5563",
                      lineHeight: 1.6,
                    }}
                  >
                    For analyst roles, internships, collaborations, or project
                    discussions — feel free to reach out. I usually respond within
                    24–48 hours.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginTop: 12,
                    }}
                  >
                    <Btn
                      href={`mailto:${PROFILE.email}?subject=Data%20Analyst%20Opportunity&body=Hi%20Madhu%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20connect.%0A%0AThanks%2C`}
                      variant="solid"
                      dark={dark}
                    >
                      <Mail size={16} /> Email me
                    </Btn>

                    <Btn href={PROFILE.linkedin} variant="outline" dark={dark}>
                      <Linkedin size={16} /> Connect
                    </Btn>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>

          <style>
            {`
              .chip{
                display:inline-flex;
                align-items:center;
                border-radius:999px;
                padding:7px 11px;
                font-size:12px;
                font-weight:850;
                white-space:nowrap;
                backdrop-filter: blur(10px);
              }

              @media (max-width: 980px) {
                #contact > div { grid-template-columns: 1fr !important; }
              }
            `}
          </style>
        </section>

        <Reveal delay={0.05}>
          <footer
            style={{
              marginTop: 22,
              paddingTop: 18,
              borderTop: dark
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid #e5e7eb",
              color: dark ? "rgba(255,255,255,0.55)" : "#6b7280",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
              fontSize: 12,
            }}
          >
            <div>
              © {new Date().getFullYear()} {PROFILE.name}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="#top"
                style={{ textDecoration: "none", fontWeight: 900, color: "inherit" }}
              >
                Top
              </a>
              <a
                href="#projects"
                style={{ textDecoration: "none", fontWeight: 900, color: "inherit" }}
              >
                Projects
              </a>
              <a
                href="#contact"
                style={{ textDecoration: "none", fontWeight: 900, color: "inherit" }}
              >
                Contact
              </a>
            </div>
          </footer>
        </Reveal>
      </main>
    </div>
  );
}