const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');

canvas.width = 800; // Set the width of the canvas
canvas.height = 600; // Set the height of the canvas

document.body.appendChild(canvas); // Append the canvas to the document body

// Define the vertices of the cube
const vertices = [
    // Front face
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    // Back face
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,
];

// Define the indices of the cube
const indices = [
    // Front face
    0, 1, 2,
    2, 3, 0,
    // Back face
    4, 5, 6,
    6, 7, 4,
    // Top face
    3, 2, 6,
    6, 7, 3,
    // Bottom face
    0, 1, 5,
    5, 4, 0,
    // Right face
    1, 2, 6,
    6, 5, 1,
    // Left face
    0, 3, 7,
    7, 4, 0,
];

// Create a buffer for the vertices
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Create a buffer for the indices
const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

// Compile the vertex shader
const vertexShaderSource = `
    attribute vec3 position;
    uniform mat4 modelViewProjectionMatrix;
    
    void main() {
        gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);
    }
`;
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

// Compile the fragment shader
const fragmentShaderSource = `
    precision mediump float;
    
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Create a shader program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// Get the position attribute location
const positionAttributeLocation = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

// Set the model view projection matrix
const modelViewProjectionMatrixLocation = gl.getUniformLocation(program, 'modelViewProjectionMatrix');
const modelViewProjectionMatrix = mat4.create();
mat4.perspective(modelViewProjectionMatrix, 45 * Math.PI / 180, canvas.width / canvas.height, 0.1, 100.0);
mat4.translate(modelViewProjectionMatrix, modelViewProjectionMatrix, [0.0, 0.0, -2.0]);
gl.uniformMatrix4fv(modelViewProjectionMatrixLocation, false, modelViewProjectionMatrix);

// Clear the canvas
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Draw the cube
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);