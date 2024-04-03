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
  mov: false,
  timer: 0,
}

const temp = {
  data: [],
};

class saveData {
  constructor(type,number,data,result){
    this.type = type;
    this.number = number;
    this.data = data || [];
    this.result = result;
  };
};

const acelltresholf = 1.2;
const gyrotreshold = 20;

//starter
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
  loop();
}
function loop(){
  
  estado(1.5)
  controle(15)
 
}
//obtem dados do giroscopio e salva no objeto
function gyro(event) {
  gyroData.alpha = event.alpha;
  gyroData.beta = event.beta;
  gyroData.gamma = event.gamma;

  document.getElementById('gyroAlpha').textContent = gyroData.alpha.toFixed(3);
  document.getElementById('gyroBeta').textContent = gyroData.beta.toFixed(3);
  document.getElementById('gyroGamma').textContent = gyroData.gamma.toFixed(3);
}

//obtem dados do acelerometro e salva no objeto
function acell(event) {
    acellData.dx = event.acceleration.x;
    acellData.dy = event.acceleration.y;
    acellData.dz = event.acceleration.z;
  
    gyroData.dalpha = event.rotationRate.alpha;
    gyroData.dbeta = event.rotationRate.beta;
    gyroData.dgamma = event.rotationRate.gamma;
}

//verifica se os deltas do acelerometro e giroscopio são menor que o gatilho de movimento
function estado(taxa){
  
  if(((Math.abs(acellData.dx)) > taxa*acelltresholf)||((Math.abs(acellData.dy)) > taxa*acelltresholf)||((Math.abs(acellData.dz)) > taxa*acelltresholf)){
    state.acell = true;
  }
  if(((Math.abs(gyroData.dalpha)) > taxa*gyrotreshold)||((Math.abs(gyroData.dbeta)) > taxa*gyrotreshold)||((Math.abs(gyroData.dgamma)) > taxa*gyrotreshold)){
    state.gyro = true;
  }
  if(((Math.abs(acellData.dx)) < acelltresholf)&&((Math.abs(acellData.dy)) < acelltresholf)&&((Math.abs(acellData.dz)) < acelltresholf)){
    state.acell = false;
  }
  if(((Math.abs(gyroData.dalpha)) < gyrotreshold)&&((Math.abs(gyroData.dbeta)) < gyrotreshold)&&((Math.abs(gyroData.dgamma)) < gyrotreshold)){
    state.gyro = false;
  }
  
  //modifica os valores de debug na html
  if(state.acell){
    document.getElementById('AcellState').textContent = "Detectado Movimento";
  }else{
    document.getElementById('AcellState').textContent = "Parado";
  }
  if(state.gyro){
    document.getElementById('GyroState').textContent = "Detectado Movimento";
  }else{
    document.getElementById('GyroState').textContent = "Parado";
  }
}

//função para verificar quanto tempo o aparelho esta em movimento
function movc(){
  if(state.acell || state.gyro){
    state.mov = true;
  }else{
    state.mov = false;
  }
}

//Função para transformar os dados em uma matriz. Para tentar passar no TensorFlow.
function register(){
    state.timer += 1;
    temp.data[temp.data.length] = [state.timer][acellData.dx,acellData.dy,acellData.dz,gyroData.dalpha,gyroData.dbeta,gyroData.dgamma]
    document.getElementById('MovState').textContent = state.timer;
    if(state.timer > 100){
      data[data.lenght] = new saveData ("data",data.length,tamp.data,"")
      state.timer = 0;
      
    }
}
//função para o controle basico do carrinho
  function controle(delta){ 
     
    if ((gyroData.gamma) > delta){  
    //função para mandar o robo para direita
      document.getElementById('status-Direito').style = "color:green";
      document.getElementById('status-Esquerda').style = "color:red";
    }else if((gyroData.gamma) < -delta){
    //função para mandar o robo para esquerda
      document.getElementById('status-Esquerda').style = "color:green";
      document.getElementById('status-Direito').style = "color:red";
    }
    if((gyroData.beta) > delta){
    //função para mandar o robo para Traz
      document.getElementById('status-Atraz').style = "color:green";
      document.getElementById('status-Frente').style = "color:red";
    }else if((gyroData.beta) < -delta){
    //função para mandar o robo para Frente
      document.getElementById('status-Frente').style = "color:green";
      document.getElementById('status-Atraz').style = "color:red";
    }
}

setInterval(loop,50)
