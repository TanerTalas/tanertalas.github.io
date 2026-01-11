// ******************** Reset scrolling before page load ********************
window.addEventListener("DOMContentLoaded", () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});
// ******************** Menu Section Observer ********************
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll("#navMenu a");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        }
    });
}, {
    rootMargin: "-50% 0px -49% 0px",
    threshold: 0
});

sections.forEach(section => observer.observe(section));
// ******************** Theme Button ********************
const toggleBtn = document.getElementById("themeButton");

toggleBtn?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    // Clouds color
    const cloudCount = 8;
    const themeFolder = isDark ? "dark" : "light";

    for (let i = 1; i <= cloudCount; i++) {
        const cloud = document.getElementById(`c${i}`);
        if (cloud) {
            cloud.src = `./images/clouds/${themeFolder}/${9 - i}.svg`;
        }
    }

    // Theme-color meta tag update
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
        themeMeta.setAttribute('content', isDark ? '#090040' : '#44CCEE');
    }
});
// ******************** Menu Button and Language Button ********************
const menuBtn = document.getElementById("menuButton");
const navbarMenu = document.getElementById("navMenu");
const menuIcon = document.getElementById("menuIcon");
const langToggle = document.getElementById("languageToggle");
const langOptions = document.getElementById("languageOptions");
// Menu
if (menuBtn && navbarMenu && menuIcon) {
    menuBtn.addEventListener("click", () => {
        // Checking if language button is active or not
        if (langToggle?.classList.contains("active")) {
            langToggle.classList.remove("active");
            langOptions?.classList.remove("show");
        }

        const isOpen = navbarMenu.classList.toggle("menu-open");
        menuIcon.src = isOpen
            ? "./images/icons/close.svg"
            : "./images/icons/menuicon.svg";
        menuIcon.alt = isOpen ? "close menu" : "open menu";
    });
}
// Language
if (langToggle && langOptions) {
    langToggle.addEventListener("click", () => {
        langOptions.classList.toggle("show");
        langToggle.classList.toggle("active");
    });
}

// ******************** Header h1 text ********************
const TYPED_MESSAGES = {
    en: "I'm a Front End Developer",
    tr: "Front End Geliştiricisiyim"
};

const typedText = document.getElementById("typedText");

let index = 0;
let typingTimeout = null;
let initialDelayTimeout = null;

function startTyping(lang, delay = 0) {
    if (!typedText) return;

    lang = lang.toLowerCase();
    const message = TYPED_MESSAGES[lang];
    if (!message) return;

    clearTimeout(typingTimeout);
    clearTimeout(initialDelayTimeout);

    index = 0;
    typedText.textContent = "";

    const begin = () => {
        function typeChar() {
            if (index < message.length) {
                typedText.textContent += message.charAt(index);
                index++;
                typingTimeout = setTimeout(typeChar, 100);
            }
        }
        typeChar();
    };

    if (delay > 0) {
        initialDelayTimeout = setTimeout(begin, delay);
    } else {
        begin();
    }
}

// global 
window.startTyping = startTyping;

// ******************** Fade up effect ********************
const fadeElements = document.querySelectorAll('.fade-up')
const observer2 = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-fade-up')
                observer.unobserve(entry.target)
            }
        })
    },
    {
        threshold: 0.2,          // when 20% shows
        rootMargin: '0px 0px -50px 0px' // dont't show too early
    }
)
fadeElements.forEach(el => observer2.observe(el))

window.addEventListener("load", () => {
    // ******************** Header ********************
    // h1 text
    const initialLang = document.documentElement.lang || "en";
    startTyping(initialLang, 2000);
    // Cloud animation
    document.querySelectorAll(".clouds").forEach((cloud, index) => {
        setTimeout(() => cloud.classList.add("animate"), index * 100);
    });

    // Header hero animation and its text
    setTimeout(() => {
        document.getElementById("header-left")?.classList.add("hero-visible");
        document.getElementById("header-right")?.classList.add("hero-visible");
    }, 300);

    // ******************** Mini Me ********************
    // Mini Me text animation
    function typeText(text, element, delay = 100, callback) {
        let i = 0;
        element.textContent = "";
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text[i++];
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, delay);
    }

    // Mini Me text delete animation
    function deleteText(element, delay = 50, callback) {
        let i = element.textContent.length;
        const interval = setInterval(() => {
            if (i > 0) {
                element.textContent = element.textContent.slice(0, --i);
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, delay);
    }

    // Only English messages
    const messages = ["Did you like my portfolio?", "Would you like to get to know me?"];
    const [firstText, secondText] = messages;

    const bubbleTextEl = document.getElementById("bubbleText");

    setTimeout(() => {
        document.getElementById("characterContainer")?.classList.add("show");
        document.body.classList.add("show-hands");
    }, 10000);

    setTimeout(() => {
        document.getElementById("textBubble")?.style.setProperty("opacity", "1");
    }, 12000);

    setTimeout(() => {
        if (!bubbleTextEl) return;
        typeText(firstText, bubbleTextEl, 80, () => {
            setTimeout(() => {
                deleteText(bubbleTextEl, 30, () => {
                    setTimeout(() => typeText(secondText, bubbleTextEl, 80), 200);
                });
            }, 3000);
        });
    }, 12200);

    setTimeout(() => {
        document.getElementById("textBubble")?.classList.add("text-bubble-disappear");
    }, 23000);

    setTimeout(() => {
        document.getElementById("characterContainer")?.classList.remove("show");
        document.body.classList.remove("show-hands");
    }, 23700);

});
