//============================================ Lazy load images ============================================
//==========================================================================================================
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));
//=========================================== Masonry for images ===========================================
//==========================================================================================================
function resizeMasonryItem(item = null, isResized = false) {

  console.log("abc")
 
    if (item) {

      let grid = document.getElementsByClassName('masonry')[0];
      if (grid) {
        let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        let gridImagesAsContent = item.querySelector('img.masonry-content');
        let rowSpan = Math.floor((item.querySelector('.masonry-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = 'span ' + rowSpan;
      }
    }
  }




let isResized = true;
function resizeAllMasonryItems() {

  console.log("xyz")


  setTimeout(()=>{
    let allItems = document.querySelectorAll('.masonry-item');
    if (allItems) {
      for (let i = 0; i < allItems.length; i++) {
        resizeMasonryItem(allItems[i], isResized);
      }
    }
    isResized=false;
  
  }, 100)

  


}


  let masonryEvents = ['load','resize'];

  masonryEvents.forEach(function (event) {
    console.log(event)
    window.addEventListener(event, resizeAllMasonryItems);
  
  });

// let masonryEvents = ['load', 'resize'];

// masonryEvents.forEach(function (event) {

//   window.addEventListener(event, resizeAllMasonryItems);

// });

//============================================ Filtering images ============================================
//==========================================================================================================
let sortBtn = document.querySelector('.filter-menu');
let sortItem = document.querySelector('.filter-item');
// ignore the "cannot read null" error if the element is not on the page so the script can keep working
if (sortBtn) {

  sortBtn = document.querySelector('.filter-menu').children;
  sortItem = document.querySelector('.filter-item').children;


  for (let i = 0; i < sortBtn.length; i++) {
    sortBtn[i].addEventListener('click', function () {
      console.log("asdasd")
      // resizeMasonryItem()
      resizeAllMasonryItems()
      for (let j = 0; j < sortBtn.length; j++) {
        sortBtn[j].classList.remove('current');
      }

      this.classList.add('current');

      let targetData = this.getAttribute('data-target');

      for (let k = 0; k < sortItem.length; k++) {
        sortItem[k].classList.remove('active');
        sortItem[k].classList.add('delete');

        if (
          sortItem[k].getAttribute('data-item') == targetData ||
          targetData == 'all'
        ) {
          sortItem[k].classList.remove('delete');
          sortItem[k].classList.add('active');
        }
      }
    });
  }
}