#include <avr/io.h>
#include <util/delay.h>

int main(void)
{
    DDRB |= (1 << PB5); // Set Data Direction Register for Port B, bit 5 (PB5) as output

    while (1)
    {
        PORTB |= (1 << PB5);  // Set PB5 high (turn led on)
        _delay_ms(1000);      // Wait for 1000 milliseconds
        PORTB &= ~(1 << PB5); // Set PB5 low (turn LED off)
        _delay_ms(1000);      // Wait for 1000 miliseconds
    }
    return 0;
}