/* =========================================================
   BeiRoot's Café
   Main JavaScript — Version 1.0
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu after clicking a navigation link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNav &&
                !clickedToggle &&
                mainNav.classList.contains("open")
            ) {

                mainNav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    }


    /* =====================================================
       CURRENT YEAR
       Automatically updates footer year when used.
    ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    if (yearElements.length) {

        const currentYear =
            new Date().getFullYear();

        yearElements.forEach((element) => {
            element.textContent = currentYear;
        });

    }


    /* =====================================================
       IMAGE ERROR HANDLING
       Prevents broken images from looking unfinished.
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            console.warn(
                "BeiRoot's Café: Image could not be loaded:",
                image.src
            );

        });

    });


    /* =====================================================
       SMOOTH ANCHOR LINKS
       Used for links such as #menu or #contact.
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       ESCAPE KEY
       Closes the mobile menu.
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            mainNav &&
            mainNav.classList.contains("open")
        ) {

            mainNav.classList.remove("open");

            if (menuToggle) {

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.focus();

            }

        }

    });

});