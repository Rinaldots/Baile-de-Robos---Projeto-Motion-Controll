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

const state = {
  gyro: false,
  acell: false
}

const temp = {
  alpha: null,
  beta: null,
  gamma: null,
  x: null,
  y: null,
  z: null,
};

const treshold = 1;

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
  
  if(((Math.abs(gyroData.dalpha)) > 5*treshold)||((Math.abs(gyroData.dbeta)) > 5*treshold)||((Math.abs(gyroData.dgamma)) > 5*treshold)){
    state.gyro = true;
    document.getElementById('GyroState').textContent = "Detectado Movimento";
  }else{
    state.gyro = false;
    document.getElementById('GyroState').textContent = "Detectado Movimento";
  }
}


function acell(event) {
  acellData.dx = event.acceleration.x;
  acellData.dy = event.acceleration.y;
  acellData.dz = event.acceleration.z;
  
  if(((Math.abs(acellData.dx)) > treshold)||((Math.abs(acellData.dy)) > treshold)||((Math.abs(acellData.dz)) > treshold)){
    state.acell = true;
    document.getElementById('AcellState').textContent = "Detectado Movimento";
  }else{
    state.acell = false;
    document.getElementById('AcellState').textContent = "Parado";
  }
  
  
}

