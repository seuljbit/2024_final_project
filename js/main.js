document.addEventListener('DOMContentLoaded', function () {
    const svg = document.querySelector('.owl'); // SVG 요소
    const leftPath = document.querySelector('.left-eye'); // 왼쪽 눈 path
    const rightPath = document.querySelector('.right-eye'); // 오른쪽 눈 path
  
    // 경계 상자(Bounding Box)로 중심 좌표 계산
    const leftBBox = leftPath.getBBox();
    const leftEyeCenterX = leftBBox.x + leftBBox.width / 2;
    const leftEyeCenterY = leftBBox.y + leftBBox.height / 2;
  
    const rightBBox = rightPath.getBBox();
    const rightEyeCenterX = rightBBox.x + rightBBox.width / 2;
    const rightEyeCenterY = rightBBox.y + rightBBox.height / 2;
  
    // 눈동자 요소 가져오기
    const leftPupil = document.querySelector('.left-pupil');
    const rightPupil = document.querySelector('.right-pupil');
  
    let targetLeft = { x: leftEyeCenterX, y: leftEyeCenterY }; // 왼쪽 눈 목표 좌표
    let targetRight = { x: rightEyeCenterX, y: rightEyeCenterY }; // 오른쪽 눈 목표 좌표
  
    const updatePupilPosition = (pupil, currentX, currentY, targetX, targetY, eyeCenterX, eyeCenterY, maxDistance) => {
      const smoothingFactor = 0.2; // 부드러운 이동 비율
      const deltaX = targetX - eyeCenterX;
      const deltaY = targetY - eyeCenterY;
  
      // 목표 위치와 눈 중심 간의 거리 계산
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
      // 최대 이동 거리 내로 제한
      const clampedDistance = Math.min(distance, maxDistance);
  
      // 제한된 거리와 각도를 기반으로 목표 좌표 조정
      const angle = Math.atan2(deltaY, deltaX);
      const adjustedTargetX = eyeCenterX + clampedDistance * Math.cos(angle);
      const adjustedTargetY = eyeCenterY + clampedDistance * Math.sin(angle);
  
      const nextX = currentX + (adjustedTargetX - currentX) * smoothingFactor;
      const nextY = currentY + (adjustedTargetY - currentY) * smoothingFactor;
  
      pupil.setAttribute('cx', nextX);
      pupil.setAttribute('cy', nextY);
  
      return { x: nextX, y: nextY }; // 다음 위치 반환
    };
  
    document.addEventListener('mousemove', (e) => {
      const point = svg.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
  
      const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
  
      targetLeft = { x: svgPoint.x, y: svgPoint.y }; // 왼쪽 눈 목표 위치
      targetRight = { x: svgPoint.x, y: svgPoint.y }; // 오른쪽 눈 목표 위치
    });
  
    const eyeRadius = 12; // 눈 반지름
    const pupilRadius = 4.5; // 눈동자 반지름
    const maxDistance = eyeRadius - pupilRadius; // 최대 이동 거리
  
    let currentLeft = { x: leftEyeCenterX, y: leftEyeCenterY }; // 왼쪽 눈 현재 위치
    let currentRight = { x: rightEyeCenterX, y: rightEyeCenterY }; // 오른쪽 눈 현재 위치
  
    const animate = () => {
      // 왼쪽 눈 업데이트
      currentLeft = updatePupilPosition(
        leftPupil,
        currentLeft.x,
        currentLeft.y,
        targetLeft.x,
        targetLeft.y,
        leftEyeCenterX,
        leftEyeCenterY,
        maxDistance
      );
  
      // 오른쪽 눈 업데이트
      currentRight = updatePupilPosition(
        rightPupil,
        currentRight.x,
        currentRight.y,
        targetRight.x,
        targetRight.y,
        rightEyeCenterX,
        rightEyeCenterY,
        maxDistance
      );
  
      requestAnimationFrame(animate);
    };
    animate();
});

// Swiper 초기화
var swiper = new Swiper(".mySwiper", {
  autoplay: {
    delay: 1000000, // 자동 재생 시간 설정
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true, // 슬라이드 반복
  on: {
    slideChangeTransitionStart: function () {
      // 현재 활성 슬라이드 가져오기
      const activeSlide = document.querySelector(".swiper-slide-active");

      if (activeSlide.classList.contains("slide1")) {
        gsap.fromTo(
          ".milk-effect",
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }, // 처음엔 없도록
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 75% 90%, 50% 100%, 25% 90%, 0% 80%)", duration: 2, ease: "power2.out" } // 점차 엎질러짐
        );
      }
      if (activeSlide.classList.contains("slide2")) {
        var tl = gsap.timeline({ defaults: { duration: 2, ease: "circ.inOut" } }); // 지속 시간 0.5초로 조정
          // circ 애니메이션
          tl.fromTo(
            ".circ",
            { x:"10%", y:"-50%", scale: 0.5, opacity: 0 }, // 초기 상태
            { x:"10%", y:"-50%", scale: 1, opacity: 1 }, 0.1 // 최종 상태
          )
          tl.fromTo(
            ".circ1",
            { scale: 0.5, opacity: 0 }, // 초기 상태
            { scale: 1, opacity: 1 }, 0.1 // 최종 상태
          )
          tl.fromTo(
            ".circ2",
            { scale: 0.5, opacity: 0 }, // 초기 상태
            { scale: 1, opacity: 1 }, 0.1 // 최종 상태
          )
          tl.fromTo(
            ".circ3",
            { x:"70%", y:"50%", scale: 0.5, opacity: 0 }, // 초기 상태
            { scale: 1, opacity: 1 }, 0.1 // 최종 상태
          )
          tl.fromTo(
            ".text_area > p",
            {opacity: 0},
            {opacity: 1}, 0
          )
          // main_kid 애니메이션 (circ가 끝난 뒤 시작)
          tl.fromTo(
            ".main_kid",
            { scale: 0.3, opacity: 0 }, // 초기 상태
            { scale: 0.65, opacity: 1 }, 0.4 // 최종 상태
          );
      }

      if (activeSlide.classList.contains("slide3")) {
        var tl = gsap.timeline({ defaults: { duration: 1.5, ease: "bounce.inOut" } });
      
        // .text_area > p 개별 텍스트 애니메이션
        tl.fromTo(
          ".text_area",
          { opacity: 0, y: 1000 },
          { opacity: 1, y: 0}, 0
        )
        tl.fromTo(
          ".trophy",
          { opacity: 0, y: 1000 },
          { opacity: 1, y: 0}, 0.7
        );
      }      
      
      if (activeSlide.classList.contains("slide4")) {
        var tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power2.out" } });

        // 애니메이션 추가
        tl.fromTo(".slide4 .center",
          { x:"-50%", y:"-50%", scale: 1, opacity: 0 }, // 초기 상태
          { opacity: 1 }, // 최종 상태
          0 ) // 동시에 실행 시작

        // book 애니메이션 (공통 처리)
        tl.fromTo(
          ".slide4 .book", // 모든 책을 선택
          { x: 0, y: 1000, opacity: 0.3 }, // 초기 상태
          { opacity: 1, // 공통 최종 상태
            y: (i) => {
              switch (i) {
                case 0: return 10; // 첫 번째 요소
                case 1: return 70;  // 두 번째 요소
                case 2: return 120; // 세 번째 요소
                case 3: return 165; // 세 번째 요소
                case 4: return 210; // 세 번째 요소
                default: return 0;  // 나머지 요소
              }
            },
            stagger: 0.3 // 동시에 실행
          }, 0 // 타임라인에서 동일 시작 시간
        );
      } else {
        // 다른 슬라이드로 전환 시 초기화
        gsap.set(".slide4 .center", {opacity: 0 });
      }
      
      
      // slide_right 활성화 확인
      if (document.querySelector(".slide5")) {
        const slideRight = document.querySelector(".slide_right");
        const slideHeight = slideRight.offsetHeight; // 부모 높이 계산

        gsap.to(slideRight, {
          y: `-=${slideHeight}`, // 부모 높이만큼 위로 이동
          duration: 10, // 10초 동안 한 번 이동
          repeat: -1, // 무한 반복
          ease: "none", // 일정한 속도로 이동
          modifiers: {
            y: (y) => {
              const numY = parseFloat(y); // 현재 y 값을 숫자로 변환
              return (numY % slideHeight) + "px"; // 높이를 넘어가면 초기 위치로
            },
          },
        });
      }
    },
  },
});

// 첫 번째 슬라이드 애니메이션 수동 실행
document.addEventListener("DOMContentLoaded", function () {
  const firstSlide = document.querySelector(".swiper-slide-active");

  if (firstSlide && firstSlide.classList.contains("slide1")) {
    gsap.fromTo(
      ".milk-effect",
      { clipPath: "path('M 0 0 L 100% 0 L 100% 0 L 0 0 Z')" }, // 초기에는 없도록
      { clipPath: "path('M 0 0 L 100% 0 L 100% 70% Q 80% 90%, 50% 100% T 0 70% Z')", duration: 2, ease: "power2.out" }
    );
  }
});

