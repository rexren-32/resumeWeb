/* ==========================================================
   简历网站交互脚本
   1. 移动端汉堡菜单
   2. 深色模式切换（记忆用户选择）
   3. 滚动到区块时淡入动画
   ========================================================== */

// ---------- 1. 移动端汉堡菜单 ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// 点击菜单项后自动收起菜单（手机端体验）
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ---------- 2. 深色模式 ----------
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// 读取上次选择，没选过则跟随系统
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ---------- 3. 滚动淡入动画 ----------
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 只播放一次
      }
    });
  },
  { threshold: 0.15 } // 元素露出 15% 时触发
);

revealElements.forEach((el) => observer.observe(el));
