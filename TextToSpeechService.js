const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

class TextToSpeechService {
  constructor(apiKey, serviceUrl) {
    this.textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({ apikey: apiKey }),
      serviceUrl: serviceUrl,
    });
  }

  async synthesize(text, accept) {
    const params = {
      text: text,
      accept: accept,
      voice: 'en-US_EmilyV3Voice',
    };

    const { result } = await this.textToSpeech.synthesize(params);
    return result;
  }
}

module.exports = TextToSpeechService;