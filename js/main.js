document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       GLOBAL
    ========================================================== */

    const projectOrder = [
        "damanak",
        "ruhmetro",
        "motammem"
    ];

    let currentProjectIndex = 0;
    let currentDetailIndex = 0;

    let currentLanguage =
        localStorage.getItem("language") || "en";


    /* =========================================================
       ELEMENTS
    ========================================================== */

    const projectViewer =
        document.getElementById("project-drawer");

    const projectPanel =
        document.querySelector(".project-slide-panel");

    const projectDetails =
        Array.from(
            document.querySelectorAll(
                ".project-detail-project"
            )
        );

    const projectTriggers =
        Array.from(
            document.querySelectorAll(
                ".project-details-trigger"
            )
        );

    const closeButtons =
        Array.from(
            document.querySelectorAll(
                "[data-close-project]"
            )
        );


    /* =========================================================
       PROJECT NAVIGATION
    ========================================================== */

    const previousProject =
        document.getElementById(
            "detail-prev-project"
        );

    const nextProject =
        document.getElementById(
            "detail-next-project"
        );


    /* =========================================================
       DETAIL NAVIGATION
       BIG SIDE ARROWS
    ========================================================== */

    const previousDetail =
        document.getElementById(
            "detail-slide-prev"
        );

    const nextDetail =
        document.getElementById(
            "detail-slide-next"
        );


    /* =========================================================
       PROJECT DOTS
    ========================================================== */

    const projectDots =
        Array.from(
            document.querySelectorAll(
                "[data-slide-dot]"
            )
        );


    /* =========================================================
       HEADER ELEMENTS
    ========================================================== */

    const drawerCount =
        document.getElementById(
            "drawer-project-count"
        );

    const drawerCategory =
        document.getElementById(
            "drawer-category"
        );

    const drawerTitle =
        document.getElementById(
            "drawer-title"
        );

    const drawerSubtitle =
        document.getElementById(
            "drawer-subtitle"
        );

    const drawerTech =
        document.getElementById(
            "drawer-tech"
        );

    const drawerImage =
        document.getElementById(
            "drawer-image"
        );


    /* =========================================================
       PROJECT INFORMATION
       ONLY FOR THE HEADER
       ACTUAL DETAILS STAY IN HTML
    ========================================================== */

    const projectInfo = {

        damanak: {

            title: {
                en: "Damanak",
                ar: "ضمانك"
            },

            subtitle: {
                en: "Digital Warranty Management Platform",
                ar: "منصة رقمية لإدارة الضمانات"
            },

            category: {
                en: "WEB APPLICATION",
                ar: "تطبيق ويب"
            },

            technologies: [
                "ASP.NET Core MVC",
                "C#",
                "Entity Framework Core",
                "SQL Server",
                "JavaScript",
                "Bootstrap",
                "Apple Wallet"
            ],

            image:
                "images/projects/damanak.png"
        },


        ruhmetro: {

            title: {
                en: "RuhMetro",
                ar: "مترو الرياض"
            },

            subtitle: {
                en: "Riyadh Metro Experience",
                ar: "تجربة مترو الرياض"
            },

            category: {
                en: "WEB APPLICATION",
                ar: "تطبيق ويب"
            },

            technologies: [
                "React",
                "Django",
                "PostgreSQL",
                "Maps API"
            ],

            image:
                "images/projects/ruhmetro.png"
        },


        motammem: {

            title: {
                en: "Motammem",
                ar: "متمم"
            },

            subtitle: {
                en: "AI Legal Platform",
                ar: "منصة قانونية مدعومة بالذكاء الاصطناعي"
            },

            category: {
                en: "WEB APPLICATION • UI / UX",
                ar: "تطبيق ويب • UI / UX"
            },

            technologies: [
                "AI",
                "React",
                "Django",
                "PostgreSQL"
            ],

            image:
                "images/projects/motammem.png"
        }

    };


    /* =========================================================
       GET CURRENT PROJECT
    ========================================================== */

    function getCurrentProjectKey() {

        return projectOrder[
            currentProjectIndex
        ];

    }


    function getCurrentProjectElement() {

        const key =
            getCurrentProjectKey();

        return document.querySelector(
            `.project-detail-project[data-project-details="${key}"]`
        );

    }


    function getCurrentSlides() {

        const project =
            getCurrentProjectElement();

        if (!project) {
            return [];
        }

        return Array.from(
            project.querySelectorAll(
                ".project-detail-slide"
            )
        );

    }


    /* =========================================================
       UPDATE PROJECT HEADER
    ========================================================== */

    function updateProjectHeader() {

        const key =
            getCurrentProjectKey();

        const project =
            projectInfo[key];

        if (!project) {
            return;
        }


        /* Project number */

        if (drawerCount) {

            drawerCount.textContent =
                `${String(
                    currentProjectIndex + 1
                ).padStart(2, "0")} / 03`;

        }


        /* Category */

        if (drawerCategory) {

            drawerCategory.textContent =
                project.category[
                currentLanguage
                ];

        }


        /* Title */

        if (drawerTitle) {

            drawerTitle.textContent =
                project.title[
                currentLanguage
                ];

        }


        /* Subtitle */

        if (drawerSubtitle) {

            drawerSubtitle.textContent =
                project.subtitle[
                currentLanguage
                ];

        }


        /* Technologies */

        if (drawerTech) {

            drawerTech.innerHTML =
                project.technologies
                    .map(
                        tech =>
                            `<span>${tech}</span>`
                    )
                    .join("");

        }


        /* Image */

        if (drawerImage) {

            drawerImage.src =
                project.image;

        }

    }


    /* =========================================================
       SHOW CURRENT PROJECT
    ========================================================== */

    function renderProject() {

        const currentKey =
            getCurrentProjectKey();


        /* =========================================
           SHOW CURRENT PROJECT
        ========================================== */

        projectDetails.forEach(project => {

            const isCurrent =
                project.dataset.projectDetails === currentKey;


            project.classList.toggle(
                "active",
                isCurrent
            );


            if (isCurrent) {

                project.style.display = "flex";
                project.style.flexDirection = "column";
                project.style.flex = "1";
                project.style.minHeight = "0";

                /*
                 * لا نفرض ارتفاع ثابت
                 * حتى لا يختفي محتوى الديسكتوب
                 */
                project.style.height = "";

            } else {

                project.style.display = "none";
                project.style.height = "";

            }


            /* =====================================
               DETAIL SLIDES
            ===================================== */

            const slides =
                Array.from(
                    project.querySelectorAll(
                        ".project-detail-slide"
                    )
                );


            slides.forEach(
                (slide, index) => {

                    const isActive =
                        isCurrent &&
                        index === currentDetailIndex;


                    slide.classList.toggle(
                        "active",
                        isActive
                    );


                    if (isActive) {

                        slide.style.display = "flex";
                        slide.style.flexDirection = "column";
                        slide.style.flex = "1";
                        slide.style.minHeight = "0";

                        /*
                         * مهم جدًا:
                         * لا نستخدم height:100%
                         */
                        slide.style.height = "";

                    } else {

                        slide.style.display = "none";
                        slide.style.height = "";

                    }

                }
            );

        });


        /* =========================================
           UPDATE HEADER
        ========================================== */

        updateProjectHeader();


        /* =========================================
           UPDATE PROJECT NAVIGATION
        ========================================== */

        updateProjectNavigation();


        /* =========================================
           UPDATE DETAIL NAVIGATION
        ========================================== */

        updateDetailNavigation();

    }


    /* =========================================================
       DETAIL NAVIGATION
       SIDE ARROWS = 6 DETAILS
    ========================================================== */

    function updateDetailNavigation() {

        const slides =
            getCurrentSlides();

        const isFirst =
            currentDetailIndex === 0;

        const isLast =
            slides.length === 0 ||
            currentDetailIndex >=
            slides.length - 1;


        if (previousDetail) {

            previousDetail.disabled =
                isFirst;

            previousDetail.setAttribute(
                "aria-disabled",
                String(isFirst)
            );

        }


        if (nextDetail) {

            nextDetail.disabled =
                isLast;

            nextDetail.setAttribute(
                "aria-disabled",
                String(isLast)
            );

        }

    }


    /* =========================================================
       GO TO DETAIL
    ========================================================== */

    function goToDetail(index) {

        const slides =
            getCurrentSlides();

        if (!slides.length) {
            return;
        }


        if (
            index < 0 ||
            index >= slides.length
        ) {
            return;
        }


        currentDetailIndex =
            index;


        renderProject();


        /* Small animation */

        if (
            projectPanel &&
            typeof projectPanel.animate ===
            "function"
        ) {

            projectPanel.animate(

                [
                    {
                        opacity: 0.65,
                        transform:
                            "translateY(6px)"
                    },

                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                ],

                {
                    duration: 180,
                    easing: "ease-out"
                }

            );

        }

    }


    /* =========================================================
       PROJECT NAVIGATION
       BOTTOM BUTTONS = PROJECTS
    ========================================================== */

    function updateProjectNavigation() {

        const isFirstProject =
            currentProjectIndex === 0;

        const isLastProject =
            currentProjectIndex ===
            projectOrder.length - 1;


        /* -----------------------------------------
           PREVIOUS PROJECT
        ----------------------------------------- */

        if (previousProject) {

            previousProject.disabled =
                isFirstProject;

            previousProject.setAttribute(
                "aria-hidden",
                String(isFirstProject)
            );

        }


        /* -----------------------------------------
           NEXT PROJECT
        ----------------------------------------- */

        if (nextProject) {

            nextProject.disabled =
                isLastProject;

            nextProject.setAttribute(
                "aria-hidden",
                String(isLastProject)
            );

        }


        /* -----------------------------------------
           DOTS
        ----------------------------------------- */

        projectDots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentProjectIndex
                );

            }
        );

    }


    /* =========================================================
       GO TO PROJECT
    ========================================================== */

    function goToProject(index) {

        if (
            index < 0 ||
            index >= projectOrder.length
        ) {
            return;
        }


        currentProjectIndex =
            index;


        /* Every project starts from slide 01 */

        currentDetailIndex = 0;


        renderProject();

    }


    /* =========================================================
       OPEN PROJECT
    ========================================================== */

    function openProject(projectKey) {

        const index =
            projectOrder.indexOf(
                projectKey
            );


        if (index === -1) {
            return;
        }


        currentProjectIndex =
            index;


        currentDetailIndex = 0;


        renderProject();


        /* IMPORTANT:
           CSS uses .open
        */

        if (projectViewer) {

            projectViewer.classList.add(
                "open"
            );


            projectViewer.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        document.body.classList.add(
            "project-viewer-open"
        );


        document.body.classList.add(
            "project-drawer-open"
        );


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }


    /* =========================================================
       CLOSE PROJECT
    ========================================================== */

    function closeProject() {

        if (!projectViewer) {
            return;
        }


        projectViewer.classList.remove(
            "open"
        );


        projectViewer.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "project-viewer-open"
        );


        document.body.classList.remove(
            "project-drawer-open"
        );

    }


    /* =========================================================
       PROJECT BUTTONS
    ========================================================== */

    projectTriggers.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const projectKey =
                        button.dataset.project;


                    if (!projectKey) {
                        return;
                    }


                    openProject(
                        projectKey
                    );

                }
            );

        }
    );


    /* =========================================================
       CLOSE BUTTONS
    ========================================================== */

    closeButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    closeProject();

                }
            );

        }
    );


    /* =========================================================
       PREVIOUS PROJECT
    ========================================================== */

    if (previousProject) {

        previousProject.addEventListener(
            "click",
            () => {

                if (
                    currentProjectIndex > 0
                ) {

                    goToProject(
                        currentProjectIndex - 1
                    );

                }

            }
        );

    }


    /* =========================================================
       NEXT PROJECT
    ========================================================== */

    if (nextProject) {

        nextProject.addEventListener(
            "click",
            () => {

                if (
                    currentProjectIndex <
                    projectOrder.length - 1
                ) {

                    goToProject(
                        currentProjectIndex + 1
                    );

                }

            }
        );

    }


    /* =========================================================
       PREVIOUS DETAIL
    ========================================================== */

    if (previousDetail) {

        previousDetail.addEventListener(
            "click",
            () => {

                goToDetail(
                    currentDetailIndex - 1
                );

            }
        );

    }


    /* =========================================================
       NEXT DETAIL
    ========================================================== */

    if (nextDetail) {

        nextDetail.addEventListener(
            "click",
            () => {

                goToDetail(
                    currentDetailIndex + 1
                );

            }
        );

    }


    /* =========================================================
       PROJECT DOTS
    ========================================================== */

    projectDots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    goToProject(
                        index
                    );

                }
            );

        }
    );


    /* =========================================================
       ESCAPE KEY
    ========================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !projectViewer ||
                !projectViewer.classList.contains(
                    "open"
                )
            ) {
                return;
            }


            if (
                event.key === "Escape"
            ) {

                closeProject();

                return;

            }


            /* RTL / LTR aware */

            if (
                event.key === "ArrowRight"
            ) {

                if (
                    currentLanguage === "ar"
                ) {

                    goToDetail(
                        currentDetailIndex - 1
                    );

                } else {

                    goToDetail(
                        currentDetailIndex + 1
                    );

                }

            }


            if (
                event.key === "ArrowLeft"
            ) {

                if (
                    currentLanguage === "ar"
                ) {

                    goToDetail(
                        currentDetailIndex + 1
                    );

                } else {

                    goToDetail(
                        currentDetailIndex - 1
                    );

                }

            }

        }
    );


    /* =========================================================
       LANGUAGE
    ========================================================== */

    const languageButton =
        document.getElementById(
            "language-toggle"
        );


    function applyLanguage(language) {

        currentLanguage =
            language;


        const elements =
            document.querySelectorAll(
                "[data-en][data-ar]"
            );


        elements.forEach(
            element => {

                const value =
                    element.dataset[
                    language === "ar"
                        ? "ar"
                        : "en"
                    ];


                if (
                    value !== undefined
                ) {

                    /*
                     * Keep the HTML structure
                     * when possible.
                     */

                    element.textContent =
                        value;

                }

            }
        );


        document.documentElement.lang =
            language;


        document.documentElement.dir =
            language === "ar"
                ? "rtl"
                : "ltr";


        document.body.classList.toggle(
            "rtl",
            language === "ar"
        );


        if (languageButton) {

            languageButton.textContent =
                language === "ar"
                    ? "English"
                    : "عربي";

        }


        localStorage.setItem(
            "language",
            language
        );


        /*
         * Update project header
         * if viewer is currently open
         */

        if (
            projectViewer &&
            projectViewer.classList.contains(
                "open"
            )
        ) {

            updateProjectHeader();

        }

    }


    if (languageButton) {

        languageButton.addEventListener(
            "click",
            () => {

                applyLanguage(
                    currentLanguage === "en"
                        ? "ar"
                        : "en"
                );

            }
        );

    }


    /* =========================================================
       SCROLL REVEAL
    ========================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .fade-up, .project-card, section"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible",
                                    "revealed",
                                    "show"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.08
                }

            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );


    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible",
                    "revealed",
                    "show"
                );

            }
        );

    }


    /* =========================================================
       INITIAL STATE
    ========================================================== */

    if (projectViewer) {

        projectViewer.classList.remove(
            "open"
        );


        projectViewer.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /*
     * Start with Damanak / Slide 01
     */

    currentProjectIndex = 0;
    currentDetailIndex = 0;


    renderProject();


    /*
     * Apply saved language
     */

    applyLanguage(
        currentLanguage
    );

});