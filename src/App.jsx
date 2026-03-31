import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const projects = [
  {
    id: "three-tier",
    title: "Three tier application deployment",
    description: "Built end-to-end CI/CD pipeline using Jenkins CI, Docker, Kubernetes and terraform.",
    link: "https://github.com/suryayerra/3-Tier-Full-Stack-yelp-camp",
    details: "This project involved the end-to-end design and implementation of a highly available, secure, and scalable three-tier web application architecture leveraging a modern DevOps toolchain. I utilized Terraform as the Infrastructure as Code (IaC) engine to provision a robust AWS environment, including a custom Virtual Private Cloud (VPC) with isolated public and private subnets, an Application Load Balancer, and an Amazon Elastic Kubernetes Service (EKS) cluster. To automate the software delivery lifecycle, I engineered a sophisticated Jenkins CI/CD pipeline that triggers automatically upon code commits, executing stages for code linting, unit testing, and building optimized Docker images for both the frontend and backend services. These containerized components were versioned and pushed to Amazon Elastic Container Registry (ECR) for secure storage. The application deployment was orchestrated through Kubernetes, where I managed the container lifecycle using Deployment and Service manifests to ensure self-healing capabilities and seamless traffic routing. For the data tier, I integrated Amazon RDS within a private subnet, restricting direct internet access to ensure maximum data security while maintaining high availability across multiple availability zones. By integrating these disparate technologies—Terraform for infrastructure, Docker for containerization, Jenkins for continuous automation, and Kubernetes for orchestration—I successfully established a zero-touch deployment framework that significantly reduces manual overhead, minimizes human error, and ensures the rapid, consistent delivery of production-grade software in a cloud-native environment."

  },
  {
    id: "legacy",
    title: "Legacy application Migration and deployment",
    description: "Migrated legacy application from onpremise to AWS with microservices architecture.",
    link: "https://github.com/suryayerra/devsecops-project",
    details: " To modernize our infrastructure, we successfully migrated our on-premises application to a microservices architecture on AWS using a phased lift-and-shift and refactoring approach. We began by breaking down the original monolithic codebase into smaller, independent services, each managed within Docker containers for consistency. These services are now hosted on Amazon ECS (Elastic Container Service), which automatically handles scaling and load balancing based on real-time traffic. For data management, we moved away from a single shared server to Amazon RDS, ensuring each microservice has its own dedicated database to prevent bottlenecks. To keep the system reliable, we integrated Amazon SQS for secure messaging between services, ensuring that if one part of the app experiences a delay, the rest remains functional. This transition has significantly improved our deployment speed and system uptime, allowing us to push updates without taking the entire application offline. "
  },
  {
    id: "terraform",
    title: "Automated AWS cloud infrastructure using Terraform",
    description: "Automated the AWS infrastructure using infrastructure as code tool Terraform.",
    link: "https://github.com/your-repo-3",
    details: "To modernize our infrastructure and eliminate the risks associated with manual environment configuration, we undertook a comprehensive project to automate our entire AWS cloud ecosystem using Terraform as our primary Infrastructure as Code (IaC) tool. The project began with a rigorous audit of our existing on-premises and early-stage cloud resources to identify core components that required standardization, including Virtual Private Clouds (VPCs), subnets, routing tables, and security groups. By adopting a code-first philosophy, we transitioned away from the AWS Management Console’s manual click-ops approach, which was prone to human error and configuration drift, to a fully version-controlled repository hosted on GitHub. This shift allowed our engineering team to treat infrastructure with the same rigor as application code, enabling peer reviews, automated testing, and a clear audit trail for every architectural change."

  }
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="text-xl font-bold">surya yerra</h1>
        <div className="space-x-4">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20">
       
        <h2 className="text-4xl font-bold">Hi, I'm sai surya yerra 👋</h2>
        <p className="text-gray-400">DevOps Engineer</p>
      </section>

      {/* About */}
      <section id="about" className="p-10 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-400">
          I am a DevOps engineer with 3+ years of experience designing, implementing, and managing CI/CD pipelines, infrastructure automation, and cloud-based solutions. Proficient in tools like Docker, Kubernetes, Jenkins, and AWS, with a strong focus on improving deployment efficiency and system reliability. Skilled in collaborating with cross-functional teams to streamline development processes and ensure scalable, secure, and high-performance systems.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="p-10 bg-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Git", "Linux", "Prometheus"].map(skill => (
            <div key={skill} className="p-4 bg-gray-700 rounded-xl">
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="p-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>

              <div className="flex gap-3 mt-4">
                <Link to={`/project/${project.id}`}>
                  <button className="bg-green-600 px-4 py-2 rounded">
                    View Details
                  </button>
                </Link>

                <button
                  onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="p-10 bg-gray-800 text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-400">surya.yerra27@email.com 6303693768 </p>
      </section>

      {/* Footer */}
      <footer className="text-center p-6 text-gray-500">
        © 2026 Surya Yerra. All rights reserved.
      </footer>
    </div>
  );
}

function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <div className="text-white p-10">Project not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <Link to="/" className="text-blue-400">← Back</Link>
      <h1 className="text-3xl font-bold mt-4">{project.title}</h1>
      <p className="text-gray-400 mt-4 whitespace-pre-line">{project.details}</p>

      <button
        onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
        className="mt-6 bg-blue-600 px-4 py-2 rounded"
      >
        View GitHub Repo
      </button>
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
