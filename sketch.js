
//--------------------------------------------------------VARIABLES
//---------------------------------------------------sound
let baseUrl = 'https://oscaraccorsi.github.io/mp3_files/';
const vol = new Tone.Volume(0).toDestination();
const reverb = new Tone.Reverb().connect(vol);
const pitchShift = new Tone.PitchShift().connect(vol);


let multiPlayer;
let main, page, daccapo;
let revDecay;
let revArray = [1, 2, 3, 5, 8, 13];

let loopTime;
let loopStart;
let loopDur;

//---------------------------------------------------images
let img;
palette = [];
let palettes = [];

//------------------------------------------coordinate/dimensioni
let x;
let y;

let dim = [2, 6];
let dist;

let value = 0;

let globalDimX = [];
let globalDimY = [];
let globalX, globalY;
let divisoreX, divisorrY;

//----------------------------------------PRELOAD sound/images
function preload() {
  multiPlayer = new Tone.Players({ 
    main: baseUrl + "acuti.mp3",
    page: baseUrl + "ti.mp3",
    daccapo: baseUrl + "ronzo.mp3"
  }).connect(vol);
  palettes[0] = loadImage('assets/mond.jpg');
  palettes[1] = loadImage('assets/sant03.jpg');
  palettes[2] = loadImage('assets/santo.jpeg');
  palettes[3] = loadImage('assets/schneider01.png');
  palettes[4] = loadImage('assets/sant04.jpg');
  palettes[5] = loadImage('assets/rothko.jpg');
  palettes[6] = loadImage('assets/schneiderMio.png');
}
//-----------------------------------------------------RESIZE
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//----------------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  globalDimX = [width/1.5,width/2, width/2.5, width/3, 
                width/3.5, width/4, width/5, width/6, 
                width/7, width/8 ,width-width/3, 
                width-width/3.5, width-width/2.5, 
                width-width/4];
  globalDimY = [height/1.5, height/2,height/5, height/6,     
                height/2.5, height/7, height/8, 
                height/3.5, height/3, height/4, 
                height-height/3, height-height/3.5, 
                height-height/2.5,height-height/4];
  
  background(0);
  img = random(palettes);
  img.resize(100, 200);
  img.loadPixels();
  frameRate(30);
  rectMode(CENTER);
  
//-----------------------------------------------getting colors  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 255);
    palette.push(c);    
  }
  divisoreX = round(random(1, 4));
  divisoreY = round(random(1, 4));
  globalX=round(random(globalDimX));
  globalY=round(random(globalDimY));
  x=globalX;
  y=globalY;
  dist = round(random(4, 20));
  revDecay = random(revArray);
  console.log(globalX, globalY);
  
//-----------------------------------------sound
  main = multiPlayer.player("main");
  page = multiPlayer.player("page");
  daccapo = multiPlayer.player("daccapo");
  
  pitchShift.pitch = random(12);
  reverb.decay = revDecay;
  
  main.autostart = true;
  main.loop = true;
  main.chain(pitchShift, reverb);
  page.connect(reverb);
  daccapo.connect(reverb); 
}

//----------------------------------------------------DRAW
function draw() {
  noStroke();
  
//------------------------------cond. black dots  
  let rnd = round(random(0,5));
  if (rnd >= 2) {
    noFill();
    main.mute = true;
  }
  else {
    fill(random(palette));
    main.volume.value = round(random(-21, 0));
    main.mute = false;
    
  }
  
//--------------------------------rect
  rect(x,y,random(dim),2);
  x+=dist;
  
  
//-------------------------condizione per riga
  if (x>=globalX+(globalX*2) || x>= width-150) {
    x = globalX;
    y += dist;
    
  }
//--------------------------condizione page
  if (y>=globalY+(globalY*2) || y>=height-150) {
    x = globalX;
    y = globalY;
    clear();
    background(0);
    //inc-=1;
    //dim+=1;
    dist = round(random(4, 20));
    
    
    main.mute = true;
    pagePlay();
    main.mute = false;
  }
  
//-----------------------condizione daccapo
  if (dist >= 16) {
    divisoreX = round(random(1, 4));
    divisoreY = round(random(1, 4));
    globalX=round(random(globalDimX));
    globalY=round(random(globalDimY));
    x = globalX;
    y = globalY;
    palette = [];
    img = random(palettes);
    img.loadPixels();
    
    for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 255);
    palette.push(c);    
    }
    dist = round(random(4, 20));
    
    revDecay = random(revArray);
    
    pitchShift.pitch = random(12);
    daccapoPlay();
    
  }   
}
//-------------------------------------------FUNCTIONS
//------------------------------------play
function pagePlay () {
  page.start();  
}
function daccapoPlay () {
  daccapo.start();  
}

//-----------------------------------mouseClick
function mouseClicked() {
  if (value === 0) {
    vol.mute = true;
    value = 1;
  } 
  else {
    vol.mute = false;
    value = 0;
  }  
}


