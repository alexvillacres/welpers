const h = () => {
  Array.from(document.querySelectorAll("[wp-timed-tabs]")).forEach((s) => {
    const n = Array.from(s.querySelectorAll("a")), i = n.length, d = parseInt(s.getAttribute("wp-tabs-timed") ?? "3000", 10);
    n.forEach((t) => {
      t.addEventListener("click", (e) => e.preventDefault());
    });
    const l = () => {
      let t = 0;
      return {
        switchTab: () => {
          n[t].click(), t = (t + 1) % i;
        },
        setCurrentIndex(e) {
          t = e;
        }
      };
    }, { switchTab: u, setCurrentIndex: v } = l(), b = (t, e) => window.setInterval(t, e), o = (t) => {
      t != null && window.clearInterval(t);
    };
    let r;
    const a = () => {
      o(r), r = b(u, d);
    }, w = () => {
      o(r);
    }, c = s.closest("[vdx-tabs-pause]");
    c ? (c.addEventListener("mouseenter", w), c.addEventListener("mouseleave", a)) : n.forEach((t, e) => {
      t.addEventListener("click", () => {
        v(e), a();
      });
    }), a();
  });
};
document.addEventListener("DOMContentLoaded", () => {
  console.log("Ready"), h();
});
