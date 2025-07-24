let sideMenu = document.querySelector('#side-menu');
let sideBar = document.querySelector('.side-bar');

sideMenu.onclick = () => {
   sideMenu.classList.toggle('fa-times');
   sideBar.classList.toggle('active');
};

let galleryImages = document.querySelectorAll('.image-container img');
let imagePop = document.querySelector('.image-popup');

galleryImages.forEach(img => {
   img.onclick = () => {
      let imageSrc = img.getAttribute('src');
      let imageCat = img.getAttribute('data-cat');
      let imageYear = img.getAttribute('data-year');
      let imageMaterial = img.getAttribute('data-material'); // ✅ 수정된 부분

      imagePop.style.display = 'flex';
      imagePop.querySelector('img').src = imageSrc;

      // ✅ 설명 텍스트 채우기
      imagePop.querySelector('.popup-cat').textContent = `Category: ${imageCat}`;
      imagePop.querySelector('.popup-year').textContent = `Year: ${imageYear}`;
      imagePop.querySelector('.popup-material').textContent = `Material: ${imageMaterial}`;
   };
});

imagePop.onclick = () => {
   imagePop.style.display = 'none';
};

document.querySelector('#search-box').oninput = () => {
   let value = document.querySelector('#search-box').value.toLowerCase();
   galleryImages.forEach(img => {
      let filter = img.getAttribute('data-search').toLowerCase();
      img.style.display = filter.includes(value) ? 'block' : 'none';
   });
};

let categoryBtn = document.querySelectorAll('.category .btn');
categoryBtn.forEach(btn => {
   btn.onclick = () => {
      categoryBtn.forEach(remove => remove.classList.remove('active'));
      let dataCategory = btn.getAttribute('data-category');
      galleryImages.forEach(img => {
         let imgCat = img.getAttribute('data-cat');
         img.style.display = (dataCategory === 'all' || dataCategory === imgCat) ? 'block' : 'none';
      });
      btn.classList.add('active');
   };
});

let typeBtn = document.querySelectorAll('.type .btn');
typeBtn.forEach(btn => {
   btn.onclick = () => {
      typeBtn.forEach(remove => remove.classList.remove('active'));
      let datamaterial = btn.getAttribute('data-material');
      galleryImages.forEach(img => {
         let imgmaterial = img.getAttribute('data-material');
         img.style.display = (datamaterial === 'all' || datamaterial === imgmaterial) ? 'block' : 'none';
      });
      btn.classList.add('active');
   };
});

let yearBtn = document.querySelectorAll('.year .btn');
yearBtn.forEach(btn => {
   btn.onclick = () => {
      yearBtn.forEach(remove => remove.classList.remove('active'));
      let datayear = btn.getAttribute('data-year');
      galleryImages.forEach(img => {
         let imgyear = img.getAttribute('data-year');
         img.style.display = (datayear === 'all' || datayear === imgyear) ? 'block' : 'none';
      });
      btn.classList.add('active');
   };
});

document.querySelector('.reset-btn .btn').onclick = () => {
   window.location.reload();
};

let currentIndex = 0;

function showPopup(index) {
   currentIndex = index;
   let img = galleryImages[index];
   imagePop.style.display = 'flex';
   imagePop.querySelector('img').src = img.getAttribute('src');
   imagePop.querySelector('.popup-cat').textContent = `Category: ${img.getAttribute('data-cat')}`;
   imagePop.querySelector('.popup-year').textContent = `Year: ${img.getAttribute('data-year')}`;
   imagePop.querySelector('.popup-material').textContent = `Material: ${img.getAttribute('data-material')}`;
}

// 기존 galleryImages 클릭 이벤트 수정: showPopup 함수 사용
galleryImages.forEach((img, idx) => {
   img.onclick = () => {
      showPopup(idx);
   };
});

// 팝업 이미지 클릭 시 다음 이미지로 넘어가기
imagePop.querySelector('img').onclick = (e) => {
   e.stopPropagation(); // 팝업 닫기 이벤트 방지
   currentIndex = (currentIndex + 1) % galleryImages.length;
   showPopup(currentIndex);
};