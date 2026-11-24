const slides = [
  ['assembly-team.webp', 'Сборочная линия · ADM Jizzakh'],
  ['factory.webp', 'Завод ADM Jizzakh · Джизакская область'],
  ['production-line.webp', 'Производство автомобилей · ADM Jizzakh']
];
let slide = 0;
function changeSlide(delta) {
  slide = (slide + delta + slides.length) % slides.length;
  const [image, caption] = slides[slide];
  document.getElementById('hero-image').style.backgroundImage = 'url("assets/' + image + '")';
  document.getElementById('photo-caption').textContent = caption;
  document.getElementById('slide-number').textContent = String(slide + 1).padStart(2, '0');
}
document.getElementById('prev').addEventListener('click', () => changeSlide(-1));
document.getElementById('next').addEventListener('click', () => changeSlide(1));
changeSlide(0);
