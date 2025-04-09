let currentLang = "es";

function toggleTheme() {
  document.body.classList.toggle('light');
}

function toggleLang() {
  currentLang = currentLang === "es" ? "en" : "es";
  const text = {
    es: {
      langBtn: "🌐 English",
      role: "Ingeniero en Sistemas computacionales",
      aboutTitle: "🎮 Sobre mí",
      aboutText: "Soy un ingeniero en sistemas apasionado por la tecnología y comprometido con el aprendizaje constante. Disfruto cada aspecto de mi profesión y siempre busco mejorar mis habilidades. Me destaco tanto en el trabajo en equipo como en proyectos individuales, adaptándome con facilidad a distintos entornos y formas de trabajo. Mi objetivo es formar parte de una empresa innovadora que transforme la manera en que se hacen las cosas.",
      studiesTitle: "📚 Estudios",
      study1: "Instituto Tecnolofico de Tepic – Ingenieria en sistemas computacionales (2019 - 2024)",
      study2: "Universidad Anahuac Mayab – Diplomado en desarrollo de videojuegos y entornos de realidad virtual con unity (En curso)",
      expTitle: "💼 Experiencia",
      exp1: "Virtuality world | Agosto de 2024 a marzo de 2025 - Ventas, comunicación con clientes, manipulación y reparación de máquinas de realidad virtual y desarrollo de páginas web.",
      skillsTitle: "🚀 Habilidades",
      projectsTitle: "🎯 Proyectos",
      softSkillsTitle: "🧠 Habilidades blandas",
      proj1: "Unity play: https://play.unity.com/en/user/794399fb-cd4d-4899-bedb-3f3500e7df5f",
      softSkills: [
        "Trabajo en equipo",
        "Comunicación",
        "Adaptabilidad",
        "Resolución de problemas",
        "Creatividad",
        "Proactividad",
        "Organización",
        "Responsabilidad",
        "Trabajo bajo presión"
      ]
    },
    en: {
      langBtn: "🌐 Español",
      role: "Computer Systems Engineer",
      aboutTitle: "🎮 About Me",
      aboutText: "I’m a computer systems engineer passionate about technology and committed to continuous learning. I enjoy every aspect of my profession and constantly seek to improve my skills. I excel both in teamwork and individual projects, easily adapting to different environments and ways of working. My goal is to be part of an innovative company that transforms the way things are done.",
      studiesTitle: "📚 Education",
      study1: "Tepic institute of Technology – Computer science engineering (2019 - 2024)",
      study2: "Anahuac Mayab University – Diploma in video game development and virtual reality environments with Unity (In progress)",
      expTitle: "💼 Experience",
      exp1: "Virtuality World | August 2024 to March 2025 – sales, client communication, handling and repair of virtual reality machines and web development.",
      skillsTitle: "🚀 Skills",
      projectsTitle: "🎯 Projects",
      softSkillsTitle: "🧠 Soft Skills",
      proj1: "Unity play: https://play.unity.com/en/user/794399fb-cd4d-4899-bedb-3f3500e7df5f",
      softSkills: [
        "Teamwork",
        "Communication",
        "Adaptability",
        "Problem-solving",
        "Creativity",
        "Proactivity",
        "Organization",
        "Responsibility",
        "Work under pressure"
      ]
    }
  };

  const langData = text[currentLang];
  document.querySelector(".toggle-lang").innerText = langData.langBtn;
  document.getElementById("role").innerText = langData.role;
  document.getElementById("about-title").innerText = langData.aboutTitle;
  document.getElementById("about-text").innerText = langData.aboutText;
  document.getElementById("studies-title").innerText = langData.studiesTitle;
  document.getElementById("study-1").innerText = langData.study1;
  document.getElementById("study-2").innerText = langData.study2;
  document.getElementById("exp-title").innerText = langData.expTitle;
  document.getElementById("exp-1").innerText = langData.exp1;
  document.getElementById("skills-title").innerText = langData.skillsTitle;
  document.getElementById("projects-title").innerText = langData.projectsTitle;
  document.querySelector(".soft-skills h4").innerText = langData.softSkillsTitle;

  // Actualizar soft skills
  const softSkillsList = document.querySelector(".soft-skills ul");
  softSkillsList.innerHTML = ""; // Limpiar lista
  langData.softSkills.forEach(skill => {
    const li = document.createElement("li");
    li.innerText = skill;
    softSkillsList.appendChild(li);
  });
}
