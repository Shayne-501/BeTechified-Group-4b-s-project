#include <stdio.h>
#include <math.h>

// Solve ax^2 + bx + c = 0
int solver()
{
    double a, b, c;
    double discriminant, root1, root2, realPart, imagPart;

    printf("Enter coefficients a, b, and c: ");
    scanf("%lf, %lf, %lf", &a, &b, &c);

    printf("Formula: x = (-b ± sqrt(b^2 - 4ac)) / (2a)\n");

    if (a == 0)
    {
        printf("Coefficient 'a' can't be 0. Not a quadratic equation.\n");
        return;
    }

    printf("Solving: %.2fx^2 + %.2fx + %.2f = 0\n", a, b, c);

    discriminant = b * b - 4 * a * c;

    if (discriminant > 0)
    {
        root1 = (-b + sqrt(discriminant)) / (2 * a);
        root2 = (-b - sqrt(discriminant)) / (2 * a);
        printf("Two real roots: %.2lf and %.2lf\n", root1, root2);
    }
    else if (discriminant == 0)
    {
        root1 = -b / (2 * a);
        printf("One real root: %.2lf\n", root1);
    }
    else
    {
        realPart = -b / (2 * a);
        imagPart = sqrt(-discriminant) / (2 * a);
        printf("Two complex roots: %.2lf+%.2lfi and %.2lf-%.2lfi\n", realPart, imagPart, realPart, imagPart);
    }
    return 0;
}

int main()
{
    char choice;

    do
    {
        int result = solver();
        if (result != 0)
        {
            printf("This Quadratic equation couldn't be solve. Check the question and try again.");
        }
        printf("Do you wish to continue? (y/n)");
        scanf("%c", &choice);
    } while (choice == 'y' || choice == 'Y');

    printf("Thanks for using the Almighty Formula Solver!");
    return 0;
}
}