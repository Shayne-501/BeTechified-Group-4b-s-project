#include <stdio.h>

// Function to output "hELLO WORLD!"
void printHelloWorld()
{
    printf("hELLO WORLD!\n");
}

// Function to sum two even numbers
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

// Function to determine the largest of three numbers
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

    int evenSum = sumEvenNumbers(4, 8);
    printf("Sum of even numbers: %d\n", evenSum);

    int largest = largestOfThree(10, 25, 7);
    printf("Largest number: %d\n", largest);

    return 0;
}