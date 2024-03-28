const gyroData = {
      x: null,
      y: null,
      z: null,
      alpha: null,
      beta: null,
      gamma: null
    };

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

    function cb(event) {
      gyroData.alpha = event.alpha;
      gyroData.beta = event.beta;
      gyroData.gamma = event.gamma;

      
      document.getElementById('gyroX').textContent = gyroData.alpha.toFixed(3);
      document.getElementById('gyroY').textContent = gyroData.beta.toFixed(3);
      document.getElementById('gyroZ').textContent = gyroData.gamma.toFixed(3);
    }

    let q; // Declare a variável q


    
