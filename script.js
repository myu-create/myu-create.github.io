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