"use strict"

import "./styles/main.scss"
import CPopup from "./models/Popup"
import {getCookie} from "./utils/cookie";

export const dataScanner =  [
  {
      "url": "https://www.googletagmanager.com/gtag/js?id=G-BYM1FJKL9N&l=dataLayer&cx=c",
      "category": "analytics"
  },
  {
      "url": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  },
  {
      "url": "https://www.googletagmanager.com/gtag/js?id=UA-226567081-1",
      "category": "analytics"
  },
  {
      "url": "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPrimesSolution%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=2402138786748434",
      "category": "social"
  }
];

export const dataCookies =   [
  {
      "name": "_gat_gtag_UA_226567081_1",
      "domain": ".pcubedthai.com",
      "path": "/",
      "expires": 1654242941,
      "detected": "https://pcubedthai.com/",
      "type": "javascript",
      "source": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  },
  {
      "name": "_gid",
      "domain": ".pcubedthai.com",
      "path": "/",
      "expires": 1654329281,
      "detected": "https://pcubedthai.com/",
      "type": "javascript",
      "source": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  },
  {
      "name": "_ga",
      "domain": ".pcubedthai.com",
      "path": "/",
      "expires": 1717314881,
      "detected": "https://pcubedthai.com/",
      "type": "javascript",
      "source": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  },
  {
      "name": "_ga_BYM1FJKL9N",
      "domain": ".pcubedthai.com",
      "path": "/",
      "expires": 1717314880,
      "detected": "https://pcubedthai.com/",
      "type": "javascript",
      "source": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  }
];

function formatData() {
  let dataCookiesHash = {};
  for (let i=0; i<dataCookies.length; i++) {
    dataCookiesHash[dataCookies[i].name] = dataCookies[i];
  }

  return dataCookiesHash;
}

var cookieSetterOriginal = document.__lookupSetter__("cookie");
var cookieGetterOriginal = document.__lookupGetter__("cookie");
const dataCookiesHash = formatData();
let globalConsentStatus = {};
let globalCookieStorage = {};

function initCookie() {
  console.log(globalConsentStatus);
  Object.defineProperty(document, "cookie", {
      get: function () {
          return cookieGetterOriginal.apply(document);
      },
      set: function () {
          let name = arguments[0].split(';')[0].split('=')[0];
          if (name.indexOf('cookieconsent_status') === -1) {
            let cinfo = dataCookiesHash[name];
            if (!cinfo || globalConsentStatus[cinfo.category.toUpperCase()] !== 'ALLOW') {
              console.log('block cookie ' + name);
              globalCookieStorage[name] = arguments;
              console.log(globalCookieStorage);
              return;
            }
          }

          return cookieSetterOriginal.apply(document, arguments);
      },
      configurable: true
  });
}

function setCookieOriginal() {
  cookieSetterOriginal.apply(document, arguments);
}

//block/unblock
function blockUnblockScript(category, status) {
  if (category.toUpperCase() === 'ESSENTIAL')
    return;

  //cookie  
  for (let i=0; i<dataCookies.length; i++) {
    if (dataCookies[i].category.toUpperCase() === category.toUpperCase()) {
      if (status === 'ALLOW') {
        let data = globalCookieStorage[dataCookies[i].name];
        if (data) {
          cookieSetterOriginal.apply(document, data);
          delete globalCookieStorage[dataCookies[i].name];
        }
      }
      else {
        let data = getCookie(dataCookies[i].name);
        if (data) {
          setCookieOriginal(`${dataCookies[i].name}=;Max-Age=0;path=/;domain=${location.hostname};`);
        };
      }
    }
  }

  //script
  const script = []; //document.getElementsByTagName('script');
  for (let i = 0; i < script.length; i++) {
      for(let j=0; j<dataScanner.length; j++) {
        let node = script[i];
        let record = dataScanner[j];        
        
        if (record.node !== 'script' || (node.src !== record.url && node.getAttribute('data-src') !== record.url)
          || record.category.toUpperCase() !== category.toUpperCase())
            continue;

        if (status === 'ALLOW') {
          if (node.getAttribute('data-src')) {
            node.setAttribute('src', node.getAttribute('data-src'));
            node.removeAttribute('data-src');
          }
        }
        else {
            if (node.src) {
              node.setAttribute('category', record.category);
              let data = node.src;
              node.removeAttribute('src');
              node.setAttribute('data-src', data);
            }
        }      
      }
  }
};

function showDialog() {
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
    blockUnblockScript(part[part.length-1], a)
  });
  
  let currentConsentStatus = currentCC.exportCurrentStatuses();  
  if (currentConsentStatus) {
    globalConsentStatus = currentConsentStatus;
    Object.keys(currentConsentStatus).forEach( (key) => {
      blockUnblockScript(key, currentConsentStatus[key])
    });
  }

  initCookie();
  return currentCC;
}

window.pcube = showDialog();