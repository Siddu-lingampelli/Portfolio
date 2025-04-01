// ===== MATRIX RAIN EFFECT =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    
    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}

setInterval(drawMatrix, 30);

// ===== 3D AVATAR =====
const avatarContainer = document.getElementById('avatar-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(300, 300);
avatarContainer.appendChild(renderer.domElement);

// Add your 3D model here (replace with your actual model)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x6366f1 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animateAvatar() {
    requestAnimationFrame(animateAvatar);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animateAvatar();

// ===== VOICE COMMANDS =====
if (annyang) {
    const commands = {
        'scroll to *section': function(section) {
            const target = document.getElementById(section);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('voice-status').textContent = `Scrolled to ${section}`;
            }
        },
        'open github': function() {
            window.open('https://github.com/Siddu-lingampelli', '_blank');
            document.getElementById('voice-status').textContent = "Opening GitHub...";
        },
        'contact me': function() {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('voice-status').textContent = "Taking you to contact section";
        },
        'help': function() {
            alert('Available commands:\n\n"Scroll to [section]"\n"Open GitHub"\n"Contact me"');
            document.getElementById('voice-status').textContent = "Help commands shown";
        }
    };

    annyang.addCommands(commands);
    
    document.getElementById('voice-btn').addEventListener('click', function() {
        this.classList.toggle('listening');
        if (this.classList.contains('listening')) {
            annyang.start();
            document.getElementById('voice-status').textContent = "Listening... Say 'Help' for commands";
        } else {
            annyang.abort();
            document.getElementById('voice-status').textContent = "Voice control off";
        }
    });
}

// ===== HACKER TERMINAL =====
const terminalText = document.getElementById('terminal-text');
const terminalLines = [
    "> Initializing portfolio system...",
    "> Loading 3D avatar... [DONE]",
    "> Activating voice AI... [DONE]",
    "> Establishing matrix connection... [DONE]",
    "> Welcome, ADMIN.",
    "> System ready."
];

let currentLine = 0;
function typeTerminal() {
    if (currentLine < terminalLines.length) {
        terminalText.innerHTML += terminalLines[currentLine] + "<br>";
        currentLine++;
        setTimeout(typeTerminal, 800);
    } else {
        setTimeout(() => {
            document.querySelector('.terminal').style.display = 'none';
        }, 3000);
    }
}

// Show terminal on load
window.onload = function() {
    document.querySelector('.terminal').style.display = 'block';
    setTimeout(typeTerminal, 1000);
};

// ===== SCROLL ANIMATIONS (GSAP) =====
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
});

// ===== TYPEWRITER EFFECT =====
const phrases = [
    "Crafting Tomorrow's Tech Today", 
    "Full-Stack Developer", 
    "AI/ML Enthusiast", 
    "UI/UX Wizard"
];
let currentPhrase = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const text = phrases[currentPhrase];
    const typewriter = document.getElementById('typewriter');
    
    if (isDeleting) {
        typewriter.textContent = text.substring(0, charIndex--);
        if (charIndex === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
    } else {
        typewriter.textContent = text.substring(0, charIndex++);
        if (charIndex === text.length + 1) {
            isDeleting = true;
            setTimeout(type, 1500);
            return;
        }
    }
    
    setTimeout(type, isDeleting ? 50 : 150);
}

// Start typewriter effect
type();