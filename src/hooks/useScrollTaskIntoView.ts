import { TodoListItem } from "@/types";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const SCROLL_DEBOUNCE_TIMEOUT_MS = 100;

interface useScrollTaskIntoViewProps {
  containerRef: RefObject<HTMLDivElement>;
  selectedItem: TodoListItem;
}

export default function useScrollTaskIntoView({
  containerRef,
  selectedItem,
}: useScrollTaskIntoViewProps) {
  const isScrolling = useRef(false);
  const scrollTimeoutId = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (!containerRef.current || !selectedItem) return;

    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip observer if manual scroll
        if (isScrolling.current) return;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const targetElement = entry.target as HTMLElement;
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        });
      },
      {
        root: container,
        threshold: 1,
      }
    );

    const activeEl = container.querySelector(`[data-id="${selectedItem.id}"]`);
    if (activeEl) observer.observe(activeEl);

    return () => {
      if (activeEl) observer.unobserve(activeEl);
    };
  }, [selectedItem]);

  useEffect(() => {
    const handleScroll = () => {
      isScrolling.current = true;
      if (scrollTimeoutId.current) clearTimeout(scrollTimeoutId.current);

      scrollTimeoutId.current = setTimeout(() => {
        isScrolling.current = false;
      }, SCROLL_DEBOUNCE_TIMEOUT_MS);
    };

    const handleWheel = () => {
      isScrolling.current = true;
      if (scrollTimeoutId.current) clearTimeout(scrollTimeoutId.current);

      scrollTimeoutId.current = setTimeout(() => {
        isScrolling.current = false;
      }, SCROLL_DEBOUNCE_TIMEOUT_MS);
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    container?.addEventListener("wheel", handleWheel);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      container?.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutId.current) clearTimeout(scrollTimeoutId.current);
    };
  }, []);
}
