module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Configuración adicional para Jasmine
      },
      clearContext: false // mantiene la salida de pruebas visible en el navegador
    },
    files: [
      'src/**/*.spec.ts' // Asegura que todos los archivos .spec.ts en src sean incluidos
    ],
    jasmineHtmlReporter: {
      suppressAll: true // oculta los rastros duplicados
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/3-pf-contardo-59435'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    singleRun: false, // Cambia a true si quieres que Karma corra una vez y luego se cierre
    restartOnFileChange: true
  });
};
