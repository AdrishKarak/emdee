"use client";

import { useEffect } from "react";

export default function HashScrollHandler() {
  useEffect(() => {
    // Prevent default scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToHash = (hash) => {
      if (!hash) return;

      const element = document.querySelector(hash);
      if (element) {
        // Increased delay to ensure animations complete and content is fully rendered
        setTimeout(() => {
          // Get element position and account for fixed navbar height (80px)
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 600);
      }
    };

    // Handle initial hash on page load
    const initialHash = window.location.hash;
    if (initialHash) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash(initialHash));
      });
    }

    // Listen for hash changes (same-page navigation)
    const handleHashChange = () => {
      const hash = window.location.hash;
      scrollToHash(hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    // Intercept clicks on hash links to prevent browser's default snap behavior
    const handleClick = (e) => {
      const target = e.target.closest("a[href^='/#'], a[href^='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.includes("#")) return;

      // Only handle same-page hash links
      const hash = href.includes("/#")
        ? href.split("/#")[1]
        : href.substring(1);
      if (!hash) return;

      // Check if we're on the same page
      const currentPath = window.location.pathname;
      const linkPath = href.startsWith("/#") ? "/" : currentPath;

      if (currentPath === linkPath) {
        e.preventDefault();

        // Update URL without triggering default scroll
        window.history.pushState(null, "", `${linkPath}#${hash}`);

        // Smooth scroll to element
        scrollToHash(`#${hash}`);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
