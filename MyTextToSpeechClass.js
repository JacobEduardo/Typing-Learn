const fs = require('fs');

class MyTextToSpeechClass {
  constructor(textToSpeech) {
    this.textToSpeech = textToSpeech;
  }

  async synthesizeAndSaveToFile(text, filename) {
    try{

      const synthesizeParams = {
        text: 'Hello world',
        accept: 'audio/wav',
        voice: 'en-US_AllisonV3Voice',
      };
 
        textToSpeech.synthesize(synthesizeParams)
        .then(response => {
          // The following line is necessary only for
          // wav formats; otherwise, `response.result`
          // can be directly piped to a file.
          return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
          fs.writeFileSync('hello_world.wav', buffer);
        })
        .catch(err => {
          console.log('error:', err);
        });



    } catch (error) {
      console.error('Error al guardar el archivo de audio', error);
    }

  }
}

module.exports = MyTextToSpeechClass;