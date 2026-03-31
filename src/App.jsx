import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

const projects = [
  {
    id: "three-tier",
    title: "Three-Tier App Deployment",
    description: "End-to-end CI/CD pipeline using Jenkins, Docker, Kubernetes and Terraform on AWS EKS with zero-touch deployment.",
    link: "https://github.com/suryayerra/3-Tier-Full-Stack-yelp-camp",
    tags: ["Kubernetes", "Terraform", "Jenkins", "AWS EKS", "Docker", "ECR"],
    color: "#00d9ff",
    details: "This project involved the end-to-end design and implementation of a highly available, secure, and scalable three-tier web application architecture leveraging a modern DevOps toolchain. I utilized Terraform as the Infrastructure as Code (IaC) engine to provision a robust AWS environment, including a custom Virtual Private Cloud (VPC) with isolated public and private subnets, an Application Load Balancer, and an Amazon Elastic Kubernetes Service (EKS) cluster. To automate the software delivery lifecycle, I engineered a sophisticated Jenkins CI/CD pipeline that triggers automatically upon code commits, executing stages for code linting, unit testing, and building optimized Docker images for both the frontend and backend services. These containerized components were versioned and pushed to Amazon Elastic Container Registry (ECR) for secure storage. The application deployment was orchestrated through Kubernetes, where I managed the container lifecycle using Deployment and Service manifests to ensure self-healing capabilities and seamless traffic routing. For the data tier, I integrated Amazon RDS within a private subnet, restricting direct internet access to ensure maximum data security while maintaining high availability across multiple availability zones."
  },
  {
    id: "legacy",
    title: "Legacy App Migration",
    description: "Migrated on-premise monolith to AWS microservices architecture using ECS, RDS, and SQS with zero downtime.",
    link: "https://github.com/suryayerra/devsecops-project",
    tags: ["AWS ECS", "Docker", "Microservices", "RDS", "SQS"],
    color: "#10b981",
    details: "To modernize our infrastructure, we successfully migrated our on-premises application to a microservices architecture on AWS using a phased lift-and-shift and refactoring approach. We began by breaking down the original monolithic codebase into smaller, independent services, each managed within Docker containers for consistency. These services are now hosted on Amazon ECS (Elastic Container Service), which automatically handles scaling and load balancing based on real-time traffic. For data management, we moved away from a single shared server to Amazon RDS, ensuring each microservice has its own dedicated database to prevent bottlenecks. To keep the system reliable, we integrated Amazon SQS for secure messaging between services, ensuring that if one part of the app experiences a delay, the rest remains functional. This transition has significantly improved our deployment speed and system uptime, allowing us to push updates without taking the entire application offline."
  },
  {
    id: "terraform",
    title: "AWS Infrastructure Automation",
    description: "Eliminated manual click-ops by automating the entire AWS ecosystem with Terraform IaC — version controlled and peer-reviewed.",
    link: "https://github.com/your-repo-3",
    tags: ["Terraform", "AWS VPC", "IaC", "GitHub", "Security Groups"],
    color: "#7c3aed",
    details: "To modernize our infrastructure and eliminate the risks associated with manual environment configuration, we undertook a comprehensive project to automate our entire AWS cloud ecosystem using Terraform as our primary Infrastructure as Code (IaC) tool. The project began with a rigorous audit of our existing on-premises and early-stage cloud resources to identify core components that required standardization, including Virtual Private Clouds (VPCs), subnets, routing tables, and security groups. By adopting a code-first philosophy, we transitioned away from the AWS Management Console's manual click-ops approach, which was prone to human error and configuration drift, to a fully version-controlled repository hosted on GitHub. This shift allowed our engineering team to treat infrastructure with the same rigor as application code, enabling peer reviews, automated testing, and a clear audit trail for every architectural change."
  }
];

const skills = [
  { name: "Docker", color: "#00d9ff", level: 90 },
  { name: "Kubernetes", color: "#326ce5", level: 85 },
  { name: "AWS", color: "#ff9900", level: 88 },
  { name: "Terraform", color: "#7b42bc", level: 82 },
  { name: "Jenkins", color: "#d33833", level: 87 },
  { name: "Git", color: "#f05032", level: 92 },
  { name: "Linux", color: "#fcc624", level: 90 },
  { name: "Prometheus", color: "#e6522c", level: 75 },
];

const tagColors = {
  "Kubernetes": "blue", "Terraform": "purple", "Jenkins": "red",
  "AWS EKS": "blue", "Docker": "blue", "ECR": "green",
  "AWS ECS": "green", "Microservices": "purple", "RDS": "green",
  "SQS": "orange", "AWS VPC": "blue", "IaC": "purple",
  "GitHub": "gray", "Security Groups": "red",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimatedSection({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function SkillBar({ skill, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: `all 0.5s ease ${index * 0.07}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#e2e8f0" }}>{skill.name}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#64748b" }}>{skill.level}%</span>
      </div>
      <div style={{ height: 4, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 4,
          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
          width: inView ? `${skill.level}%` : "0%",
          transition: `width 1s ease ${index * 0.1}s`,
          boxShadow: `0 0 8px ${skill.color}66`
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.5s ease ${index * 0.1}s`
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "rgba(0,217,255,0.03)" : "#111827",
          border: `1px solid ${hovered ? "rgba(0,217,255,0.25)" : "#1e293b"}`,
          borderRadius: 14,
          padding: "22px 24px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.25s ease",
        }}
      >
        {/* top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${project.color}, ${project.color}55)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease"
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: project.color, boxShadow: `0 0 8px ${project.color}` }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>{project.title}</h3>
          </div>
          <div style={{
            width: 30, height: 30, borderRadius: 7, border: `1px solid ${hovered ? project.color : "#1e293b"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: hovered ? project.color : "#64748b", fontSize: 14, transition: "all 0.25s ease", flexShrink: 0
          }}>↗</div>
        </div>

        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 14 }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: "3px 9px", borderRadius: 5, fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
              background: `${project.color}15`, color: project.color,
              border: `1px solid ${project.color}30`
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            style={{
              background: "transparent", border: `1px solid ${project.color}40`,
              color: project.color, padding: "7px 16px", borderRadius: 7,
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer", transition: "all 0.2s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${project.color}15`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            view details →
          </button>
          <button
            onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
            style={{
              background: "transparent", border: "1px solid #1e293b",
              color: "#64748b", padding: "7px 16px", borderRadius: 7,
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer", transition: "all 0.2s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#64748b"; e.currentTarget.style.color = "#e2e8f0"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
          >
            github ↗
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 40px", height: 60,
        background: scrolled ? "rgba(10,14,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1e293b" : "1px solid transparent",
        transition: "all 0.3s ease"
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#00d9ff" }}>
          <span style={{ color: "#64748b" }}>~/</span>surya.yerra
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["about", "skills", "projects", "contact"].map(item => (
            <a key={item} href={`#${item}`} style={{
              fontSize: 13, color: "#64748b", textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "color 0.2s ease"
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#00d9ff"}
              onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
            >{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 40px 60px", position: "relative", overflow: "hidden" }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(0,217,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,217,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "20%", left: "60%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)", zIndex: 0, animation: "float 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", zIndex: 0, animation: "float 8s ease-in-out infinite 1s" }} />

        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
            background: "rgba(0,217,255,0.06)", border: "1px solid rgba(0,217,255,0.18)",
            borderRadius: 20, padding: "6px 14px",
            animation: "fadeUp 0.6s ease both"
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00d9ff", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#00d9ff" }}>available for work</span>
          </div>

          {/* Name */}
          <h1 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 16, animation: "fadeUp 0.6s ease 0.1s both" }}>
            Hi, I'm{" "}
            <span style={{ background: "linear-gradient(135deg, #00d9ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sai Surya Yerra
            </span>
          </h1>

          {/* Role */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, animation: "fadeUp 0.6s ease 0.2s both" }}>
            <div style={{ width: 28, height: 2, background: "#00d9ff", borderRadius: 2 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#00d9ff" }}>DevOps Engineer</span>
          </div>

          <p id="about" style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, maxWidth: 520, marginBottom: 32, animation: "fadeUp 0.6s ease 0.3s both" }}>
            3+ years designing CI/CD pipelines, automating cloud infrastructure, and building scalable systems on AWS. Passionate about eliminating manual overhead and shipping production-grade software reliably.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.6s ease 0.4s both" }}>
            <a href="#projects" style={{
              background: "#00d9ff", color: "#0a0e1a", padding: "11px 24px",
              borderRadius: 8, fontSize: 13, fontWeight: 700,
              textDecoration: "none", fontFamily: "'JetBrains Mono', monospace",
              transition: "opacity 0.2s ease", display: "inline-block"
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >view_projects()</a>
            <a href="#contact" style={{
              background: "transparent", color: "#e2e8f0", padding: "11px 24px",
              borderRadius: 8, fontSize: 13, fontWeight: 500,
              textDecoration: "none", fontFamily: "'JetBrains Mono', monospace",
              border: "1px solid #1e293b", transition: "border-color 0.2s ease", display: "inline-block"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#00d9ff"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1e293b"}
            >contact_me()</a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid #1e293b", animation: "fadeUp 0.6s ease 0.5s both" }}>
            {[["3+", "years exp"], ["8+", "tools"], ["3", "projects"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#e2e8f0", lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#64748b", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "80px 40px", background: "#0d1221" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#00d9ff", marginBottom: 8 }}>
              <span style={{ color: "#64748b" }}>// </span>skills
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Tech Stack</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 36 }}>Tools I work with daily to build and ship infrastructure.</p>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" }}>
            {skills.map((skill, i) => <SkillBar key={skill.name} skill={skill} index={i} />)}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#00d9ff", marginBottom: 8 }}>
              <span style={{ color: "#64748b" }}>// </span>projects
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Featured Work</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 36 }}>End-to-end DevOps projects built with real-world toolchains.</p>
          </AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "80px 40px", background: "#0d1221" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#00d9ff", marginBottom: 8 }}>
              <span style={{ color: "#64748b" }}>// </span>contact
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Get In Touch</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32 }}>Open to DevOps and cloud infrastructure roles.</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "✉", label: "surya.yerra27@email.com" },
                { icon: "📱", label: "+91 63036 93768" },
                { icon: "🐙", label: "github.com/suryayerra" },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "rgba(0,217,255,0.06)", border: "1px solid rgba(0,217,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0
                  }}>{icon}</div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#94a3b8" }}>{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "20px 40px", borderTop: "1px solid #1e293b" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#334155" }}>
          © 2026 Surya Yerra · built with React
        </span>
      </footer>
    </div>
  );
}

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 48, color: "#1e293b", marginBottom: 16 }}>404</div>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Project not found</p>
        <button onClick={() => navigate("/")} style={{ background: "#00d9ff", color: "#0a0e1a", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700 }}>← Go Home</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      {/* Top bar */}
      <div style={{ borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", alignItems: "center", gap: 16, background: "rgba(10,14,26,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => navigate("/")} style={{
          background: "transparent", border: "1px solid #1e293b", color: "#64748b",
          padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s ease"
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d9ff"; e.currentTarget.style.color = "#00d9ff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
        >← back</button>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#334155" }}>~/projects/{id}</span>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: project.color, boxShadow: `0 0 10px ${project.color}` }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: project.color }}>project.details</div>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>{project.title}</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: "4px 10px", borderRadius: 6, fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                background: `${project.color}15`, color: project.color,
                border: `1px solid ${project.color}30`
              }}>{tag}</span>
            ))}
          </div>
          <button
            onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
            style={{
              background: project.color, color: "#0a0e1a", padding: "10px 22px",
              borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700,
              fontSize: 13, fontFamily: "'JetBrains Mono', monospace"
            }}
          >view on github ↗</button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, #1e293b, transparent)", marginBottom: 32 }} />

        {/* Details */}
        <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 14, padding: 28 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#64748b", marginBottom: 16 }}>// overview</div>
          <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.9 }}>{project.details}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}
