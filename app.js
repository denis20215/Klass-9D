$(function() {


    /* Fixed Header */
    let header = $("#header");
    let intro = $("#intro");
    let introH = intro.innerHeight();
    let scrollPos = $(window).scrollTop();
    let nav = $("#nav");
    let navToggle = $("#navToggle");

    checkScroll(scrollPos, introH);

    $(window).on("scroll resize", function() {
        introH = intro.innerHeight();
        scrollPos = $(this).scrollTop();

        checkScroll(scrollPos, introH);
    });

    function checkScroll(scrollPos, introH) {
        if( scrollPos > introH ) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }



    /* Smooth scroll */
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let elementId = $(this).data('scroll');
        let elementOffset = $(elementId).offset().top;

        nav.removeClass("show");

        $("html, body").animate({
            scrollTop: elementOffset - 94
        }, 700);
    });



    /* Nav Toggle */
    navToggle.on("click", function(event) {
        event.preventDefault();

        nav.toggleClass("show");
    });



    /* Reviews: https://kenwheeler.github.io/slick/ */
    let slider = $("#reviewsSlider");

    slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
    });



});

function init() {
  const slider = document.querySelector(".slider");
  const nextBtn = slider.querySelector(".slider .nav .next");
  const prevBtn = slider.querySelector(".slider .nav .prev");
  const items = slider.querySelectorAll(".slider .item");
  let current = 0;
  items.forEach((item) => {
    const textWrapper1 = item.querySelector(".item-title");
    textWrapper1.innerHTML = textWrapper1.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    const textWrapper2 = item.querySelector(".item-text");
    textWrapper2.innerHTML = textWrapper2.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
  });
  function anim(current, next, callback) {
    const currentImgs = current.querySelectorAll(".img");
    const currentText = current.querySelectorAll(".content .letter");
    const nextImgs = next.querySelectorAll(".img");
    const nextText = next.querySelectorAll(".content .letter");
    const duration = 400;
    const offset = "-=" + 300;
    const imgOffset = duration * 0.8;
    const tl = anime.timeline({
      easing: "easeInOutQuint",
      duration: duration,
      complete: callback,
    });
    // Add children
    tl.add({
      targets: currentText,
      translateY: [0, "-150px"],
      opacity: [1, 0],
      easing: "easeInQuint",
      duration: 600,
      delay: 0,
    })
      .add(
        {
          targets: currentImgs[0],
          translateY: -600,
          rotate: [0, "-15deg"],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        offset
      )
      .add(
        {
          targets: currentImgs[1],
          translateY: -600,
          rotate: [0, "15deg"],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: currentImgs[2],
          translateY: -600,
          rotate: [0, "-15deg"],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: currentImgs[3],
          translateY: -600,
          rotate: [0, "15deg"],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        "-=" + imgOffset
      )
      .add({
        targets: current,
        opacity: 0,
        duration: 10,
        easing: "easeInCubic",
      })
      .add(
        {
          targets: next,
          opacity: 1,
          duration: 10,
        },
        offset
      )
      .add(
        {
          targets: nextImgs[0],
          translateY: [600, 0],
          rotate: ["15deg", 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
        },
        offset
      )
      .add(
        {
          targets: nextImgs[1],
          translateY: [600, 0],
          rotate: ["-15deg", 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: nextImgs[2],
          translateY: [600, 0],
          rotate: ["15deg", 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: nextImgs[3],
          translateY: [600, 0],
          rotate: ["-15deg", 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: nextText,
          translateY: ["150px", 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
          duration: 600,
          delay: (el, i) => 10 * (i + 1),
        },
        offset
      );
  }
  let isPlaying = false;
  function updateSlider(newIndex) {
    const currentItem = items[current];
    const newItem = items[newIndex];
    function callback() {
      currentItem.classList.remove("is-active");
      newItem.classList.add("is-active");
      current = newIndex;
      isPlaying = false;
    }
    anim(currentItem, newItem, callback);
  }
  function next() {
    if (isPlaying) return;
    isPlaying = true;
    const newIndex = current === items.length - 1 ? 0 : current + 1;
    updateSlider(newIndex);
  }
  function prev() {
    if (isPlaying) return;
    isPlaying = true;
    const newIndex = current === 0 ? items.length - 1 : current - 1;
    updateSlider(newIndex);
  }
  nextBtn.onclick = next;
  prevBtn.onclick = prev;
}
document.addEventListener("DOMContentLoaded", init);