"use strict"

import "./styles/main.scss"
import CPopup from "./models/Popup"

/*
example tempate
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

//block/unblock
const updateBlockUnblock = (category, status) => {
  if (category.toUpperCase() === 'ESSENTIAL')
    return;
  const script = document.getElementsByTagName('script');

  //script
  for (let i = 0; i < script.length; i++) {
      for(let j=0; j<dataScanner.length; j++) {
        let node = script[i];
        let record = dataScanner[j];        
        
        if (record.node !== 'script' || (node.src !== record.url && node.getAttribute('data-src') !== record.url)
          || record.categories.toUpperCase() !== category.toUpperCase())
            continue;

        if (status === 'ALLOW') {
          if (node.getAttribute('data-src')) {
            node.setAttribute('src', node.getAttribute('data-src'));
            node.removeAttribute('data-src');
          }
        }
        else {
            if (node.src) {
              node.setAttribute('categories', record.categories);
              let data = node.src;
              node.removeAttribute('src');
              node.setAttribute('data-src',data);
            }
        }      
      }
  }
};

const showDialog = () => {
  const param = JSON.parse('{"content":{"header":"Cookies used on the website!","message":"This website uses cookies to ensure you get the best experience on our website.","dismiss":"Dismiss","allow":"Allow cookies","deny":"Decline","link":"Learn more","href":"https://www.example.com/yourpolicy3.html","close":"&#x274c","target":"_blank","policy":"Cookie Policy","customize":"Customize"},"palette":{"popup":{"background":"#22197AFF","text":"#FFFFFFFF"},"button":{"background":"#9B9B9BFF","text":"#FFFFFFFF"}},"position":"bottom-left","theme":"edgeless","type":"opt-in-detail","layout":"detail"}');
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
  if (currentConsentStatus) {
    Object.keys(currentConsentStatus).forEach( (key) => {
      if (key !== 'ESSENTIAL' && currentConsentStatus[key] !== 'ALLOW') {
        updateBlockUnblock(key, currentConsentStatus[key])
      }
    });
  }

  return currentCC;
}
window.pcube = showDialog();

*/