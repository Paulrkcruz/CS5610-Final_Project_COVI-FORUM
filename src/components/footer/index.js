import React, { useEffect, useState } from "react";
import "./footer.css";

const Footer = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [forumHeight, setForumHeight] = useState(0);
  const [className, setClassName] = useState("");

  const setWindow = (event) => {
    setWindowHeight(event.target.innerHeight);
  };

  const attachResizeObserver = () => {
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", setWindow);
    var observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        setForumHeight(cr.height + cr.top);
      }
    });
    const forumBody = document.getElementById("forum-body");
    observer.observe(forumBody);

    return () => {
      window.removeEventListener("resize", setWindow);
      observer.unobserve(forumBody);
    };
  };

  useEffect(attachResizeObserver, []);

  useEffect(() => {
    if (windowHeight > forumHeight) {
      setClassName("bottom");
    } else {
      setClassName("");
    }
  }, [windowHeight, forumHeight]);

  return (
    <footer role="contentinfo" className={className}>
      <div className="copyright">
        Coviforum - A place to discuss COVID-19 related illness     Copyright © 2020,
      </div>
    </footer>
  );
};

export default Footer;
