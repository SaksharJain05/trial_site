// Typing effect for hero subline
  const phrases = ["building projects, one function at a time.", "learning AI/ML, one model at a time.", "solving problems, one algorithm at a time."];
  const typeEl = document.getElementById('typeLine');
  let pIndex = 0, cIndex = 0, deleting = false;

  function typeLoop(){
    const current = phrases[pIndex];
    if(!deleting){
      cIndex++;
      typeEl.innerHTML = current.slice(0, cIndex) + '<span class="cursor-blink"></span>';
      if(cIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      cIndex--;
      typeEl.innerHTML = current.slice(0, cIndex) + '<span class="cursor-blink"></span>';
      if(cIndex === 0){
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 55);
  }
  typeLoop();

  // Scroll reveal
  const blocks = document.querySelectorAll('.code-block');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.2 });
  blocks.forEach(b => io.observe(b));

  // Active nav + tab crumb on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const crumbFile = document.getElementById('crumbFile');
  const fileNames = { hero:'hero.tsx', about:'about.cpp', skills:'skills.json', projects:'projects.md', contact:'contact.sh' };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if(active) active.classList.add('active');
        if(fileNames[id]) crumbFile.textContent = fileNames[id];
      }
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' });
  sections.forEach(s => navObserver.observe(s));

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  navLinks.forEach(l => l.addEventListener('click', () => sidebar.classList.remove('open')));
