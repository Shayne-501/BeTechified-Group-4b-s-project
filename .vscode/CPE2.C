#include <stdio.h>

// A function to output "HELLO WORLD!"
void printHelloWorld()
{
    printf("HELLO WORLD!\n");
}

// A function to sum two even numbers
int sumEvenNumbers(int a, int b)
{
    if (a % 2 == 0 && b % 2 == 0)
    {
        return a + b;
    }
    else
    {
        printf("Both numbers must be even.\n");
        return 0;
    }
}

// A function to determine the largest of three numbers
int largestOfThree(int x, int y, int z)
{
    int largest = x;
    if (y > largest)
        largest = y;
    if (z > largest)
        largest = z;
    return largest;
}

int main()
{
    printHelloWorld();

    int a, b;
    printf("Enter two even numbers: ");
    scanf("%d %d", &a, &b);
    int evenSum = sumEvenNumbers(a, b);
    printf("Sum of even numbers: %d\n", evenSum);

    int x, y, z;
    printf("Enter three numbers: ");
    scanf("%d %d %d", &x, &y, &z);
    int largest = largestOfThree(x, y, z);
    printf("Largest number: %d\n", largest);

    return 0;
}