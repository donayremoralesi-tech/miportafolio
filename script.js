(function () {
  // Código QR decorativo para ApunteQR
  var qr = document.getElementById('qr'), n = 7, s = 12, html = '';
  var seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function finder(x, y) {
    return '<rect x="' + x * s + '" y="' + y * s + '" width="' + 3 * s + '" height="' + 3 * s + '" fill="#14142B"/>' +
      '<rect x="' + (x * s + 4) + '" y="' + (y * s + 4) + '" width="' + (3 * s - 8) + '" height="' + (3 * s - 8) + '" fill="#F3F4F6"/>' +
      '<rect x="' + (x * s + 12) + '" y="' + (y * s + 12) + '" width="12" height="12" fill="#14142B"/>';
  }
  for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
    var inF = (x < 3 && y < 3) || (x > 3 && y < 3) || (x < 3 && y > 3);
    if (!inF && rnd() > 0.45) html += '<rect x="' + x * s + '" y="' + y * s + '" width="' + s + '" height="' + s + '" fill="#14142B"/>';
  }
  html += finder(0, 0) + finder(4, 0) + finder(0, 4);
  qr.innerHTML = html;

  // Nevada del Eternauta
  var snow = document.getElementById('snow'), flakes = '';
  for (var i = 0; i < 46; i++) {
    flakes += '<circle cx="' + (rnd() * 320).toFixed(1) + '" cy="' + (rnd() * 170).toFixed(1) + '" r="' + (1 + rnd() * 2.2).toFixed(1) + '" fill="#F3F4F6" opacity="' + (0.4 + rnd() * 0.6).toFixed(2) + '"/>';
  }
  snow.innerHTML = flakes;

  // Formulario
  var form = document.getElementById('form'), status = document.getElementById('status');
  function setErr(id, msg) { document.getElementById('e-' + id).textContent = msg; }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var nombre = form.nombre.value.trim(), email = form.email.value.trim(), mensaje = form.mensaje.value.trim();
    var ok = true;
    setErr('nombre', nombre ? '' : 'Escribí tu nombre.'); if (!nombre) ok = false;
    var mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErr('email', mailOk ? '' : 'Ingresá un correo válido, por ejemplo nombre@correo.com.'); if (!mailOk) ok = false;
    setErr('mensaje', mensaje.length >= 10 ? '' : 'Contame un poco más, mínimo 10 caracteres.'); if (mensaje.length < 10) ok = false;
    if (!ok) { status.hidden = true; return; }
    var texto = 'Nombre: ' + nombre + '\nCorreo: ' + email + '\n\n' + mensaje;
    status.hidden = false;
    status.innerHTML = '<strong>Mensaje listo.</strong><span>Esta página todavía no envía correos. Copiá el texto y mandalo por tus redes.</span><pre></pre><button type="button" class="btn btn-ghost" id="copy">Copiar mensaje</button>';
    status.querySelector('pre').textContent = texto;
    status.querySelector('#copy').addEventListener('click', function (e) {
      var b = e.currentTarget;
      function done() { b.textContent = 'Copiado'; }
      try {
        navigator.clipboard.writeText(texto).then(done, function () { select(); });
      } catch (err) { select(); }
      function select() {
        var r = document.createRange(); r.selectNodeContents(status.querySelector('pre'));
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        b.textContent = 'Texto seleccionado';
      }
    });
  });
})();
