!function(e){function n(n,t,o,a){"use strict";var i=e.document.createElement("link"),r=t||e.document.getElementsByTagName("script")[0],d=e.document.styleSheets;return i.rel="stylesheet",i.href=n,i.media="only x",a&&(i.onload=a),r.parentNode.insertBefore(i,r),i.onloadcssdefined=function(e){for(var t,o=0;d.length>o;o++)d[o].href&&d[o].href.indexOf(n)>-1&&(t=!0);t?e():setTimeout(function(){i.onloadcssdefined(e)})},i.onloadcssdefined(function(){i.media=o||"all"}),i}function t(e,n){e.onload=function(){e.onload=null,n&&n.call(e)},"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(n)}var o=function(a,i){"use strict";if(a&&3===a.length){var r=e.Image,d=!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||e.opera&&-1===navigator.userAgent.indexOf("Chrome")||-1!==navigator.userAgent.indexOf("Series40")),c=new r;c.onerror=function(){o.method="png",o.href=a[2],n(a[2])},c.onload=function(){var e=1===c.width&&1===c.height,r=a[e&&d?0:e?1:2];o.method=e&&d?"svg":e?"datapng":"png",o.href=r,t(n(r),i)},c.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",document.documentElement.className+=" grunticon"}};o.loadCSS=n,o.onloadCSS=t,e.grunticon=o}(this);