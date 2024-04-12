const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Definir as coordenadas do centro do cubo
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Definir as dimensões do cubo
const cubeSize = 100;

// Definir a rotação inicial do cubo
let rotation = 0;

function drawCube() {
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Definir a cor do cubo
    ctx.fillStyle = 'red';

    // Salvar o estado atual do contexto
    ctx.save();

    // Mover o contexto para o centro do cubo
    ctx.translate(centerX, centerY);

    // Rotacionar o contexto
    ctx.rotate(rotation);

    // Desenhar as faces do cubo
    ctx.fillRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
    ctx.strokeRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);

    // Restaurar o estado do contexto
    ctx.restore();

    // Atualizar a rotação para a próxima frame
    rotation += 0.01;

    // Chamar a função novamente na próxima frame
    requestAnimationFrame(drawCube);
}

// Iniciar a animação
drawCube();