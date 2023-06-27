particlesJS('particles-js', {
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffff00'
      },
      shape: {
        type: 'image',
        image: {
          src: '/static/images/butterfly.png', 
          width: 60, 
          height: 50 
        }
      },
      size: {
        value: 20, 
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 5, 
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      },
      line_linked: {
        enable: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false
        },
        onclick: {
          enable: false
        },
        resize: true
      }
    },
    retina_detect: true
  });