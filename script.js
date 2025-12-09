let sideMenu = document.querySelector('#side-menu');
let sideBar = document.querySelector('.side-bar');

sideMenu.onclick = () => {
   sideMenu.classList.toggle('fa-times');
   sideBar.classList.toggle('active');
};

let galleryImages = document.querySelectorAll('.image-container img');
let imagePop = document.querySelector('.image-popup');

document.querySelector('#search-box').oninput = () => {
   let value = document.querySelector('#search-box').value.toLowerCase();
   galleryImages.forEach(img => {
      let filter = img.getAttribute('data-search').toLowerCase();
      img.style.display = filter.includes(value) ? 'block' : 'none';
   });
};

// 사용 가능한 필터만 표시하는 함수
function filterAvailableOptions() {
   const allImages = document.querySelectorAll('.image-container img');
   
   // 카테고리 필터링
   const categoryButtons = document.querySelectorAll('.category .btn[data-category]');
   const availableCategories = new Set();
   
   allImages.forEach(img => {
      const category = img.getAttribute('data-cat');
      if (category) availableCategories.add(category);
   });
   
   categoryButtons.forEach(btn => {
      const category = btn.getAttribute('data-category');
      if (category === 'all') {
         btn.style.display = 'block';
         return;
      }
      btn.style.display = availableCategories.has(category) ? 'block' : 'none';
   });
   
   // 머티리얼 필터링
   const materialButtons = document.querySelectorAll('.material .btn[data-material]');
   const availableMaterials = new Set();
   
   allImages.forEach(img => {
      const material = img.getAttribute('data-material');
      if (material) availableMaterials.add(material);
   });
   
   materialButtons.forEach(btn => {
      const material = btn.getAttribute('data-material');
      if (material === 'all') {
         btn.style.display = 'block';
         return;
      }
      btn.style.display = availableMaterials.has(material) ? 'block' : 'none';
   });
   
   // 년도 필터링
   const yearButtons = document.querySelectorAll('.year .btn[data-year]');
   const availableYears = new Set();
   
   allImages.forEach(img => {
      const year = img.getAttribute('data-year');
      if (year) availableYears.add(year);
   });
   
   yearButtons.forEach(btn => {
      const year = btn.getAttribute('data-year');
      if (year === 'all') {
         btn.style.display = 'block';
         return;
      }
      btn.style.display = availableYears.has(year) ? 'block' : 'none';
   });
}

// 페이지 로드 시 실행
filterAvailableOptions();

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

let typeBtn = document.querySelectorAll('.material .btn');
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

galleryImages.forEach((img, idx) => {
   img.onclick = () => {
      showPopup(idx);
   };
});

imagePop.onclick = () => {
   imagePop.style.display = 'none';
};

imagePop.querySelector('img').onclick = (e) => {
   e.stopPropagation();
   currentIndex = (currentIndex + 1) % galleryImages.length;
   showPopup(currentIndex);
};