using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace forIterating
{
    class practiceC
    {
        static void Main(string[] args)
        {
            // For loop example
            Console.WriteLine("For Loop:");
            for (int i = 0; i < 15; i++)
            {
                Console.WriteLine(i.ToString());
                
                if (i == 8)
                {
                    Console.WriteLine("This is the 9th iteration!");
                    Console.WriteLine("Found seven!");
                }
            }
            Console.ReadLine();               

            Console.WriteLine("For Loop:");
            for (int i = 0; i < 50; i++)
            {
                Console.WriteLine($"Iteration {i + 1}");
                Console.WriteLine(i.ToString());
                
                if (i == 7)
                {
                    Console.WriteLine("This is the 8th iteration!");
                    Console.WriteLine("Found seven!");
                    break; // Exit the loop when i is 7
                }
            }
                Console.ReadLine();               
            
            // While loop example
            Console.WriteLine("\nWhile Loop:");
            int j = 0;
            while (j < 5)
            {
                // ReadLine doesn't support a prompt, changed to WriteLine
                Console.WriteLine($"Iteration {j + 1}");
                j++;
            }

            // Do-while loop example
            Console.WriteLine("\nDo-While Loop:");
            int k = 0;
            do
            {
                Console.WriteLine($"Iteration {k + 1}");
                k++;
            } while (k < 5);

            for (int myvalues = 0; myvalues < 20; myvalues++)
            {
                Console.WriteLine(myvalues);
            }
        }
    }
}

namespace HelperMethod
{
    class ptacticeC
    {
        static void Main(string[] args) 
        {
            string myValue = SuperSecretKrabbyPattyFormula("Bikini Bottom");
            Console.WriteLine(myValue);
            Console.ReadLine();
        }

        private string SuperSecretKrabbyPattyFormula()
        {
            //some cool shit innit?
            return "Hiya! I'm Scottish...ya ken?...It's fish bait";
        }

        private static string SuperSecretKrabbyPattyFormula(string name) 
        {
            return String.Format("Hello, {0}!", name);
        }
    }
}

namespace UnderstandArrays
{
    class practiceC
    {
        static void Main(string[] args)
        {
            int[] numbers = new int[5];
            numbers[0] = 4;
            numbers[1] = 7;
            numbers[2] = 15;
            numbers[3] = 23;
            numbers[4] = 42;

            Console.WriteLine(numbers[0].ToString());
            Console.WriteLine(numbers[1].ToString());
            Console.WriteLine(numbers[2].ToString());
            Console.WriteLine(numbers[3].ToString());
            Console.WriteLine(numbers[4].ToString());
            Console.ReadLine();

            string[] names = new string[5] {"Edwards", "John", "Jane", "Bob", "Alice"}; 

            foreach (string name in names)
            {
                
            }
            Console.ReadLine();

            string zig = "You can escape only" + 
                "the things you understand.";

                char[] charArray = zig.ToCharArray();
                Array.Reverse(charArray);

                foreach (char zigChar in charArray)
                    Console.Write(zigChar);
                
                Console.ReadLine();
        }
    }
}

namespace ReadFileWhile
{
    class practiceC
    {
        static void Main(string[] args)
        {
            StreamReader myReader = new StreamReader("Values.txt");
            string line = "";

            while (line != null)
            {
                line = myReader.ReadLine();
                if (line != null)
                {
                    Console.WriteLine(line);
                }
                
            }
            myReader.Close();
            Console.ReadLine();
        }
    }
}

namespace Strings
{
    class practiceC
    {
        static void Main(string[] args)
        {
            string myString = "Hello, World!";
            Console.WriteLine(myString);
            Console.WriteLine(myString.Length);
            Console.WriteLine(myString.ToUpper());
            Console.WriteLine(myString.ToLower());
            Console.WriteLine(myString.Contains("World"));
            Console.WriteLine(myString.Replace("World", "C#"));
            Console.ReadLine();

            string myString = string.Format("Make: {0}, Model: {1}, Year: {2}", "Toyota", "Camry", 2020);
            Console.WriteLine(myString);
            Console.ReadLine();
        }
    }
}

namespace DateTime
{
    static void Main(string[] args)
    {
        DateTime now = DateTime.Now;
        Console.WriteLine("Current date and time: " + now);
        Console.WriteLine("Year: " + now.Year);
        Console.WriteLine("Month: " + now.Month);
        Console.WriteLine("Day: " + now.Day);
        Console.WriteLine("Hour: " + now.Hour);
        Console.WriteLine("Minute: " + now.Minute);
        Console.WriteLine("Second: " + now.Second);
        Console.ReadLine();
    }
}