import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

function updateView() {
  let tlWrap = document.querySelector(".timeline-inner").offsetWidth;
  gsap.set(".content", {
    width: (tlWrap - 50) / 4,
    height: (tlWrap - 50) / 4
  });

  gsap.set(".arrow", {
    height: (tlWrap - 50) / 4
  });
  gsap.set(".timeline-inner", {
    maxHeight: (tlWrap - 50) / 4,
    height: (tlWrap - 50) / 4
  });
}
updateView();
window.onresize = updateView;

const tw = gsap.timeline({
  scrollTrigger: {
    trigger: ".timeline-wrap",
    scrub: true,
    pin: true,
    start: "52% 50%",
    end: "+=500%",
    //       id: "__TW",
    //       markers: {
    //         startColor: "yellow",
    //         endColor: "orange",
    //         indent: 500
    //       },
    toggleActions: "play none none reverse",
    onUpdate: (self) => console.log("progress:", self.progress)
  },
  defaults: { ease: "linear" }
});
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.content_1',
    scrub: true,
    //       pin: true,
    start: 'top 73%',
    end: 'bottom center',
    //       id: "__tl",
    //       markers: {
    //         startColor: "blue",
    //         endColor: "pink",
    //         indent: 200
    //       },
    toggleActions: 'play none none reverse'
  }
})
let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.content',
    scrub: true,
    //       pin: true,
    start: '50% 50%',
    end: '+=530%',
    //       id: "__tl2",
    //       markers: {
    //         indent: 0
    //       },
    toggleActions: 'play none none reverse'
  }
})

tl
  .to(".circle1", {
    width: "100%",
    height: "100%"
  })
  .to(".content_1 .items", {
    opacity: 1
  })
  .to(
    ".content_1 .logo",
    {
      opacity: 1
    },
    "<"
  )
  .to(".circle1", {
    width: "115%",
    height: "115%"
  })
  .to(
    ".circle2",
    {
      opacity: 1
    },
    "<"
  );
tl2
  .to(
    ".circle1",
    {
      width: "205%",
      height: "205%"
    },
    "+=0.3"
  )
  .to(
    ".circle2",
    {
      width: "100%",
      height: "100%"
    },
    "<"
  )
  .to(
    ".rectangle1",
    {
      opacity: 1,
      width: "100%"
    },
    "<"
  )
  .to(".content_2 .items", {
    opacity: 1
  })
  .to(
    ".content_2 .logo",
    {
      opacity: 1
    },
    "<"
  )
  .to(
    ".content_2 .logo img",
    {
      width: "9.5vw"
    },
    "<"
  )
  .to(".circle1", {
    width: "220%",
    height: "220%"
  })
  .to(
    ".circle2",
    {
      width: "115%",
      height: "115%"
    },
    "<"
  )
  .to(
    ".circle3",
    {
      opacity: 1
    },
    "<"
  )
  .to(".circle1", {
    width: "310%",
    height: "310%"
  })
  .to(
    ".circle2",
    {
      width: "205%",
      height: "205%"
    },
    "<"
  )
  .to(
    ".circle3",
    {
      width: "100%",
      height: "100%"
    },
    "<"
  )
  .to(
    ".rectangle2",
    {
      opacity: 1,
      width: "100%"
    },
    "<"
  )
  .to(".content_3 .items", {
    opacity: 1
  })
  .to(
    ".content_3 .logo",
    {
      opacity: 1
    },
    "<"
  )
  .to(".circle1", {
    width: "325%",
    height: "325%"
  })
  .to(
    ".circle2",
    {
      width: "220%",
      height: "220%"
    },
    "<"
  )
  .to(
    ".circle3",
    {
      width: "115%",
      height: "115%"
    },
    "<"
  )
  .to(
    ".circle4",
    {
      opacity: 1
    },
    "<"
  )
  .to(".circle1", {
    width: "415%",
    height: "335%"
  })
  .to(
    ".circle2",
    {
      width: "310%",
      height: "235%"
    },
    "<"
  )
  .to(
    ".circle3",
    {
      width: "205%",
      height: "160%"
    },
    "<"
  )
  .to(
    ".circle4",
    {
      width: "100%",
      height: "100%"
    },
    "<"
  )
  .to(
    ".rectangle3",
    {
      opacity: 1,
      width: "100%"
    },
    "<"
  )
  .to(".content_4 .items", {
    opacity: 1
  })
  .to(
    ".content_4 .logo",
    {
      opacity: 1
    },
    "<"
  )
  .to(".rectangle4", {
    opacity: 1,
    width: "60%"
  })
  .to(".content .items", {
    y: 100,
    opacity: 0,
    height: 0,
    marginBottom: 0
  })
  .to(
    ".content_1>.inner",
    {
      top: 0
    },
    "<"
  )
  .to(
    ".circle",
    {
      opacity: 0
    },
    "<"
  )
  .to(
    ".content_1 .logo img",
    {
      width: "7.41vw"
    },
    "<"
  )
  .to(
    ".arrow1",
    {
      left: "90%",
      ease: "none"
    },
    "-=0.6"
  )
  .to(
    ".arrow2",
    {
      left: "100%",
      ease: "none"
    },
    "-=0.4"
  );
