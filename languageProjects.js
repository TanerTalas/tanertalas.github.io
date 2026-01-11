(() => {
    const I18N = {
        EN: {
            meta: {
                title: "Taner Talas | Projects",
                description: "This is the projects page of Taner Talas's portfolio website, showcasing his user interface-focused projects and front-end development work."
            },
            nav: {
                menu: {
                    homepage: "Homepage",
                    contact: "Contact",
                    languageButton: {
                        language: "Language",
                        turkish: "Turkish",
                        english: "English"
                    }
                }
            },
            header: {
                h1: "Hello Again!",
                h1Second: "You Can Find My Projects Below",
                p: "You can explore my projects under the \"Completed\" and \"On Progress\" sections. Thank you for visiting!",
                button: "Continue"
            },
            projects: {
                h2: "My Projects",
                projects: {
                    projectPage: {
                        fh3: "Done",
                        fp: "Although these projects are completed, I continue to improve them with the new knowledge I gain.",
                        sh3: "On Progress",
                        sp: "These projects might still be in progress, or I may have placed them under this section due to newly discovered issues."
                    },
                    project1: {
                        h4: "Restaurant Promotion",
                        p: "This project showcases a modern café website concept inspired by contemporary French design."
                    },
                    project2: {
                        h4: "Mondrian CSS",
                        p: "Front end project featuring CSS recreations of Mondrian paintings, focusing on layout, responsive design, and artistic interpretation."
                    },
                    project3: {
                        h4: "Auth UI",
                        p: "A single-page authentication project with Sign In, Sign Up, and Forgot Password sections, featuring animated transitions, form validations, day & night themes, and dynamic backgrounds."
                    },
                    codeAndInfo: "Code & More Info >",
                    liveWebsite: "Live Website"
                }
            },
            footer: {
                half1: "Made with",
                half2: "by Taner Talas"
            }
        },
        TR: {
            meta: {
                title: "Taner Talas | Projeler",
                description: "Bu, Taner Talas'ın kullanıcı arayüzü odaklı projelerini ve front end geliştirme çalışmalarını sergileyen portföy web sitesinin projeler sayfasıdır."
            },
            nav: {
                menu: {
                    homepage: "Ana Sayfa",
                    contact: "İletişim",
                    languageButton: {
                        language: "Dil",
                        turkish: "Türkçe",
                        english: "İngilizce"
                    }
                }
            },
            header: {
                h1: "Tekrar Merhaba!",
                h1Second: "Projelerime Aşağıda Göz Atabilirsiniz",
                p: "Projelerimi \"Tamamlanmış\" ve \"Devam Eden\" bölümlerinde inceleyebilirsiniz. Ziyaretiniz için teşekkür ederim!",
                button: "Devam Et"
            },
            projects: {
                h2: "Projelerim",
                projects: {
                    projectPage: {
                        fh3: "Tamamlanmış",
                        fp: "Bu projeler tamamlanmış olsa da yeni öğrendiğim bilgilerle bu projeleri geliştirmeye devam ediyorum.",
                        sh3: "Devam Ediyor",
                        sp: "Bu projeler devam ediyor olabilir veya yeni fark edilmiş hatalardan dolayı bu başlık altına almış olabilirim."
                    },
                    project1: {
                        h4: "Restoran Promosyonu",
                        p: "Bu proje, çağdaş Fransız tasarımından ilham alan modern bir kafe web sitesi konseptini sergiliyor."
                    },
                    project2: {
                        h4: "Mondrian CSS",
                        p: "Mondrian tablolarının CSS ile yeniden oluşturulmuş hallerini içeren, düzen, duyarlı tasarım ve sanatsal yorumlamaya odaklanan front end projesi."
                    },
                    project3: {
                        h4: "Kullanıcı Arayüzü",
                        p: "Giriş, Kayıt ve Şifremi Unuttum bölümleri olan tek sayfalık bir kimlik doğrulama projesi; animasyonlu geçişler, form doğrulamaları, gündüz & gece temaları ve dinamik arka planlar içerir."
                    },
                    codeAndInfo: "Kodu & Fazlası >",
                    liveWebsite: "Canlı Site"
                },
            },
            footer: {
                half1: "Taner Talas tarafından",
                half2: "ile yapıldı"
            }
        }
    };

    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    const t = (lang, key) =>
        key.split(".").reduce((o, k) => o?.[k], I18N[lang]);

    const applyI18n = (lang) => {
        document.documentElement.lang = lang.toLowerCase();

        document.title = t(lang, "meta.title");
        $('meta[name="description"]')
            ?.setAttribute("content", t(lang, "meta.description"));

        $$("[data-i18n]").forEach(el => {
            el.textContent = t(lang, el.dataset.i18n);
        });

        $$("[data-i18n-placeholder]").forEach(el => {
            el.placeholder = t(lang, el.dataset.i18nPlaceholder);
        });

        $$("[data-i18n-aria-label]").forEach(el => {
            el.setAttribute(
                "aria-label",
                t(lang, el.dataset.i18nAriaLabel)
            );
        });
    };

    const setActiveButton = (lang) => {
        $$(".lang-btn").forEach(btn => {
            btn.classList.toggle("activeLanguage", btn.dataset.lang === lang);
            btn.classList.toggle("nonActiveLanguage", btn.dataset.lang !== lang);
        });
    };

    const setLang = (lang) => {
        localStorage.setItem("lang", lang);
        setActiveButton(lang);
        applyI18n(lang);
    };

    // language buttons
    $$(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            setLang(btn.dataset.lang);
        });
    });

    // toggle
    $("#languageToggle")?.addEventListener("click", () => {
        $("#languageOptions")?.classList.toggle("open");
    });

    // initial
    setLang(localStorage.getItem("lang") || "EN");
})();