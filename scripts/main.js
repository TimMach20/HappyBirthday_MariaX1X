// Credenciales válidas
const validUsername = "Maria Angelica Acosta Moyeda";
const validPassword = "05092006";

// Variables para el carrusel
let currentSlide = 0;
const totalSlides = 3;

// Función para validar el login
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (username === validUsername && password === validPassword) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('letterContainer').style.display = 'flex';
        preloadImages(); // Precargar imágenes al hacer login
    } else {
        errorMessage.style.display = 'block';
        // Efecto de vibración para el error
        document.getElementById('loginContainer').style.animation = 'shake 0.5s';
        document.getElementById('loginContainer').style.animationIterationCount = '1';
        setTimeout(() => {
            document.getElementById('loginContainer').style.animation = '';
        }, 500);
    }
}

// Función para abrir la carta
function openLetter() {
    document.getElementById('envelope').classList.add('flipped');
    setTimeout(() => {
        document.getElementById('letter').style.display = 'block';
    }, 800);
}

// Función para cerrar la carta
function closeLetter() {
    document.getElementById('letter').style.display = 'none';
    document.getElementById('envelope').classList.remove('flipped');
    setTimeout(() => {
        document.getElementById('letterContainer').style.display = 'none';
        document.getElementById('birthdayContent').style.display = 'block';
    }, 500);
}

// Funciones para el carrusel
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar indicadores
    document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Precargar imágenes
function preloadImages() {
    const images = document.querySelectorAll('.carousel-img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            new Image().src = src;
        }
    });
}

// Ocultar mensaje de carga cuando la imagen se cargue
function imageLoaded(imgElement) {
    const loadingElement = imgElement.previousElementSibling;
    if (loadingElement && loadingElement.classList.contains('img-loading')) {
        loadingElement.style.display = 'none';
        imgElement.style.display = 'block';
    }
}

// Crear lluvia de emojis
function createEmojiRain() {
    const emojis = ['🌻', '🌹', '🌸', '💐', '🌺', '🌷'];
    const container = document.getElementById('emojiRain');
    
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Posición horizontal aleatoria
        emoji.style.left = Math.random() * 100 + 'vw';
        
        // Tamaño aleatorio
        const size = Math.random() * 25 + 15;
        emoji.style.fontSize = size + 'px';
        
        // Duración de la animación aleatoria
        const duration = Math.random() * 5 + 5;
        emoji.style.animationDuration = duration + 's';
        
        // Opacidad aleatoria
        emoji.style.opacity = Math.random() * 0.5 + 0.5;
        
        container.appendChild(emoji);
        
        // Eliminar el emoji después de que termine la animación
        setTimeout(() => {
            emoji.remove();
        }, duration * 1000);
    }, 300);
}

// Crear decoraciones flotantes
function createDecorations() {
    const decorations = ['✨', '🎀', '🎉', '💖', '🌸'];
    const container = document.body;
    
    for (let i = 0; i < 15; i++) {
        const decoration = document.createElement('div');
        decoration.classList.add('decoration');
        decoration.innerText = decorations[Math.floor(Math.random() * decorations.length)];
        
        // Posición aleatoria
        decoration.style.left = Math.random() * 100 + 'vw';
        decoration.style.top = Math.random() * 100 + 'vh';
        
        // Tamaño aleatorio
        const size = Math.random() * 20 + 15;
        decoration.style.fontSize = size + 'px';
        
        // Animación flotante
        decoration.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        decoration.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(decoration);
    }
}

// Función para cerrar sesión
function logout() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('birthdayContent').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('errorMessage').style.display = 'none';
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Permitir login con Enter
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateLogin();
        }
    });
    
    // Iniciar la lluvia de emojis
    createEmojiRain();
    
    // Añadir evento de clic al sobre
    document.getElementById('envelope').addEventListener('click', openLetter);
    
    // Añadir decoraciones flotantes
    createDecorations();
    
    // Ocultar todas las imágenes al inicio (se mostrarán cuando carguen)
    document.querySelectorAll('.carousel-img').forEach(img => {
        img.style.display = 'none';
    });
});