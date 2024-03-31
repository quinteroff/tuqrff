// code_qrff.js
const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const qrCodeContainer = document.getElementById('qr-code-container');
const downloadBtn = document.getElementById('download-btn');
const copyBtn = document.getElementById('copy-btn');

generateBtn.addEventListener('click', generateQRCode);
downloadBtn.addEventListener('click', downloadQRCode);
copyBtn.addEventListener('click', copyQRCodeToClipboard);

let qrCodeElement = null;

function generateQRCode() {
  const text = textInput.value.trim();
  if (text === '') {
    alert('Por favor, ingresa un texto');
    return;
  }

  // Eliminar el código QR anterior, si existe
  if (qrCodeElement) {
    qrCodeContainer.removeChild(qrCodeElement);
  }

  // Crear un nuevo elemento de código QR
  qrCodeElement = new QRCode(qrCodeContainer, {
    text: text,
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  // Mostrar los botones de descarga y copia
  downloadBtn.disabled = false;
  copyBtn.disabled = false;
}

function downloadQRCode() {
  const canvas = qrCodeElement._el.querySelector('canvas');
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/jpg');
  link.download = 'qr-code.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function copyQRCodeToClipboard() {
  const canvas = qrCodeElement._el.querySelector('canvas');
  const dataURL = canvas.toDataURL('image/jpg');
  navigator.clipboard.writeText(dataURL)
    .then(() => alert('¡Código QR copiado al portapapeles!'))
    .catch((err) => console.error('Error al copiar el código QR:', err));
}

const clearBtn = document.getElementById('clear-btn');

clearBtn.addEventListener('click', clearQRCode);

function clearQRCode() {
  // Limpiar el contenido del campo de texto
  textInput.value = '';

  // Enfocar nuevamente el campo de texto
  textInput.focus();

  // Eliminar el código QR y restablecer los botones de descarga y copia
  qrCodeContainer.innerHTML = ''; // Eliminar el contenido dentro del contenedor
  qrCodeElement = null; // Restablecer la variable qrCodeElement a null
  downloadBtn.disabled = true; // Deshabilitar el botón de descarga
  copyBtn.disabled = true; // Deshabilitar el botón de copia

}