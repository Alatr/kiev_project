/* eslint-disable no-undef */
// Google map start
function func() {
  const script = document.createElement('script');
  let key = '';
  if (window.location.href.match(/localhost/)) key = '';
  // const key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
  // document.getElementsByTagName('head')[0].appendChild(script);
}
setTimeout(func, 1000);

// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  const center = {
    lat: 50.476303,
    lng: 30.516779,
  };
  /** Массив, куда записываются выбраные категории */
  const choosedCategories = new Set();
  choosedCategories.add('main');
  /** Елементы, при клике на который будет происходить фильтрация */
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'en',
    styles: [{
      featureType: 'all',
      stylers: [{
        saturation: 0,
      }, {
        hue: '#e7ecf0',
      }],
    }, {
      featureType: 'road',
      stylers: [{
        saturation: -70,
      }],
    }, {
      featureType: 'transit',
      stylers: [{
        visibility: 'off',
      }],
    }, {
      featureType: 'poi',
      stylers: [{
        visibility: 'off',
      }],
    }, {
      featureType: 'water',
      stylers: [{
        visibility: 'simplified',
      }, {
        saturation: -60,
      }],
    }],

  });
  const filterMarkers = function (category, categoriesArray) {
    gmarkers1.forEach((el) => {
      if (categoriesArray.has(el.category)) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers('main', choosedCategories);
    });
  });

  // var baseFolder = '/wp-content/themes/rusaniv/assets/images/markers/';
  const baseFolder = './assets/images/markers/';
  const defaultMarkerSize = new google.maps.Size(40, 50);
  const buildLogoSize = new google.maps.Size(70, 87);
  const markersAdresses = {
    main: `${baseFolder}marker-main.svg`,
    sport: `${baseFolder}marker-sport-complex.svg`,
    school: `${baseFolder}marker-school.svg`,
    bank: `${baseFolder}marker-bank.svg`,
    kindergarden: `${baseFolder}marker-kindergarden.svg`,
    park: `${baseFolder}marker-park.svg`,
    meal: `${baseFolder}marker-meal.svg`,
    dentist: `${baseFolder}marker-dentist.svg`,
    medicine: `${baseFolder}marker-medicine.svg`,
    metro: `${baseFolder}marker-metro.svg`,
    post: `${baseFolder}marker-post.svg`,
    shop: `${baseFolder}marker-shop.svg`,
    supermarkets: `${baseFolder}marker-supermarkets.svg`,
  };
  const markerPopupStyle = `
        style="
        background: #1798D5;
        padding:5px 10px;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;"
        `;


  /* beautify preserve:start */
  const markersData = [
    {
      content: `<img style="background:white" src="${markersAdresses.main}">`,
      position: { lat: 50.476303, lng: 30.516779 },
      type: 'main',
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
    },
    {
      content: `<div ${markerPopupStyle}>PARK</div>`,
      position: { lat: 50.478303, lng: 30.516779 },
      type: 'park',
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
    },
    {
      content: `<div ${markerPopupStyle}>Shop</div>`,
      position: { lat: 50.480303, lng: 30.516779 },
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
    },
    {
      content: `<div ${markerPopupStyle}>Post</div>`,
      position: { lat: 50.482303, lng: 30.516779 },
      type: 'post',
      icon: { url: markersAdresses.post, scaledSize: defaultMarkerSize },
    },
    {
      content: `<div ${markerPopupStyle}>Bank</div>`,
      position: { lat: 50.484303, lng: 30.516779 },
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
    },
  ];
  /* beautify preserve:end */
  const infowindow = new google.maps.InfoWindow({
    content: '',
    maxWidth: 200,
  });
  markersData.forEach((marker) => {
    const category = marker.type;
    const mapMarker = new google.maps.Marker({
      map,
      category,
      icon: marker.icon,
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, 'click', function () {
      infowindow.setContent(marker.content);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });
    mapMarker.name = marker.type;
    gmarkers1.push(mapMarker);
  });
}

window.addEventListener('load', () => {
  /** Выдвижная панель маркеров на мобильной версии */
  const legend = document.querySelector('[data-mob-accordeon]');
  const legendTitle = legend.querySelector('.map__legend-title');
  legendTitle.addEventListener('click', () => {
    legend.classList.toggle('opened');
    // добавить плавность появление блока с маркерами
    if (legend.classList.contains('opened')) {
      gsap.fromTo('.map__legend-markers-wrap', { height: 0 },
        { height: '50vh' });
    } else {
      gsap.fromTo('.map__legend-markers-wrap', { height: '50vh' }, { height: 0 });
    }
  });
});
