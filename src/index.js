"use strict"

import "./styles/main.scss"
import CPopup from "./models/Popup"
import {getCookie, setCookie} from "./utils/cookie";
import { v4 as uuidv4 } from 'uuid';
import axios, {AxiosRequestConfig, AxiosPromise, Method} from 'axios';


export const dataHost = '___replace_dataHost___';
export const dataProjectId = '___replace_dataProjectId___';
export const dataSettingId = '___replace_dataSettingId___';
export const dataScanner =  JSON.parse('___replace_dataScanner___');
export const dataCookies =  JSON.parse('___replace_dataCookies___');
export const dataParam =  JSON.parse('___replace_dataParam___');

/*
export const dataHost = 'http://localhost:8889/api/v1/endUserCookieConsent';
export const dataProjectId = '8ee777d7-05a0-4290-9bd4-9af1b4a1d772';
export const dataSettingId = '2ee2f247-e5db-41ef-a5bc-40894eefcae9';
export const dataScanner = [
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
        "category": "marketing"
    }
];
export const dataCookies = [
  {
      "name": "_ga",
      "domain": ".pcubedthai.com",
      "path": "/",
      "expires": 1717842503,
      "detected": "https://pcubedthai.com",
      "type": "javascript",
      "source": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  },
  {
      "name": "_ga_BYM1FJKL9N",
      "domain": ".pcubedthai.com",
      "path": "/",
      "expires": 1717842503,
      "detected": "https://pcubedthai.com",
      "type": "javascript",
      "source": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  },
  {
      "name": "_gat_gtag_UA_226567081_1",
      "domain": ".pcubedthai.com",
      "path": "/",
      "expires": 1654770563,
      "detected": "https://pcubedthai.com",
      "type": "javascript",
      "source": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  },
  {
      "name": "_gid",
      "domain": ".pcubedthai.com",
      "path": "/",
      "expires": 1654856903,
      "detected": "https://pcubedthai.com",
      "type": "javascript",
      "source": "https://www.google-analytics.com/analytics.js",
      "category": "analytics"
  }
];
export const dataParam =  {
  "lang": {
      "en": {
          "allow": "Allow cookies",
          "allowall": "Allow All cookies",
          "header": "Cookies used on the website!",
          "customize": "Customize",
          "link": "Learn more",
          "dismiss": "Dismiss",
          "message": "This website uses cookies to ensure you get the best experience on our website.",
          "policy": "Cookie Policy",
          "deny": "Decline",
          "href": "https://www.google.com",
          "essential": "Essential",
          "personalization": "Personalization",
          "analytics": "Analytics",
          "marketing": "Marketing",
          "catessential": 'These cookies are essential for the website function, such as identifies and maintains user session, login authentication. These technical cookies are deleted after you quit your browser.',
          "catpersonalization": 'These cookies are used for remembering and tracking user information and setting : these may include language preferences, the type of browser used to access services and the website, etc.',
          "catanalytics": 'These cookies are used for internal research on how we can improve the service for all our users. These cookies help us to count the number of visitors and to see how visitors journey around the website.',
          "catmarketing": 'These cookies are used to target advertising to user based on browsing activity, purchasing and the links that user have followed. We may also share this information with third parties for marketing purpose.'
      },
      "th": {
          "allow": "อนุญาติ",
          "allowall": "อนุญาติทั้งหมด",
          "header": "มีการใช้คุกกี้ที่เว็บไซต์นี้",
          "customize": "ปรับแต่ง",
          "link": "เรียนรู้เพิ่มเติม",
          "dismiss": "ปิด",
          "message": "เว็บไซต์นี้มีการใช้านคุกกี้",
          "policy": "อ่านข้อมูลเพิ่มเติม",
          "deny": "ปฏิเสธ",
          "href": "https://www.google.com",
          "essential": "พื้นฐาน (จำเป็นกับการใช้งาน)",
          "personalization": "ปรับแต่งการทำงาน",
          "analytics": "วิเคราะห์การใช้งาน",
          "marketing": "การตลาด",
          "catessential": 'คุกกี้ประเภทนี้มีความจำเป็นต่อการทำงานของเว็บไซต์ เพื่อให้เว็บไซต์สามารถทำงานได้เป็นปกติและมีความปลอดภัย เช่น การจัดการ Session, การตรวจสอบยืนยันตัวตนผู้ใช้งาน โดยคุกกี้ประเภทนี้จะถูกลบเมื่อผู้ใช้งานปิดบราวเซอร์',
          "catpersonalization": 'คุกกี้ประเภทนี้ใช้ในการจดจำข้อมูลการตั้งค่า หรือตัวเลือกที่ผู้ใช้เคยเลือกไว้บนเว็บไซต์ เช่น ภาษาที่แสดงบนเว็บไซต์ เพื่อให้ผู้ใช้สามารถใช้งานเว็บไซต์ได้สะดวกยิ่งขึ้น โดยไม่ต้องให้ข้อมูล หรือตั้งค่าใหม่ทุกครั้ง',
          "catanalytics": 'คุกกี้ประเภทนี้จะเก็บข้อมูลการใช้งานเว็บไซต์ของผู้ใช้ เพื่อใช้ในการปรับปรุง พัฒนา เนื้อหา และการบริการ เพื่อเพิ่มประสบการณ์ที่ดีในการใช้เว็บไซต์',
          "catmarketing": 'คุกกี้ประเภทนี้จะใช้ในการนำเสนอเนื้อหา บริการ และโฆษณาที่เกี่ยวข้องกับความสนใจของผู้ใช้ โดยใช้ข้อมูลที่มีการเก็บบนบราวเซอร์ เช่น การเข้าชมเว็บไซต์ การซื้อสินค้า หรือบริการ เรายังอาจแชร์ข้อมูลนี้กับบุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาด'
      }
  },
  "content": {
      "allow": "Allow cookies",
      "allowall": "Allow All cookies",
      "header": "Cookies used on the website!",
      "customize": "Customize",
      "link": "Learn more",
      "dismiss": "Dismiss",
      "message": "This website uses cookies to ensure you get the best experience on our website.",
      "policy": "Cookie Policy",
      "deny": "Decline",
      "href": "https://www.google.com",
      "essential": "Essential",
      "personalization": "Personalization",
      "analytics": "Analytics",
      "marketing": "Marketing",
      "catessential": 'These cookies are essential for the website function, such as identifies and maintains user session, login authentication. These technical cookies are deleted after you quit your browser.',
      "catpersonalization": 'These cookies are used for remembering and tracking user information and setting : these may include language preferences, the type of browser used to access services and the website, etc.',
      "catanalytics": 'These cookies are used for internal research on how we can improve the service for all our users. These cookies help us to count the number of visitors and to see how visitors journey around the website.',
      "catmarketing": 'These cookies are used to target advertising to user based on browsing activity, purchasing and the links that user have followed. We may also share this information with third parties for marketing purpose.'
  },
  "selectedLang": "en",
  "palette": {
      "popup": {
          "background": "#3937A3FF",
          "text": "#FFFFFFFF"
      },
      "button": {
          "background": "#E62576FF",
          "text": "#FFFFFFFF"
      }
  },
  "position": "bottom",
  "theme": "edgeless",
  "type": "opt-in",
  //"layout": "detail"
};
*/
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
          if (name.indexOf('cookieconsent_status') === -1 && name.indexOf('pcube_cc') === -1) {
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

// read cookie string
const cookieStr = getCookie('pcube_cc');
// parse cookie string to object
const cookieObj = cookieStr === undefined?undefined:JSON.parse(cookieStr);
// currentUuid from cookie or generate new one
const currentUuid = cookieObj===undefined?uuidv4():cookieObj.id;
if (cookieStr === undefined)
  setCookie('pcube_cc', JSON.stringify({
    id: currentUuid, 
    selectedLang: dataParam.selectedLang
  }), 365);

function sendConsent(inst) {
  let status = inst.getStatuses();
  let statusInt = 0;
  if (status) {
    for(let i=0; i<status.length; i++) {
      if (status[i] === 'ALLOW') {
        statusInt |= (1<<i);
      }
    }
  }

  let data = {
    projectId: dataProjectId,
    settingId: dataSettingId,
    sourceId: currentUuid,
    consent: statusInt
  }
  axios.post(dataHost, data);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
};

function showDialog() {
  const param = dataParam;

  const userLocale = navigator.languages && navigator.languages.length
  ? navigator.languages[0]
  : navigator.language;

  if (userLocale === "th-TH")
    param.selectedLang = 'th';
  else
    param.selectedLang = 'en';
  
  if (param.lang[param.selectedLang])
    param.content = param.lang[param.selectedLang];

  const category = [];
  var categoryShow = [];

  category.push('ESSENTIAL'); 
  dataScanner.forEach((key) => {
    category.push(key["category"].toUpperCase());
  });

  categoryShow = category.filter(onlyUnique);

  let currentCC = new CPopup(param, categoryShow);
  //currentCC.setStatuses();
  if (currentCC.hasAnswered() !== true) {
      currentCC.open();
  }
  else {
  }
  
  currentCC.on( 'statusChanged', (p, a, o, inst) => {
    if (inst === currentCC) {
      let part = p.split('_');
      blockUnblockScript(part[part.length-1], a)
    }
  });

  currentCC.on( 'statusUpdated', (inst) => {
    if (inst === currentCC) {
      sendConsent(inst);
    }
  });

  currentCC.on( 'cc-customize', () => {
    currentCC.destroy();
    const popupParam = {...dataParam};
    popupParam.position = 'full';
    popupParam.theme = 'classic';
    popupParam.type = 'opt-in-detail';
    popupParam.layout = 'detail';
    const popupCC = new CPopup(popupParam, categoryShow);
    popupCC.open();
    popupCC.on( 'statusChanged', (p, a, o, inst) => {
      if (inst === popupCC) {
        let part = p.split('_');
        blockUnblockScript(part[part.length-1], a);
      }
    });
    popupCC.on( 'statusUpdated', (inst) => {
      if (inst === popupCC) {
        sendConsent(inst);
      }
    });
    popupCC.on( 'popupClosed', (inst) => {
      if (inst === popupCC) {
          inst.destroy();
          currentCC = new CPopup(param, categoryShow);
          currentCC.setStatuses();
          window.pcube = currentCC;
      }
    });
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