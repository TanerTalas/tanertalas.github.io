// Sayfa yüklenmeden önce scroll pozisyonunu sıfırla
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

if (window.location.hash) {
    history.replaceState(null, null, " ");
    window.scrollTo(0, 0);
}

// Menü butonu
const menuBtn = document.getElementById("menu");
const navbarMenu = document.getElementById("navbarMenu");
const menuIcon = document.getElementById("menuIcon");

if (menuBtn && navbarMenu && menuIcon) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navbarMenu.classList.toggle("menu-open");
        menuIcon.src = isOpen ? "./images/icons/close.svg" : "./images/icons/menuicon.svg";
        menuIcon.alt = isOpen ? "close menu" : "open menu";
    });
}

// Dil değiştirme butonu
const langToggle = document.getElementById("langToggle");
const langOptions = document.getElementById("langOptions");

if (langToggle && langOptions) {
    langToggle.addEventListener("click", () => {
        langOptions.classList.toggle("show");
        langToggle.classList.toggle("active");
    });
}

// Tema değiştirme
const toggleBtn = document.getElementById("modeSwitch");
const modeIcon = document.getElementById("modeIcon");
const htmlEl = document.documentElement;

if (toggleBtn && modeIcon) {
    toggleBtn.addEventListener("click", () => {
        const isDark = htmlEl.classList.toggle("dark");
        modeIcon.src = isDark ? "./images/icons/sundown.svg" : "./images/icons/sunup.svg";
        modeIcon.alt = isDark ? "dark mode" : "light mode";

        // Bulut görsellerini güncelle
        const cloudCount = 8;
        const themeFolder = isDark ? "dark" : "light";
        for (let i = 1; i <= cloudCount; i++) {
            const cloud = document.getElementById(`c${i}`);
            if (cloud) cloud.src = `./images/clouds/${themeFolder}/${9 - i}.svg`;
        }
    });
}

// Yazı yazma animasyonu (typedText)
const typedText = document.getElementById("typedText");
const lang = document.documentElement.lang;
const typedMessage = lang === "en" ? "I'm a Front-End Developer" : "Front-End Geliştiricisiyim";
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

// Genel tip yazma fonksiyonu
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

// Yazıyı silme fonksiyonu
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

// Sayfa yüklendiğinde yapılacaklar
window.addEventListener("load", () => {
    // Bulut animasyonu
    document.querySelectorAll(".clouds").forEach((cloud, index) => {
        setTimeout(() => cloud.classList.add("animate"), index * 100);
    });

    // Hero animasyonu ve yazı
    setTimeout(() => {
        document.getElementById("heroText")?.classList.add("hero-visible");
        document.getElementById("heroImg")?.classList.add("hero-visible");
    }, 300);

    setTimeout(typeChar, 1500);

    // Teknolojiler bölümü görünürlük kontrolü
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll("#technologies div").forEach(item => {
        techObserver.observe(item);
    });

    // Menü link aktifliği (scroll takip)
    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll("#navbarMenu a");

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

    // Karakter çıkış ve yazı efektleri
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
