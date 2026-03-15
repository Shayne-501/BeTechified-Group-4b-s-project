#include <Arduino.h>

int pirPin = 2;
int buzzerPin = 8;
int ledPin = 9;

void setup()
{
    pinMode(pirPin, INPUT);
    pinMode(buzzerPin, OUTPUT);
    pinMode(ledPin, OUTPUT);
}

void loop()
{
    int motionState = digitalRead(pirPin);
    if (motionState == HIGH)
    {
        digitalWrite(ledPin, HIGH);
        digitalWrite(buzzerPin, HIGH);
    }
    else
    {
        digitalWrite(ledPin, LOW);
        digitalWrite(buzzerPin, LOW);
    }

    // duplicate PIR check removed (handled above using motionState)
}