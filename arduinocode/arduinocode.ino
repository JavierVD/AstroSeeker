#include <SoftwareSerial.h>
SoftwareSerial eqmount(8,9);
int stepsdec = 13;
int direcciondec = 12;
int stepsar = 11;
int direccionar = 10;
const byte clkPin  = 2;
const byte dtPin  = 3;
const byte swPin  = 5;

byte rotVal  = 0;
bool clkState  = LOW;
bool clkLast  = HIGH;
bool swState  = HIGH;
bool swLast  = HIGH;

String cmd = "";
void setup() {
  eqmount.begin(9600);
  Serial.begin(9600); 
  pinMode(clkPin,INPUT);
  pinMode(dtPin,INPUT);
  pinMode(swPin,INPUT_PULLUP);

}
void load(){
    while(eqmount.available()>0){
      char inChar = (char)eqmount.read(); 
      cmd +=inChar;
      delay(100);
  }
}
void manualdec(bool pos){
  digitalWrite(direcciondec, pos);
  digitalWrite(stepsdec, LOW);  
  delayMicroseconds(20); 
  digitalWrite(stepsdec, HIGH);
  delayMicroseconds(20);
  load();
}

void gotof(long ar, long dec, bool dar, bool ddec){
  digitalWrite(direcciondec, ddec);
  digitalWrite(direccionar, dar);
  long mayor = (ar>=dec)? ar : dec;
  long unsigned counter = 0;
  while(mayor>=counter){
    if(ar>=counter){
      digitalWrite(stepsar, LOW);
          digitalWrite(stepsdec, LOW);
      delayMicroseconds(20);       
      digitalWrite(stepsar, HIGH);  
            digitalWrite(stepsdec, HIGH);
      delayMicroseconds(20);
    }
    /*if(dec>=counter){
      digitalWrite(stepsdec, LOW);  
      delayMicroseconds(1000); 
      digitalWrite(stepsdec, HIGH);
      delayMicroseconds(1000);
    }*/
    counter++;
  }
}

void track(bool pos){
  digitalWrite(direccionar, pos);
  digitalWrite(stepsar, LOW);  
  delayMicroseconds(1200);        
  digitalWrite(stepsar, HIGH);   
  delayMicroseconds(1200);
  load();
}

void manualar(bool pos){
  digitalWrite(direccionar, pos);
  digitalWrite(stepsar, LOW);  
  delayMicroseconds(20);        
  digitalWrite(stepsar, HIGH);   
  delayMicroseconds(20);
  load();
}


void loop() {
  load();
  if(cmd!=""){
    Serial.println(cmd);
    while(cmd == "-dec"){
      manualdec(1);
    }
    while(cmd == "+dec"){
      manualdec(0);
    }
    while(cmd == "-ra"){
      manualar(0);
    }
    while(cmd == "+ra"){
      manualar(1);
    }
    if(cmd[0] == 'g'){
      Serial.println("arre");
      String valores[2];
      byte unsigned ccc = 0;
      for(byte unsigned x = 1; x<cmd.length();x++){
        if(cmd[x] != ' ')
          valores[ccc] += cmd[x];
        else
          ccc++;
      }
      Serial.print("conversion ar: ");
      Serial.println(valores[0]);
      Serial.print("conversion dec: ");
      Serial.println(valores[1]);
      String ta = valores[0];
      String td = valores[1];
      long ar = atol(ta.c_str());
      long dec =atol(td.c_str());
      bool dirar = 1;
      bool dirdec = 1;
      if(ar<0){
        dirar = 0;
        ar=ar*-1;
      }
      if(dec<0){
        dirdec = 0;
        dec*=-1;
      }
      
      gotof(ar,dec,dirar,dirdec);
    }
    
    while(cmd == "t"){
      track(0);
    }
    if (Serial.available()){
      eqmount.write(Serial.read());
    }
  }
  cmd="";
}

void readRotary( ) {
  clkState = digitalRead(clkPin);
  if ((clkLast == LOW) && (clkState == HIGH)) {//rotary moving
    Serial.print("Rotary position ");
    if (digitalRead(dtPin) == HIGH) {
      rotVal = rotVal - 1;
    }
    else {
      rotVal++;
      if ( rotVal > 10 ) {
        rotVal = 10;
      }
    }
    Serial.println(rotVal);
    delay(200);
  }
  clkLast = clkState;

  //gestion bouton
  swState = digitalRead(swPin);
  if (swState == LOW && swLast == HIGH) {
    Serial.println("Rotary pressed");
    delay(100);//debounce
  }
  swLast = swState;
}