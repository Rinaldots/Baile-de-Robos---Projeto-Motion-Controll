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
  acell: false,
  mov: false
}

const temp = {
  alpha: null,
  beta: null,
  gamma: null,
  x: null,
  y: null,
  z: null,
};

const acelltresholf = 1.2;
const gyrotreshold = 20;

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

  
 
  document.getElementById('gyroAlpha').textContent = gyroData.dalpha.toFixed(3);
  document.getElementById('gyroBeta').textContent = gyroData.dbeta.toFixed(3);
  document.getElementById('gyroGamma').textContent = gyroData.dgamma.toFixed(3);
  
  
}


function acell(event) {
  acellData.dx = event.acceleration.x;
  acellData.dy = event.acceleration.y;
  acellData.dz = event.acceleration.z;
  
  gyroData.dalpha = event.rotationRate.alpha;
  gyroData.dbeta = event.rotationRate.beta;
  gyroData.dgamma = event.rotationRate.gamma;
  
  estado()
  if(state.acell || state.gyro){
    setInterval(movimento(),500)
  }
  
}
function estado(){
  if(((Math.abs(acellData.dx)) > acelltresholf)||((Math.abs(acellData.dy)) > acelltresholf)||((Math.abs(acellData.dz)) > acelltresholf)){
    state.acell = true;
    document.getElementById('AcellState').textContent = "Detectado Movimento";
  }else{
    state.acell = false;
    document.getElementById('AcellState').textContent = "Parado";
  }
  if(((Math.abs(gyroData.dalpha)) > gyrotreshold)||((Math.abs(gyroData.dbeta)) > gyrotreshold)||((Math.abs(gyroData.dgamma)) > gyrotreshold)){
    state.gyro = true;
    document.getElementById('GyroState').textContent = "Detectado Movimento";
  }else{
    state.gyro = false;
    document.getElementById('GyroState').textContent = "Parado";
  }
}
function movimento(){
  estado()
  if(!state.acell || !state.gyro){
    state.mov = false;
    document.getElementById('MovState').textContent = "PARADO";
  }else{
    state.mov = true;
    document.getElementById('MovState').textContent = "MOVIMENTO";
  }
  
}
