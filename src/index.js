"use strict"
/*
console.log('start global');
export const dataScanner =  [
  {
    url: 'https://www.googletagmanager.com/gtag/js?id=G-BYM1FJKL9N&l=dataLayer&cx=c',
    domain: 'googletagmanager.com',
    categories: 'marketing',
    node: 'script'
  },
  {
    url: 'https://www.google-analytics.com/analytics.js',
    domain: 'google-analytics.com',
    categories: 'analytics',
    node: 'script'
  },
  {
    url: 'https://www.googletagmanager.com/gtag/js?id=UA-226567081-1',
    domain: 'googletagmanager.com',
    categories: 'marketing',
    node: 'script'
  },
  {
    url: 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPrimesSolution%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=2402138786748434',
    domain: 'facebook.com',
    categories: 'marketing',
    node: 'script'
  }
];
//init block
const observer = new MutationObserver(mutations => {
  mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(node => {
          if (node.tagName === 'SCRIPT') {
              for(let i=0; i<dataScanner.length; i++) {
                  let record = dataScanner[i];
                  if (record.node !== 'script')
                      continue;
                  //if (currentConsentStatus[record.categories.toUpperCase()] !== 'DENY')
                  //    continue;
                  if (node.src == dataScanner[i].url) {
                      node.setAttribute('categories', record.categories);
                      let data = node.src;
                      node.removeAttribute('src');
                      node.setAttribute('data-src',data);
                  }
                  
              }
          }
      });
  });
});

//export default observer;
console.log('init');
observer.observe(window.document.documentElement, {
  childList: true,
  subtree: true
});

import "./styles/main.scss"

import CPopup from "./models/Popup"

//block/unblock
const updateBlockUnblock = (category, status) => {
  console.log(category + ' ' + status);
  let script = document.getElementsByTagName('script');

  //script
  for (let i = 0; i < script.length; i++) {
      for(let j=0; j<dataScanner.length; j++) {
        let record = dataScanner[j];
        let node = script[i];
        console.log(node.getAttribute('data-src'));
        
        if (record.node !== 'script' || (node.src !== record.url && node.getAttribute('data-src') !== record.url)
          || record.categories.toUpperCase() !== category)
            continue;
        console.log('debug 1');
        if (status !== 'ALLOW') {
          if (node.getAttribute('data-src')) {
            node.setAttribute('src', node.getAttribute('data-src'));
            node.removeAttribute('data-src');
          }
        }
        else {
            node.setAttribute('categories', record.categories);
            let data = node.src;
            node.removeAttribute('src');
            node.setAttribute('data-src',data);
        }      
      }
  }
};

const showDialog = () => {
  const param = JSON.parse('{"palette":{"popup":{"background":"#FF3937A3","text":"#FFFFFFFF"},"button":{"background":"#FFE62576","text":"#FFFFFFFF"}},"position":"bottom-left","type":"opt-in-detail","layout":"detail","content":{"href":"https://www.example.com/yourpolicy3.html"}}');
  const currentCC = new CPopup(param);
  currentCC.setStatuses();
  if (currentCC.hasAnswered() !== true) {
      currentCC.open();
  }
  else {
  
  } 
  
  currentCC.on( 'statusChanged', (p, a) => {
    let part = p.split('_');
    updateBlockUnblock(part[part.length-1], a)
  });
  
  let currentConsentStatus = currentCC.exportCurrentStatuses();
  console.log(currentConsentStatus);
}
*/