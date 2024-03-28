const gyroData = {
  alpha: null,
  beta: null,
  gamma: null,
  dalpha: null,
  dbeta: null,
  dgamma: null
};
const acellData = {
  x: 0,
  y: 0,
  z: 0,
  dx: null,
  dy: null,
  dz: null
};

const temp = {
  alpha: null,
  beta: null,
  gamma: null,
  x: null,
  y: null,
  z: null,
};

const treshold = 0.2;

function onClick() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
    .then(permissionState => {
      if (permissionState === 'granted') {
        window.addEventListener('devicemotion', acell);
      }
    })
    .catch(console.error);
  } else {
    window.addEventListener('devicemotion', acell);
  }
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', gyro);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', gyro);
  }
}


function gyro(event) {
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
function acell(event) {
  acellData.dx = event.acceleration.x;
  acellData.dy = event.acceleration.y;
  acellData.dz = event.acceleration.z;

  acellData.x += acellData.dx;
  acellData.y += acellData.dy;
  acellData.z += acellData.dz;
  
  document.getElementById('Dacellx').textContent = acellData.dx.toFixed(3);
  document.getElementById('Dacelly').textContent = acellData.dy.toFixed(3);
  document.getElementById('Dacellz').textContent = acellData.dz.toFixed(3);
  document.getElementById('acellx').textContent = acellData.x.toFixed(3);
  document.getElementById('acelly').textContent = acellData.y.toFixed(3);
  document.getElementById('acellz').textContent = acellData.z.toFixed(3);
}

