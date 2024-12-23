document.addEventListener("DOMContentLoaded", () => {
    // const icon = document.querySelector('.select_area_list .ic');
    // const selectArea = document.querySelector('.select_area');
    // const unit = document.querySelector('.unit');
    // console.log(document.querySelector('.ic'));
    // console.log(document.querySelector('.select_area'));
    // console.log(document.querySelector('.unit'));


    // icon.addEventListener('click', () => {
    //     if (icon.classList.contains('ic_plus')) {
    //         // 열기
    //     console.log("클릭");
    //         icon.classList.remove('ic_plus');
    //         icon.classList.add('ic_minus');
    //         selectArea.classList.add('open');
    //         unit.classList.add('hidden'); // .unit 숨기기
    //     } else {
    //         // 닫기
    //         icon.classList.remove('ic_minus');
    //         icon.classList.add('ic_plus');
    //         selectArea.classList.remove('open');
    //         unit.classList.remove('hidden'); // .unit 다시 보이기
    //     }
    // });

    const closeButton = document.querySelector('.ic_close_btn');
    const selectArea = document.querySelector('.select_area_list');
    let isMoved = false; // 현재 버튼의 상태 (이동 여부)

    closeButton.addEventListener('click', () => {
        if (!isMoved) {
            closeButton.classList.remove('return'); // 돌아오는 클래스 제거
            closeButton.classList.add('move'); // 굴러가는 클래스 추가
            selectArea.classList.add('visible');
        } else {
            closeButton.classList.remove('move'); // 굴러가는 클래스 제거
            closeButton.classList.add('return'); // 돌아오는 클래스 추가
            selectArea.classList.remove('visible'); // select_area 숨기기
        }

        isMoved = !isMoved; // 상태 반전
    });

    // 굴러가는 애니메이션 종료 후 select_area 보이기
    // closeButton.addEventListener('animationend', () => {
    //     if (isMoved) {
    //         selectArea.classList.add('visible'); // select_area 서서히 보이기
    //     }
    // });
});