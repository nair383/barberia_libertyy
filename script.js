document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INTERACTIVIDAD DE TARJETAS DESPLEGABLES (COMBOS) - Corrección de selector .combo-card-new[cite: 3]
    const toggleButtons = document.querySelectorAll(".toggle-details-btn");

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".combo-card-new");
            const btnText = button.querySelector("span");

            if (card) {
                card.classList.toggle("active");

                if (card.classList.contains("active")) {
                    btnText.textContent = "Ocultar detalles";
                } else {
                    btnText.textContent = "Ver detalles";
                }
            }
        });
    });

    // 2. INTERACTIVIDAD DE LOS MENÚS ACORDEÓN DESPLEGABLES
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const menu = trigger.parentElement;
            
            // Cerrar otros acordeones si se desea comportamiento único (opcional)
            document.querySelectorAll(".accordion-menu").forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove("active");
                }
            });

            menu.classList.toggle("active");
        });
    });

    // 3. EFECTO DINÁMICO HOVER TILT 3D (Efecto de inclinación)
    const tiltElements = document.querySelectorAll("[data-tilt]");
    
    tiltElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            // No activar transformaciones físicas si la pantalla es de móvil (optimización de rendimiento y desbordamiento)
            if (window.innerWidth <= 900) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // posición X del cursor dentro del elemento
            const y = e.clientY - rect.top;  // posición Y del cursor dentro del elemento
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Grados máximos de rotación
            const maxRotate = 8; 
            
            const rotateX = ((centerY - y) / centerY) * maxRotate;
            const rotateY = ((x - centerX) / centerX) * maxRotate;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener("mouseleave", () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 4. GENERADOR DE PARTÍCULAS DE BRILLO FLOTANTES (Fondo)
    const particlesContainer = document.getElementById("particles-container");
    const particleCount = 15; // Mantener bajo para excelente rendimiento

    if (particlesContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            
            // Estilos aleatorios para variabilidad orgánica
            const size = Math.random() * 80 + 30; // entre 30px y 110px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // de 10s a 20s
            
            particlesContainer.appendChild(particle);
        }
    }

    // 5. SCROLL REVEAL (Animación elegante al deslizar) - Se corrige selector a la clase correcta de combos[cite: 3]
    const interactiveElements = document.querySelectorAll(".combo-card-new, .accordion-menu, .info-box");
    
    interactiveElements.forEach(el => {
        el.classList.add("reveal");
    });

    const checkReveal = () => {
        const triggerPoint = window.innerHeight * 0.88;

        interactiveElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < triggerPoint) {
                el.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", checkReveal);
    checkReveal();
});

// 6. CONTROL DEL MENÚ DESPLEGABLE (NAVBAR DROPDOWN)
    const dropdown = document.querySelector(".nav-dropdown");
    const dropdownTrigger = document.querySelector(".dropdown-trigger");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    if (dropdown && dropdownTrigger) {
        // Alternar el menú al hacer clic en el botón
        dropdownTrigger.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que se propague el clic al document
            const isActive = dropdown.classList.contains("active");
            dropdown.classList.toggle("active");
            dropdownTrigger.setAttribute("aria-expanded", !isActive);
        });

        // Cerrar menú al hacer clic en cualquier opción
        dropdownItems.forEach(item => {
            item.addEventListener("click", () => {
                dropdown.classList.remove("active");
                dropdownTrigger.setAttribute("aria-expanded", "false");
            });
        });

        // Cerrar el menú si el usuario hace clic en cualquier otra parte de la pantalla
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("active");
                dropdownTrigger.setAttribute("aria-expanded", "false");
            }
        });
    }
