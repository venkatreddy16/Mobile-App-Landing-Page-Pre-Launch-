// Main JavaScript for LaunchPad
// Theme, navigation, countdown, slider, form validation, and reveal animations

const root = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const navWrap = document.querySelector("[data-nav-wrap]");
const navMenu = document.querySelector(".nav-menu");
const menuToggle = document.querySelector("[data-menu-toggle]");
const dropdownToggle = document.querySelector("[data-dropdown-toggle]");
const dropdown = document.querySelector(".dropdown");
const themeToggle = document.querySelector("[data-theme-toggle]");
const rtlToggle = document.querySelector("[data-rtl-toggle]");
const headerActions = document.querySelector(".header-actions");
const loginButton = document.querySelector(".header-actions .login-btn");
const indexMobileActions = document.querySelector("[data-index-mobile-actions]");
const yearNode = document.querySelector("[data-year]");
const monthlyToggle = document.querySelector("[data-plan='monthly']");
const yearlyToggle = document.querySelector("[data-plan='yearly']");
const animatedNodes = document.querySelectorAll(".fade-in, .reveal-up");
const authPanels = document.querySelectorAll("[data-auth-panel]");
const authSwitches = document.querySelectorAll("[data-auth-switch]");
const topbar = document.querySelector(".topbar");

function setElementId(node, fallbackId) {
    if (!node) return null;
    if (!node.id) {
        node.id = fallbackId;
    }
    return node.id;
}

// Set theme function
function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("launchpad-theme", theme);

    if (themeToggle) {
        const nextTheme = theme === "dark" ? "light" : "dark";
        themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    }
}

// Initialize theme from localStorage or system preference
function initTheme() {
    const savedTheme = localStorage.getItem("launchpad-theme");
    setTheme(savedTheme || (prefersDark.matches ? "dark" : "light"));
}

// Set direction (LTR/RTL)
function setDirection(dir) {
    root.setAttribute("dir", dir);
    localStorage.setItem("launchpad-dir", dir);

    if (rtlToggle) {
        const nextDir = dir === "rtl" ? "ltr" : "rtl";
        let label = rtlToggle.querySelector(".rtl-toggle-label");

        if (!label) {
            rtlToggle.replaceChildren();
            label = document.createElement("span");
            label.className = "rtl-toggle-label";
            rtlToggle.appendChild(label);
        }

        label.textContent = nextDir.toUpperCase();
        rtlToggle.setAttribute("aria-label", `Switch to ${nextDir.toUpperCase()} layout`);
        rtlToggle.setAttribute("title", `Switch to ${nextDir.toUpperCase()} layout`);
    }
}

// Initialize direction from localStorage
function initDirection() {
    setDirection(localStorage.getItem("launchpad-dir") || "ltr");
}

// Initialize mobile menu toggle
function initMenu() {
    if (menuToggle && navWrap) {
        const navId = setElementId(navWrap, "site-navigation");
        navWrap.setAttribute("aria-label", "Primary navigation");
        menuToggle.setAttribute("aria-controls", navId);

        menuToggle.addEventListener("click", () => {
            const isOpen = navWrap.classList.toggle("open");
            menuToggle.classList.toggle("is-open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        });
    }
}

function initMobileHeaderLayout() {
    if (!navMenu || !loginButton) return;

    const mobileQuery = window.matchMedia("(max-width: 1023.98px)");

    const syncMobileLogin = () => {
        const existingItem = navMenu.querySelector(".mobile-login-item");
        const isHomePage = document.body.classList.contains("page-home-1");

        if (mobileQuery.matches) {
            if (isHomePage && indexMobileActions && headerActions && themeToggle && rtlToggle) {
                let mobileLogin = existingItem?.querySelector(".mobile-menu-login");

                if (!mobileLogin) {
                    mobileLogin = indexMobileActions.querySelector(".mobile-menu-login");
                }

                if (!mobileLogin) {
                    mobileLogin = loginButton.cloneNode(true);
                    mobileLogin.classList.add("mobile-menu-login");
                }

                existingItem?.remove();
                indexMobileActions.replaceChildren(themeToggle, rtlToggle, mobileLogin);
                navMenu.appendChild(indexMobileActions);
                return;
            }

            if (!existingItem) {
                const mobileLoginItem = document.createElement("li");
                const mobileLogin = loginButton.cloneNode(true);

                mobileLoginItem.className = "mobile-login-item";
                mobileLogin.classList.add("mobile-menu-login");
                mobileLoginItem.appendChild(mobileLogin);
                navMenu.appendChild(mobileLoginItem);
            }
            return;
        }

        existingItem?.remove();

        if (isHomePage && indexMobileActions && headerActions && themeToggle && rtlToggle) {
            headerActions.insertBefore(themeToggle, loginButton);
            headerActions.insertBefore(rtlToggle, loginButton);
            indexMobileActions.replaceChildren();
        }
    };

    syncMobileLogin();
    mobileQuery.addEventListener("change", syncMobileLogin);
}

// Initialize dropdown toggle
function initDropdown() {
    if (dropdownToggle && dropdown) {
        dropdownToggle.setAttribute("aria-expanded", String(dropdown.classList.contains("open")));

        dropdownToggle.addEventListener("click", () => {
            const isOpen = dropdown.classList.toggle("open");
            dropdownToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }
}

// Initialize theme toggle button
function initThemeToggle() {
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            setTheme(root.dataset.theme === "dark" ? "light" : "dark");
        });
    }
}

// Initialize RTL toggle button
function initRtlToggle() {
    if (rtlToggle) {
        rtlToggle.addEventListener("click", () => {
            setDirection(root.getAttribute("dir") === "rtl" ? "ltr" : "rtl");
        });
    }
}

// Initialize countdown timer
function initCountdown() {
    document.querySelectorAll("[data-countdown]").forEach((countdownEl) => {
        const targetDate = new Date(countdownEl.dataset.countdown);
        const elements = {
            days: countdownEl.querySelector("[data-days]"),
            hours: countdownEl.querySelector("[data-hours]"),
            minutes: countdownEl.querySelector("[data-minutes]"),
            seconds: countdownEl.querySelector("[data-seconds]")
        };

        const updateCountdown = () => {
            const now = Date.now();
            const distance = Math.max(0, targetDate.getTime() - now);

            if (elements.days) {
                elements.days.textContent = String(Math.floor(distance / 864e5)).padStart(2, "0");
            }
            if (elements.hours) {
                elements.hours.textContent = String(Math.floor((distance / 36e5) % 24)).padStart(2, "0");
            }
            if (elements.minutes) {
                elements.minutes.textContent = String(Math.floor((distance / 6e4) % 60)).padStart(2, "0");
            }
            if (elements.seconds) {
                elements.seconds.textContent = String(Math.floor((distance / 1e3) % 60)).padStart(2, "0");
            }
        };

        updateCountdown();
        window.setInterval(updateCountdown, 1000);
    });
}

// Initialize slider buttons
function initSliderButtons() {
    document.querySelectorAll("[data-slider-controls]").forEach((controls) => {
        const slider = document.getElementById(controls.dataset.sliderControls);
        const slides = slider ? Array.from(slider.children) : [];
        if (!slider || slides.length === 0) return;

        let activeIndex = 0;
        let autoRotateId = null;
        let scrollEndId = null;

        const setActiveSlide = (index) => {
            activeIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("is-active", slideIndex === activeIndex);
            });

            slider.scrollTo({
                left: slides[activeIndex].offsetLeft,
                behavior: "smooth"
            });
        };

        const syncActiveFromScroll = () => {
            const sliderCenter = slider.scrollLeft + (slider.clientWidth / 2);
            let nearestIndex = 0;
            let nearestDistance = Number.POSITIVE_INFINITY;

            slides.forEach((slide, slideIndex) => {
                const slideCenter = slide.offsetLeft + (slide.clientWidth / 2);
                const distance = Math.abs(sliderCenter - slideCenter);

                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestIndex = slideIndex;
                }
            });

            activeIndex = nearestIndex;
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("is-active", slideIndex === activeIndex);
            });
        };

        const startAutoRotate = () => {
            if (slides.length < 2) return;
            window.clearInterval(autoRotateId);
            autoRotateId = window.setInterval(() => {
                setActiveSlide(activeIndex + 1);
            }, 4500);
        };

        const stopAutoRotate = () => {
            window.clearInterval(autoRotateId);
        };

        controls.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => {
                const direction = button.dataset.slide === "next" ? 1 : -1;
                setActiveSlide(activeIndex + direction);
                startAutoRotate();
            });
        });

        slider.addEventListener("mouseenter", stopAutoRotate);
        slider.addEventListener("mouseleave", startAutoRotate);
        slider.addEventListener("focusin", stopAutoRotate);
        slider.addEventListener("focusout", startAutoRotate);
        slider.addEventListener("scroll", () => {
            window.clearTimeout(scrollEndId);
            scrollEndId = window.setTimeout(syncActiveFromScroll, 100);
        });

        setActiveSlide(0);
        startAutoRotate();
    });
}

// Initialize pricing plan toggle
function initPlanToggle() {
    const priceElements = document.querySelectorAll("[data-monthly][data-yearly]");
    const periodElements = document.querySelectorAll("[data-period-monthly][data-period-yearly]");
    if (!priceElements.length || !monthlyToggle || !yearlyToggle) return;

    const updatePrices = (plan) => {
        priceElements.forEach((el) => {
            el.textContent = el.dataset[plan];
        });
        periodElements.forEach((el) => {
            el.textContent = el.dataset[`period${plan[0].toUpperCase()}${plan.slice(1)}`];
        });
        monthlyToggle.classList.toggle("active", plan === "monthly");
        yearlyToggle.classList.toggle("active", plan === "yearly");
    };

    monthlyToggle.addEventListener("click", () => updatePrices("monthly"));
    yearlyToggle.addEventListener("click", () => updatePrices("yearly"));
    updatePrices("monthly");
}

// Validate form field
function validateField(input) {
    const field = input.closest(".field");
    if (!field) return true;

    let errorMsg = field.querySelector(".error-message");
    const value = input.value.trim();
    let error = "";

    if (input.hasAttribute("required") && !value) {
        error = "This field is required.";
    } else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Enter a valid email address.";
    } else if (input.name === "password" && value.length > 0 && value.length < 8) {
        error = "Password must be at least 8 characters.";
    } else if (input.name === "confirm_password") {
        const password = input.form?.querySelector("[name='password']")?.value || "";
        if (value !== password) {
            error = "Passwords do not match.";
        }
    }

    if (!errorMsg) {
        errorMsg = document.createElement("small");
        errorMsg.className = "error-message";
        errorMsg.setAttribute("role", "alert");
        field.appendChild(errorMsg);
    }

    const errorId = setElementId(errorMsg, `${input.id || input.name || "field"}-error`);
    input.setAttribute("aria-describedby", errorId);
    input.setAttribute("aria-invalid", String(Boolean(error)));
    field.classList.toggle("has-error", Boolean(error));
    errorMsg.textContent = error;
    return !error;
}

// Initialize form validation
function initForms() {
    document.querySelectorAll("form[data-validate]").forEach((form) => {
        form.setAttribute("novalidate", "");
        const statusEl = form.querySelector("[data-form-status]");

        if (statusEl) {
            statusEl.setAttribute("role", "status");
            statusEl.setAttribute("aria-live", "polite");
        }

        form.querySelectorAll("input, textarea").forEach((input) => {
            if (!input.id && input.name) {
                input.id = `${form.className.split(" ")[0] || "form"}-${input.name}`;
            }

            input.addEventListener("blur", () => validateField(input));
            input.addEventListener("input", () => {
                if (input.getAttribute("aria-invalid") === "true") {
                    validateField(input);
                }
            });
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const isValid = Array.from(form.querySelectorAll("input, textarea")).every(validateField);
            
            if (isValid) {
                if (statusEl) {
                    statusEl.classList.remove("is-error");
                    statusEl.classList.add("is-success");
                    statusEl.textContent = "Thanks. Your details were captured successfully.";
                }
                form.reset();
                form.querySelectorAll("input, textarea").forEach((input) => {
                    input.setAttribute("aria-invalid", "false");
                    input.closest(".field")?.classList.remove("has-error");
                    const errorMsg = input.closest(".field")?.querySelector(".error-message");
                    if (errorMsg) {
                        errorMsg.textContent = "";
                    }
                });
            } else if (statusEl) {
                statusEl.classList.remove("is-success");
                statusEl.classList.add("is-error");
                statusEl.textContent = "Please review the highlighted fields and try again.";
            }
        });
    });
}

function initAuthPanels() {
    if (!authPanels.length) return;

    const setAuthPanel = (panelName) => {
        authPanels.forEach((panel) => {
            panel.hidden = panel.dataset.authPanel !== panelName;
        });
    };

    authSwitches.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            setAuthPanel(trigger.dataset.authSwitch);
        });
    });

    setAuthPanel(window.location.hash === "#signup" ? "signup" : "login");
}

// Initialize reveal animations
function initReveal() {
    if (!("IntersectionObserver" in window)) {
        animatedNodes.forEach((node) => node.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animatedNodes.forEach((node) => observer.observe(node));
}

function initPageMotion() {
    if (document.body.classList.contains("page-404")) return;

    window.requestAnimationFrame(() => {
        document.body.classList.add("page-ready");
    });
}

function initTopbarScroll() {
    if (!topbar) return;
    if (document.body.classList.contains("page-404")) return;

    const syncTopbar = () => {
        topbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    syncTopbar();
    window.addEventListener("scroll", syncTopbar, { passive: true });
}

// Initialize loading placeholders
function initLoadingPlaceholders() {
    if (!document.querySelector("[data-loading]")) {
        const target = document.querySelector("form[data-validate], .slider-track, .comparison-table-wrap, .pricing-toggle");

        if (target && target.parentElement) {
            const loadingGrid = document.createElement("div");
            loadingGrid.className = "loading-grid";
            loadingGrid.dataset.loading = "";
            loadingGrid.setAttribute("aria-hidden", "true");
            loadingGrid.innerHTML = `
                <div class="loading-card">
                    <div class="skeleton-line medium"></div>
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line"></div>
                </div>
                <div class="loading-card">
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line medium"></div>
                    <div class="skeleton-line"></div>
                </div>
                <div class="loading-card">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line medium"></div>
                </div>
            `;
            target.parentElement.insertBefore(loadingGrid, target);
        }
    }

    window.setTimeout(() => {
        document.querySelectorAll("[data-loading]").forEach((el) => {
            el.hidden = true;
        });
    }, 900);
}

// Initialize everything on DOM ready
if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}

initTheme();
initDirection();
initMenu();
initMobileHeaderLayout();
initDropdown();
initThemeToggle();
initRtlToggle();
initCountdown();
initSliderButtons();
initPlanToggle();
initForms();
initAuthPanels();
initReveal();
initPageMotion();
initTopbarScroll();
initLoadingPlaceholders();

