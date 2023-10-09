const vidModeConfigClass = require("@brightsign/videomodeconfiguration");

async function main() {
  console.log("In main");
  let vidConfig = new vidModeConfigClass();
  let modesConfig = await screenModeConfig(vidConfig);
  //console.log('modes config: ', modesConfig)

  let modeSetReturn = await vidConfig.setScreenModes(modesConfig);
  if (modeSetReturn.restartRequired) {
    console.log('player restart required');
  } else {
    console.log('No video mode changes necessary');
  }

}

async function screenModeConfig(vidConfig) {
  let screenmodes = await vidConfig.getScreenModes();

  let setModesConfig = screenmodes;

  /*
  getScreenModes return looks like:
 
  0: {enabled: true, outputName: "HDMI-1", screenX: 0, screenY: 0, transform: "normal", …}
  1: {enabled: false, outputName: "HDMI-2"}
  2: {enabled: false, outputName: "HDMI-3"}
  3: {enabled: false, outputName: "HDMI-4"}
  4: {enabled: false, outputName: "TypeC-1"}
  */

  // Set first screen output to 1080p
  setModesConfig[0].videoMode = "1920x1080x60p";

  // Set second screen output
  setModesConfig[1].outputName = "HDMI-2";
  setModesConfig[1].enabled = true;
  setModesConfig[1].screenX = 3840;
  setModesConfig[1].screenY = 0;
  setModesConfig[1].transform = "normal";
  setModesConfig[1].videoMode = "1920x1080x60p";

  // Account for more than 2 outputs and current return bug

  // Set third output
  setModesConfig[2] = { ...setModesConfig[0] };
  setModesConfig[2].outputName = "HDMI-3";
  setModesConfig[2].enabled = true;
  setModesConfig[2].screenX = 0;
  setModesConfig[2].screenY = 2160;
  setModesConfig[2].transform = "normal";
  setModesConfig[2].videoMode = "1920x1080x60p";

  // Set fourth output
  setModesConfig[3] = { ...setModesConfig[0] };
  setModesConfig[3].outputName = "HDMI-4";
  setModesConfig[3].enabled = true;
  setModesConfig[3].screenX = 3840;
  setModesConfig[3].screenY = 2160;
  setModesConfig[3].transform = "normal";
  setModesConfig[3].videoMode = "1920x1080x60p";

  /*
  There is a known issue where getScreenModes function only returns the active outputs
  So, for more than HDMI-1 and 2, you need to add the other outputs manually
  In order to do this, you need to create nested arrays for each output you want to set:
 
  let setModesConfig = screenmodes;
  let output2 = [
    {
      enabled: true,
      outputName: "HDMI-3",
      screenX: xPos, screenY: yPos,
      transform: "normal",
      videoMode: "1920x1080x60p"
    }
  ];
  setModesConfig.push(output2);
 
  OR:
 
  let setModesConfig = screenmodes;
  setModesConfig[2] = {...setModesConfig[0]};
  setModesConfig[2].enabled = true;
  setModesConfig[2].screenX = posX;
  setModesConfig[2].screenY = posY;
  setModesConfig[2].transform = "normal";
  setModesConfig[2].videoMode = "1920x1080x60p";
 
 
  */
  return setModesConfig;
}


window.main = main;