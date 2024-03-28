const gyroData = {
  x: null,
  y: null,
  z: null,
  alpha: null,
  beta: null,
  gamma: null,
  dalpha: null,
  dbeta: null,
  dgamma: null
};
const temp = {
  alpha: null,
  beta: null,
  gamma: null
}

function onClick() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', cb);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', cb);
  }
}

function update(){
  document.getElementById('gyroAlpha').textContent = gyroData.alpha.toFixed(3);
  document.getElementById('gyroBeta').textContent = gyroData.beta.toFixed(3);
  document.getElementById('gyroGamma').textContent = gyroData.gamma.toFixed(3);
  document.getElementById('DgyroAlpha').textContent = gyroData.dalpha.toFixed(3);
  document.getElementById('DgyroBeta').textContent = gyroData.dbeta.toFixed(3);
  document.getElementById('DgyroGamma').textContent = gyroData.dgamma.toFixed(3);
}

function cb(event) {
  temp.alpha = gyroData.alpha;
  temp.beta = gyroData.beta;
  temp.gamma = gyroData.gamma;

  gyroData.alpha = event.alpha;
  gyroData.beta = event.beta;
  gyroData.gamma = event.gamma;

  
  gyroData.dalpha = gyroData.alpha - temp.alpha;
  gyroData.dbeta = gyroData.beta - temp.beta;
  gyroData.dgamma = gyroData.gamma - temp.gamma;

  document.getElementById('gyroAlpha').textContent = gyroData.alpha.toFixed(3);
  document.getElementById('gyroBeta').textContent = gyroData.beta.toFixed(3);
  document.getElementById('gyroGamma').textContent = gyroData.gamma.toFixed(3);
  document.getElementById('DgyroAlpha').textContent = gyroData.dalpha.toFixed(3);
  document.getElementById('DgyroBeta').textContent = gyroData.dbeta.toFixed(3);
  document.getElementById('DgyroGamma').textContent = gyroData.dgamma.toFixed(3);
}


