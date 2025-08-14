function decodeUserData() {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const encodedData = urlParams.get("data")

    if (!encodedData) {
      console.log("Modo preview - usando datos de ejemplo")
      return getDefaultData()
    }

    const jsonString = atob(encodedData.replace(/-/g, "+").replace(/_/g, "/"))
    const userData = JSON.parse(jsonString)
    console.log("Datos decodificados:", userData)
    return userData
  } catch (error) {
    console.error("Error decodificando datos:", error)
    return getDefaultData()
  }
}

function getDefaultData() {
  return {
    nome: "Diego Martínez",
    cargo: "Motion Graphics Designer",
    descricao:
      "Artista digital especializado en animación y efectos visuales. Transformo conceptos en experiencias visuales memorables que cautivan audiencias.",
    foto: "https://via.placeholder.com/300/635BFF/FFFFFF?text=DM",
    habilidades: [
      "After Effects",
      "Cinema 4D",
      "Blender",
      "Illustrator",
      "Photoshop",
      "Premiere Pro",
      "DaVinci Resolve",
      "3D Animation",
    ],
    score: "4.7",
    projetos: "42",
    whatsapp: "+52 55 1234 5678",
  }
}

// Variables globales
let userData = {}
let animationFrameId

// Renderizar perfil artístico
function renderArtisticProfile() {
  // Actualizar foto de perfil
  const profilePhoto = document.querySelector(".profile-photo")
  if (profilePhoto && userData.foto) {
    profilePhoto.src = userData.foto
    profilePhoto.alt = `Foto de ${userData.nome}`
  }

  // Actualizar nombre con efecto de escritura
  const profileName = document.querySelector(".profile-name")
  if (profileName && userData.nome) {
    typewriterEffect(profileName, userData.nome, 100)
  }

  // Actualizar título
  const profileTitle = document.querySelector(".profile-title")
  if (profileTitle && userData.cargo) {
    setTimeout(
      () => {
        typewriterEffect(profileTitle, userData.cargo, 80)
      },
      userData.nome.length * 100 + 500,
    )
  }

  // Actualizar descripción
  const profileDescription = document.querySelector(".profile-description")
  if (profileDescription && userData.descricao) {
    setTimeout(
      () => {
        fadeInText(profileDescription, userData.descricao)
      },
      (userData.nome.length + userData.cargo.length) * 100 + 1000,
    )
  }

  // Renderizar métricas con animación
  setTimeout(() => {
    renderArtisticMetrics()
  }, 2000)

  // Renderizar habilidades creativas
  setTimeout(() => {
    renderCreativeSkills()
  }, 2500)

  // Configurar contacto
  setTimeout(() => {
    setupArtisticContact()
  }, 3000)
}

// Efecto de máquina de escribir
function typewriterEffect(element, text, speed) {
  element.textContent = ""
  let i = 0

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Efecto de aparición de texto
function fadeInText(element, text) {
  element.textContent = text
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"

  setTimeout(() => {
    element.style.transition = "all 0.8s ease"
    element.style.opacity = "1"
    element.style.transform = "translateY(0)"
  }, 100)
}

// Renderizar métricas artísticas
function renderArtisticMetrics() {
  const scoreElement = document.querySelector(".metric-value.score")
  const projectsElement = document.querySelector(".metric-value.projects")

  if (scoreElement && userData.score) {
    animateCounter(scoreElement, 0, Number.parseFloat(userData.score), 1500, true)
  }

  if (projectsElement && userData.projetos) {
    animateCounter(projectsElement, 0, Number.parseInt(userData.projetos), 2000, false)
  }

  // Animar aparición de las tarjetas
  const metricCards = document.querySelectorAll(".metric-card")
  metricCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px) scale(0.8)"

    setTimeout(() => {
      card.style.transition = "all 0.6s ease"
      card.style.opacity = "1"
      card.style.transform = "translateY(0) scale(1)"
    }, index * 200)
  })
}

// Animación de contador
function animateCounter(element, start, end, duration, isDecimal) {
  const startTime = performance.now()

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = start + (end - start) * easeOutCubic(progress)

    if (isDecimal) {
      element.textContent = current.toFixed(1)
    } else {
      element.textContent = Math.floor(current).toString()
    }

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }

  requestAnimationFrame(updateCounter)
}

// Renderizar habilidades creativas
function renderCreativeSkills() {
  const skillsGrid = document.querySelector(".skills-artistic-grid")
  if (!skillsGrid || !userData.habilidades) return

  // Limpiar grid
  skillsGrid.innerHTML = ""

  // Crear badges artísticos
  userData.habilidades.forEach((skill, index) => {
    const badge = document.createElement("span")
    badge.className = "skill-badge-artistic"
    badge.textContent = skill
    badge.style.opacity = "0"
    badge.style.transform = "translateY(30px) rotate(-5deg)"

    skillsGrid.appendChild(badge)

    // Animación de entrada escalonada
    setTimeout(() => {
      badge.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      badge.style.opacity = "1"
      badge.style.transform = "translateY(0) rotate(0deg)"
    }, index * 150)
  })

  // Animar título de habilidades
  const skillsTitle = document.querySelector(".skills-title")
  if (skillsTitle) {
    skillsTitle.style.opacity = "0"
    skillsTitle.style.transform = "translateX(-30px)"

    setTimeout(() => {
      skillsTitle.style.transition = "all 0.8s ease"
      skillsTitle.style.opacity = "1"
      skillsTitle.style.transform = "translateX(0)"
    }, 200)
  }
}

// Configurar contacto artístico
function setupArtisticContact() {
  const whatsappBtn = document.querySelector(".whatsapp-artistic-btn")
  if (!whatsappBtn) return

  if (userData.whatsapp) {
    whatsappBtn.style.display = "inline-flex"
    whatsappBtn.style.opacity = "0"
    whatsappBtn.style.transform = "translateY(30px) scale(0.8)"

    setTimeout(() => {
      whatsappBtn.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      whatsappBtn.style.opacity = "1"
      whatsappBtn.style.transform = "translateY(0) scale(1)"
    }, 300)

    whatsappBtn.addEventListener("click", () => {
      const message = encodeURIComponent(`Hola ${userData.nome}, me interesa contactarte para un proyecto.`)
      const whatsappUrl = `https://wa.me/${userData.whatsapp.replace(/\D/g, "")}?text=${message}`
      window.open(whatsappUrl, "_blank")
    })
  } else {
    whatsappBtn.style.display = "none"
  }
}

// Función de easing
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

// Efectos de partículas
function createParticleEffect() {
  const container = document.querySelector(".poster-container")

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.style.position = "absolute"
    particle.style.width = Math.random() * 4 + 2 + "px"
    particle.style.height = particle.style.width
    particle.style.background = ["#635BFF", "#4CAF50", "#FF9800"][Math.floor(Math.random() * 3)]
    particle.style.borderRadius = "50%"
    particle.style.opacity = Math.random() * 0.5 + 0.2
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "1"

    const duration = Math.random() * 10 + 5
    particle.style.animation = `floatDot ${duration}s ease-in-out infinite`
    particle.style.animationDelay = Math.random() * 5 + "s"

    container.appendChild(particle)
  }
}

// Efectos de mouse
function initMouseEffects() {
  const poster = document.querySelector(".poster-content")

  poster.addEventListener("mousemove", (e) => {
    const rect = poster.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (y - 0.5) * 10
    const rotateY = (x - 0.5) * -10

    poster.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  })

  poster.addEventListener("mouseleave", () => {
    poster.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
  })
}

// Manejo de errores
function handleError(error) {
  console.error("Error en la aplicación:", error)

  const container = document.querySelector(".poster-container")
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <h3>Error al cargar el poster</h3>
        <p>Ha ocurrido un error al cargar la información del perfil. Por favor, intenta nuevamente.</p>
      </div>
    `
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Mostrar estado de carga
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease"

    // Decodificar datos del usuario
    userData = decodeUserData()

    // Renderizar perfil artístico
    renderArtisticProfile()

    // Crear efectos de partículas
    setTimeout(createParticleEffect, 1000)

    // Inicializar efectos de mouse
    setTimeout(initMouseEffects, 2000)

    // Mostrar la página
    setTimeout(() => {
      document.body.style.opacity = "1"
    }, 500)
  } catch (error) {
    handleError(error)
  }
})

// Optimización de rendimiento
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Precargar imágenes
function preloadImages() {
  if (userData.foto) {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = userData.foto
  }
}

setTimeout(preloadImages, 1000)

// Limpiar animaciones al salir
window.addEventListener("beforeunload", () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
