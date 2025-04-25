
document.addEventListener('DOMContentLoaded', () => {
    const bluetoothBtn = document.getElementById('bluetoothBtn');
    const usbBtn = document.getElementById('usbBtn');
    const qrBtn = document.getElementById('qrBtn');
    const startBtn = document.getElementById('startBtn');
  
    bluetoothBtn.addEventListener('click', () => {
      alert('Send via Bluetooth clicked');
      // Add Bluetooth logic here
    });
  
    usbBtn.addEventListener('click', () => {
      alert('Send via USB clicked');
      // Add USB logic here
    });
  
    qrBtn.addEventListener('click', () => {
      alert('Send via QR Code clicked');
      // Add QR code logic here
    });
  
    startBtn.addEventListener('click', () => {
      alert('Start button clicked');
      // Add Start button logic here
    });
  });