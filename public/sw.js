if(!self.define){let e,a={};const r=(r,i)=>(r=new URL(r+".js",i).href,a[r]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=a,document.head.appendChild(e)}else e=r,importScripts(r),a()})).then((()=>{let e=a[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(a[o])return;let s={};const c=e=>r(e,o),t={module:{uri:o},exports:s,require:c};a[o]=Promise.all(i.map((e=>t[e]||c(e)))).then((e=>(n(...e),s)))}}define(["./workbox-fe64153f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5_iex6NwykbVV1VwOVEu5/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/5_iex6NwykbVV1VwOVEu5/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/css/cababb907a5ed99a.css",revision:"cababb907a5ed99a"},{url:"/audio/stretchMusic1.mp3",revision:"5802b8d13b084a73892df194f9687a9b"},{url:"/audio/workoutMusic1.mp3",revision:"c5a81fd7f09bdc23ed39feac405a0c5f"},{url:"/favicon.ico",revision:"592f04c661672c059b9a82f7054a8682"},{url:"/hero-desktop.png",revision:"a47aff776ddc5a366ddb034f05febfda"},{url:"/hero-mobile.png",revision:"df9fe74c761e4baa93e9419d5efb2313"},{url:"/opengraph-image.png",revision:"5995c102f2d84f89c8b78506a7e0c515"},{url:"/petra-logo-016.png",revision:"c88d4e6e6bf1fd0c9514fc2a08953bd2"},{url:"/petra-logo-036.png",revision:"9c0184eba712481a3af193a0b3c05daa"},{url:"/petra-logo-048.png",revision:"dd8e8d782a72ed69622e73c77e2397af"},{url:"/petra-logo-078.png",revision:"413dad4f25cce93e97bf70cf9de6cfab"},{url:"/petra-logo-096.png",revision:"b4aaddfb62119ab7c928e32891b1dbc9"},{url:"/petra-logo-128.png",revision:"38711d4d4740bc919da6f10d5c3bb4e5"},{url:"/petra-logo-192-non-transparent.png",revision:"0377395435b91f0c7beb5214a35013f6"},{url:"/petra-logo-256.png",revision:"f1e8d5d1bcf78c45176a2c108dfb49b1"},{url:"/petra-logo-512.png",revision:"312dd6b3753c073aebd7d788b97c9a02"},{url:"/petra-logo.svg",revision:"452fd3fd80cdc5024a33f26eeb1622a8"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:r,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[]}),"GET"),e.registerRoute(/^https?.*/,new e.NetworkFirst({cacheName:"offlineCache",plugins:[new e.ExpirationPlugin({maxEntries:200})]}),"GET"),e.registerRoute(/\.(mp3|wav)$/,new e.CacheFirst({cacheName:"audio-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:31536e3})]}),"GET")}));
