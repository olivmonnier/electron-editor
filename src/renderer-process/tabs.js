const { editor, getTypeActive } = require('./editor');
let data = require('./variables');

const tabItem = Array.from(document.querySelectorAll('.tab-group .tab-item'));

tabItem.forEach(tab => tab.addEventListener('click', () => {
  const mode = tab.getAttribute('data-mode');

  data['mode'] = mode;
  editor.setOption('mode', mode);
  editor.setValue(data[getTypeActive(mode)]);
  document.querySelector('.tab-item.active').classList.remove('active');
  tab.classList.add('active');
})); 