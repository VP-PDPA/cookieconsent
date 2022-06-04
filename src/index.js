"use strict"

import "./styles/main.scss"
import CPopup from "./models/Popup"
import {getCookie} from "./utils/cookie";

export const dataScanner =  JSON.parse('___replace_dataScanner___');
export const dataCookies =  JSON.parse('___replace_dataCookies___');
export const dataParam =  JSON.parse('___replace_dataParam___');

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

  Object.defineProperty(document, "cookie", {
      get: function () {
          return cookieGetterOriginal.apply(document);
      },
      set: function () {
          let name = arguments[0].split(';')[0].split('=')[0];
          if (name.indexOf('cookieconsent_status') === -1) {
            let cinfo = dataCookiesHash[name];
            if (!cinfo || globalConsentStatus[cinfo.category.toUpperCase()] !== 'ALLOW') {
              globalCookieStorage[name] = arguments;
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
  const param = dataParam;
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