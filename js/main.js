// ---- mobile menu toggle ----
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  if(menuToggle && mainNav){
    menuToggle.addEventListener('click', function(){
      var isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- live clock, Africa/Casablanca ----
  function tick(){
    var el = document.getElementById('clock');
    var now = new Date().toLocaleTimeString('fr-FR', {
      timeZone: 'Africa/Casablanca', hour: '2-digit', minute:'2-digit', second:'2-digit'
    });
    if(el) el.textContent = now;
  }
  tick();
  setInterval(tick, 1000);

  // ---- simulated telemetry ticker ----
  var sources = ['wazuh-manager', 'sysmon-collector', 'sigma-engine', 'shuffle-soar', 'suricata-ids', 'thehive-case'];
  var events = [
    {sev:'low',  msg:'Événement Sysmon EventID=1 corrélé — process création bénigne'},
    {sev:'med',  msg:'Règle Sigma déclenchée — accès fichier suspect (T1005)'},
    {sev:'low',  msg:'Health-check agent Wazuh — 42 hôtes OK'},
    {sev:'high', msg:'Alerte critique — exécution LOLBin détectée (T1218)'},
    {sev:'med',  msg:'Playbook SOAR lancé — isolation hôte en cours'},
    {sev:'low',  msg:'Synchronisation MISP — 3 nouveaux indicateurs importés'},
    {sev:'med',  msg:'Baseline MTTD mise à jour — pipeline Grafana'},
    {sev:'low',  msg:'Ticket OpenProject clôturé — validation MCO OK'},
    {sev:'high', msg:'Anomalie réseau pfSense — trafic sortant inhabituel'},
    {sev:'low',  msg:'Déploiement CI/CD — règle Sigma poussée vers Wazuh'}
  ];

  var feed = document.getElementById('feed');
  var maxLines = 7;

  function pad(n){ return n < 10 ? '0'+n : n; }

  function addLine(){
    var e = events[Math.floor(Math.random() * events.length)];
    var src = sources[Math.floor(Math.random() * sources.length)];
    var d = new Date();
    var ts = pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());
    var sevClass = e.sev === 'high' ? 'sev-high' : (e.sev === 'med' ? 'sev-med' : 'sev-low');
    var sevLabel = e.sev === 'high' ? 'HIGH' : (e.sev === 'med' ? 'MED' : 'LOW');

    var line = document.createElement('div');
    line.className = 'feed-line';
    line.innerHTML =
      '<span class="t">'+ts+'</span>' +
      '<span class="sev '+sevClass+'">'+sevLabel+'</span>' +
      '<span class="msg">['+src+'] '+e.msg+'</span>';

    feed.insertBefore(line, feed.firstChild);
    while(feed.children.length > maxLines){
      feed.removeChild(feed.lastChild);
    }
  }

  for(var i=0;i<5;i++){ addLine(); }
  var feedTimer = setInterval(addLine, 1900);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){ clearInterval(feedTimer); }

  // ---- expandable project case files ----
  document.querySelectorAll('.case-head').forEach(function(btn){
    btn.addEventListener('click', function(){
      var card = btn.closest('.case');
      var body = card.querySelector('.case-body');
      var isOpen = card.getAttribute('data-open') === 'true';

      document.querySelectorAll('.case').forEach(function(c){
        if(c !== card){
          c.setAttribute('data-open', 'false');
          c.querySelector('.case-head').setAttribute('aria-expanded', 'false');
          c.querySelector('.case-body').style.maxHeight = null;
        }
      });

      if(isOpen){
        card.setAttribute('data-open', 'false');
        btn.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;
      } else {
        card.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
