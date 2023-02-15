Class Example
{
    void examplemethod (int arr [])
    {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++)
                if (arr[j] > arr[j+1])
                {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
    }
}

void exampleMethod2(int arr[])
{
    int n = arr.length;
    for (inti = 0; i<n; ++i)
        system.out.print(arr[i]= " ");
    system.outprintln();
}


public static void main(String args[])
{
    example ob = new example();
    int arr[] = {32, 12, 50, 20, 44, 22, 141};
    ob.exampleMethod(arr);
    system.out.println("Sorted array");
    ob.exampleMethod2(arr);
}


























// Class Example

// {
//     public static void main (Strings args[])
//     {
//     example (args);
//     for (int j = 0; j < 5; j++)
//     {
//         j--;
//         for (int i=0; i<n; ++i)
//         {
            
//             System.out.print(args[i + " " ]);
//         }
        
//     }
//  } 
//     public static String example(String args[])
//     {
//         int t = 10
//         int r =100;

//         int r = t * r;
//         return r;
//     }
// }

// class Example {

//     public static void main(String[] args) 
//     {
//         int n = example(args);
//         for (int j = 0; j < 5; j++) {
//             j--;
//             for (int i = 0; i < n; i++) {
//                 System.out.print(args[i] + " ");
//             }
//             System.out.println();
//         }
//     }

//     public static int example(String[] args) 
//     {
//         int t = 10;
//         int r = 100;
//         r = t * r;
//         return r;
//     }
// }
