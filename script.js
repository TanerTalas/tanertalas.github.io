// ******************** Reset scrolling before page load ********************
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

if (window.location.hash) {
    history.replaceState(null, null, " ");
    window.scrollTo(0, 0);
}
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
// ******************** Theme Button ********************
const toggleBtn = document.getElementById("themeButton");
const modeIcon = document.getElementById("themeIcon");
const htmlEl = document.documentElement;

if (toggleBtn && modeIcon) {
    toggleBtn.addEventListener("click", () => {
        const isDark = htmlEl.classList.toggle("dark");
        modeIcon.src = isDark ? "./images/icons/sundown.svg" : "./images/icons/sunup.svg";
        modeIcon.alt = isDark ? "dark mode" : "light mode";

        // Clouds color
        const cloudCount = 8;
        const themeFolder = isDark ? "dark" : "light";
        for (let i = 1; i <= cloudCount; i++) {
            const cloud = document.getElementById(`c${i}`);
            if (cloud) cloud.src = `./images/clouds/${themeFolder}/${9 - i}.svg`;
        }
    });
}
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
const typedText = document.getElementById("typedText");
const lang = document.documentElement.lang;
const typedMessage = lang === "en" ? "I'm a Front End Developer" : "Front End Geliştiricisiyim";
let index = 0;

function typeChar() {
    if (!typedText) return;
    if (index === 0) typedText.textContent = "";
    if (index < typedMessage.length) {
        typedText.textContent += typedMessage.charAt(index);
        index++;
        setTimeout(typeChar, 100);
    }
}

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
    // Cloud animation
    document.querySelectorAll(".clouds").forEach((cloud, index) => {
        setTimeout(() => cloud.classList.add("animate"), index * 100);
    });

    // Header hero animation and its text
    setTimeout(() => {
        document.getElementById("header-left")?.classList.add("hero-visible");
        document.getElementById("header-right")?.classList.add("hero-visible");
    }, 300);

    setTimeout(typeChar, 1500);

    sections.forEach(section => observer.observe(section));

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

    const messages = {
        tr: ["Portföyümü beğendin mi?", "Benimle tanışmak ister misin?"],
        en: ["Did you like my portfolio?", "Would you like to get to know me?"]
    };
    const [firstText, secondText] = messages[lang] || messages.tr;
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
