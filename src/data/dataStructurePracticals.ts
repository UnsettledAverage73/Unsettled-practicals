export interface Practical {
  id: number;
  title: string;
  description: string;
  code: string;
  explanation?: string;
  output?: string;
  lineByLineExplanation?: string[];
  advantages?: string[];
  applications?: string[];
  vivaQuestions?: {
    question: string;
    answer: string;
  }[];
}

export const dataStructurePracticals: Practical[] = [
  {
    id: 1,
    title: "Implement Bubble Sort",
    description: "Write a program to implement Bubble sort algorithm in C language.",
    code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n-1; i++) {
        // Last i elements are already in place
        for (j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // Swap arr[j] and arr[j+1]
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

// Function to print an array
void printArray(int arr[], int size) {
    int i;
    for (i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

// Main function to test bubble sort
int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr)/sizeof(arr[0]);
    printf("Original array: \\n");
    printArray(arr, n);
    
    bubbleSort(arr, n);
    
    printf("Sorted array: \\n");
    printArray(arr, n);
    return 0;
}`,
    explanation: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. The algorithm gets its name because smaller elements 'bubble' to the top of the array with each iteration.",
    output: `Original array: 
64 34 25 12 22 11 90 
Sorted array: 
11 12 22 25 34 64 90`,
    lineByLineExplanation: [
      "#include <stdio.h> - Include standard input-output header file for functions like printf and scanf.",
      "void bubbleSort(int arr[], int n) - Function declaration that takes an array and its size as parameters.",
      "int i, j, temp - Declare loop counters 'i' and 'j', and a temporary variable for swapping.",
      "for (i = 0; i < n-1; i++) - Outer loop runs n-1 times, where n is array size.",
      "for (j = 0; j < n-i-1; j++) - Inner loop runs from 0 to n-i-1 as last i elements are already in place.",
      "if (arr[j] > arr[j+1]) - Compare adjacent elements.",
      "Swap logic using temp variable - Standard swapping of elements using a temporary variable.",
      "void printArray(int arr[], int size) - Function to print all elements of the array.",
      "main() function creates a sample array and demonstrates bubble sort on it."
    ],
    advantages: [
      "Simple implementation with minimal code",
      "In-place sorting (requires O(1) extra space)",
      "Stable sorting algorithm (preserves order of equal elements)",
      "Performs well on small data sets or nearly sorted arrays",
      "Easy to detect if the array is already sorted"
    ],
    applications: [
      "Educational tool to teach sorting concepts",
      "Sorting small datasets where implementation simplicity matters",
      "When memory usage is a constraint (due to in-place sorting)",
      "When stability of sorting is required"
    ],
    vivaQuestions: [
      {
        question: "What is the time complexity of Bubble Sort?",
        answer: "The time complexity of Bubble Sort is O(n²) in the worst and average cases, where n is the number of elements. In the best case (already sorted array), it can be O(n) with a modified implementation that uses a flag to detect if any swaps were made."
      },
      {
        question: "How does Bubble Sort compare with other sorting algorithms?",
        answer: "Bubble Sort is generally less efficient than algorithms like Quick Sort, Merge Sort, or Heap Sort which have O(n log n) time complexity. However, it's simpler to implement and can outperform more complex algorithms on small data sets or nearly sorted arrays."
      },
      {
        question: "What is meant by a 'stable' sorting algorithm?",
        answer: "A stable sorting algorithm preserves the relative order of equal elements in the sorted output as they appeared in the input. Bubble Sort is stable because it only swaps adjacent elements when they are in the wrong order."
      },
      {
        question: "Can Bubble Sort be optimized?",
        answer: "Yes, Bubble Sort can be optimized by: 1) Adding a flag to detect if any swaps were made in a pass, and terminating if none were made. 2) Tracking the last swap position to reduce the inner loop range. These optimizations can make the best-case complexity O(n)."
      }
    ]
  },
  {
    id: 2,
    title: "Array Operations",
    description: "Write a program to create, insert and delete an element from a given array.",
    code: `#include <stdio.h>

// Function to display the array
void display(int arr[], int size) {
    if (size == 0) {
        printf("Array is empty\\n");
        return;
    }
    
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Function to insert an element at a specific position
int insertElement(int arr[], int size, int element, int position, int capacity) {
    // Check if array is full
    if (size >= capacity) {
        printf("Cannot insert element, array is full\\n");
        return size;
    }
    
    // Check if position is valid
    if (position < 0 || position > size) {
        printf("Invalid position\\n");
        return size;
    }
    
    // Shift elements to the right
    for (int i = size - 1; i >= position; i--) {
        arr[i + 1] = arr[i];
    }
    
    // Insert element at position
    arr[position] = element;
    
    printf("Element %d inserted at position %d\\n", element, position);
    
    return size + 1;
}

// Function to delete an element from a specific position
int deleteElement(int arr[], int size, int position) {
    // Check if array is empty
    if (size <= 0) {
        printf("Array is empty, cannot delete\\n");
        return size;
    }
    
    // Check if position is valid
    if (position < 0 || position >= size) {
        printf("Invalid position\\n");
        return size;
    }
    
    // Store the element to be deleted
    int deletedElement = arr[position];
    
    // Shift elements to the left
    for (int i = position; i < size - 1; i++) {
        arr[i] = arr[i + 1];
    }
    
    printf("Element %d at position %d deleted successfully\\n", deletedElement, position);
    
    return size - 1;
}

int main() {
    int arr[100], size = 0, capacity = 100;
    int choice, element, position;
    
    // Initialize array with some values
    arr[0] = 10; arr[1] = 20; arr[2] = 30; arr[3] = 40; arr[4] = 50;
    size = 5;
    
    printf("Initial ");
    display(arr, size);
    
    // Insert element at position 2
    element = 25;
    position = 2;
    size = insertElement(arr, size, element, position, capacity);
    display(arr, size);
    
    // Delete element from position 3
    position = 3;
    size = deleteElement(arr, size, position);
    display(arr, size);
    
    return 0;
}`,
    explanation: "This program demonstrates three basic operations on arrays: creation, insertion, and deletion. The insertion function shifts elements to the right starting from the specified position and places the new element. The deletion function removes an element from a specific position and shifts all subsequent elements to the left.",
    output: `Initial Array elements: 10 20 30 40 50 
Element 25 inserted at position 2
Array elements: 10 20 25 30 40 50 
Element 30 at position 3 deleted successfully
Array elements: 10 20 25 40 50`,
    lineByLineExplanation: [
      "#include <stdio.h> - Includes the standard input/output library for functions like printf.",
      "void display(int arr[], int size) - Defines a function to print the elements of an array.",
      "if (size == 0) - Checks if the array is empty.",
      "printf(\"Array is empty\\n\"); - Prints a message if the array is empty.",
      "printf(\"Array elements: \"); - Prints a label before displaying array elements.",
      "for (int i = 0; i < size; i++) - Loops through each element of the array.",
      "printf(\"%d \", arr[i]); - Prints the current element followed by a space.",
      "printf(\"\\n\"); - Prints a newline character to end the output.",
      "int insertElement(int arr[], int size, int element, int position, int capacity) - Defines a function to insert an element into the array at a given position.",
      "if (size >= capacity) - Checks if the array is full.",
      "printf(\"Cannot insert element, array is full\\n\"); - Prints an error message if the array is full.",
      "return size; - Returns the current size of the array.",
      "if (position < 0 || position > size) - Checks if the specified position is valid.",
      "printf(\"Invalid position\\n\"); - Prints an error message if the position is invalid.",
      "for (int i = size - 1; i >= position; i--) - Loops through the array from the end to the insertion point.",
      "arr[i + 1] = arr[i]; - Shifts each element one position to the right.",
      "arr[position] = element; - Inserts the new element at the specified position.",
      "printf(\"Element %d inserted at position %d\\n\", element, position); - Prints a success message.",
      "return size + 1; - Returns the new size of the array.",
      "int deleteElement(int arr[], int size, int position) - Defines a function to delete an element from the array at a given position.",
      "if (size <= 0) - Checks if the array is empty.",
      "printf(\"Array is empty, cannot delete\\n\"); - Prints an error message if the array is empty.",
      "return size; - Returns the current size of the array.",
      "if (position < 0 || position >= size) - Checks if the specified position is valid.",
      "printf(\"Invalid position\\n\"); - Prints an error message if the position is invalid.",
      "int deletedElement = arr[position]; - Stores the element to be deleted.",
      "for (int i = position; i < size - 1; i++) - Loops through the array from the deletion point to the end.",
      "arr[i] = arr[i + 1]; - Shifts each element one position to the left.",
      "printf(\"Element %d at position %d deleted successfully\\n\", deletedElement, position); - Prints a success message.",
      "return size - 1; - Returns the new size of the array.",
      "int main() - Main function where the program execution starts.",
      "int arr[100], size = 0, capacity = 100; - Declares an array with a capacity of 100, initializes size to 0, and sets the capacity.",
      "arr[0] = 10; arr[1] = 20; arr[2] = 30; arr[3] = 40; arr[4] = 50; - Initializes the array with some values.",
      "size = 5; - Sets the initial size of the array.",
      "printf(\"Initial \"); - Prints a label before displaying the initial array.",
      "display(arr, size); - Calls the display function to print the initial array.",
      "element = 25; - Sets the element to be inserted.",
      "position = 2; - Sets the position where the element will be inserted.",
      "size = insertElement(arr, size, element, position, capacity); - Calls the insertElement function to insert the element.",
      "display(arr, size); - Calls the display function to print the array after insertion.",
      "position = 3; - Sets the position from where the element will be deleted.",
      "size = deleteElement(arr, size, position); - Calls the deleteElement function to delete the element.",
      "display(arr, size); - Calls the display function to print the array after deletion.",
      "return 0; - Returns 0 to indicate successful execution of the program."
    ],
    advantages: [
      "Basic array operations are fundamental to many data structures and algorithms.",
      "Arrays provide direct access to elements via their index, offering O(1) access time.",
      "Arrays are memory efficient due to their contiguous memory allocation.",
      "Insertion and deletion at the end of the array can be done in O(1) time if the array is not full.",
      "Arrays are easy to use and implement, making them suitable for simple tasks."
    ],
    applications: [
      "Storing a list of items, such as student records or product details.",
      "Implementing stacks and queues.",
      "Representing matrices and tables.",
      "Performing lookups and searches.",
      "Implementing sorting algorithms."
    ],
    vivaQuestions: [
      {
        question: "What is the difference between an array and a linked list?",
        answer: "An array is a contiguous block of memory, while a linked list is a collection of nodes that are not necessarily contiguous. Arrays offer O(1) access time, while linked lists require O(n) time to access an element. Linked lists are more flexible in terms of insertion and deletion, while arrays require shifting elements."
      },
      {
        question: "What is the time complexity of inserting an element at the beginning of an array?",
        answer: "Inserting an element at the beginning of an array requires shifting all existing elements one position to the right, resulting in a time complexity of O(n), where n is the number of elements in the array."
      },
      {
        question: "What are the advantages of using arrays over other data structures?",
        answer: "Arrays offer direct access to elements via their index, providing O(1) access time. They are also memory efficient due to their contiguous memory allocation. Arrays are easy to use and implement, making them suitable for simple tasks."
      },
      {
        question: "How can you improve the efficiency of inserting and deleting elements in an array?",
        answer: "To improve the efficiency of inserting and deleting elements in an array, you can use techniques such as dynamic arrays, which automatically resize when needed. You can also use linked lists, which offer more flexible insertion and deletion operations."
      }
    ]
  },
  {
    id: 3,
    title: "Stack Operations",
    description: "Write a program to perform operations on stack (Push, Pop, Display).",
    code: `#include <stdio.h>
#include <stdlib.h>
#define MAX 10

// Structure to represent stack
struct Stack {
    int items[MAX];
    int top;
};

// Initialize stack
void initStack(struct Stack *s) {
    s->top = -1;
}

// Check if the stack is full
int isFull(struct Stack *s) {
    if (s->top == MAX - 1)
        return 1;
    else
        return 0;
}

// Check if the stack is empty
int isEmpty(struct Stack *s) {
    if (s->top == -1)
        return 1;
    else
        return 0;
}

// Add element to stack
void push(struct Stack *s, int newItem) {
    if (isFull(s)) {
        printf("Stack is full!\\n");
    } else {
        s->top++;
        s->items[s->top] = newItem;
        printf("%d pushed to stack\\n", newItem);
    }
}

// Remove element from stack
int pop(struct Stack *s) {
    if (isEmpty(s)) {
        printf("Stack is empty!\\n");
        return -1;
    } else {
        int poppedItem = s->items[s->top];
        s->top--;
        printf("%d popped from stack\\n", poppedItem);
        return poppedItem;
    }
}

// Print elements of stack
void displayStack(struct Stack *s) {
    if (isEmpty(s)) {
        printf("Stack is empty!\\n");
    } else {
        printf("Stack elements: ");
        for (int i = 0; i <= s->top; i++) {
            printf("%d ", s->items[i]);
        }
        printf("\\n");
    }
}

// Main function to test stack operations
int main() {
    struct Stack stack;
    initStack(&stack);
    
    // Push elements
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    
    displayStack(&stack);
    
    // Pop elements
    pop(&stack);
    
    displayStack(&stack);
    
    push(&stack, 40);
    displayStack(&stack);
    
    return 0;
}`,
    explanation: "A stack is a linear data structure that follows the LIFO (Last In First Out) principle. This program implements a stack with its basic operations: push (adds an element), pop (removes the most recently added element), and display (shows all elements in the stack).",
    output: `10 pushed to stack
20 pushed to stack
30 pushed to stack
Stack elements: 10 20 30 
30 popped from stack
Stack elements: 10 20 
40 pushed to stack
Stack elements: 10 20 40`,
  },
  {
    id: 4,
    title: "Queue Operations",
    description: "Write a program to perform various operations on queue (Enqueue, Dequeue, Display).",
    code: `#include <stdio.h>
#include <stdlib.h>
#define MAX 5

// Structure to represent queue
struct Queue {
    int items[MAX];
    int front;
    int rear;
};

// Initialize queue
void initQueue(struct Queue *q) {
    q->front = -1;
    q->rear = -1;
}

// Check if the queue is full
int isFull(struct Queue *q) {
    if ((q->front == 0 && q->rear == MAX - 1) || (q->front == q->rear + 1))
        return 1;
    return 0;
}

// Check if the queue is empty
int isEmpty(struct Queue *q) {
    if (q->front == -1)
        return 1;
    return 0;
}

// Add element to queue
void enqueue(struct Queue *q, int value) {
    if (isFull(q)) {
        printf("Queue is full!\\n");
    } else {
        if (q->front == -1)
            q->front = 0;
        q->rear = (q->rear + 1) % MAX;
        q->items[q->rear] = value;
        printf("%d enqueued to queue\\n", value);
    }
}

// Remove element from queue
int dequeue(struct Queue *q) {
    int item;
    if (isEmpty(q)) {
        printf("Queue is empty!\\n");
        return -1;
    } else {
        item = q->items[q->front];
        if (q->front == q->rear) {
            // Only one element in queue
            q->front = -1;
            q->rear = -1;
        } else {
            q->front = (q->front + 1) % MAX;
        }
        printf("%d dequeued from queue\\n", item);
        return item;
    }
}

// Display queue elements
void displayQueue(struct Queue *q) {
    int i;
    if (isEmpty(q)) {
        printf("Queue is empty!\\n");
    } else {
        printf("Queue elements: ");
        i = q->front;
        while (1) {
            printf("%d ", q->items[i]);
            if (i == q->rear)
                break;
            i = (i + 1) % MAX;
        }
        printf("\\n");
    }
}

// Main function to test queue operations
int main() {
    struct Queue queue;
    initQueue(&queue);
    
    // Enqueue elements
    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);
    
    displayQueue(&queue);
    
    // Dequeue elements
    dequeue(&queue);
    
    displayQueue(&queue);
    
    // Enqueue more elements
    enqueue(&queue, 40);
    enqueue(&queue, 50);
    
    displayQueue(&queue);
    
    return 0;
}`,
    explanation: "A queue is a linear data structure that follows the FIFO (First In First Out) principle. This program implements a circular queue with its basic operations: enqueue (adds an element to the rear), dequeue (removes an element from the front), and display (shows all elements in the queue).",
    output: `10 enqueued to queue
20 enqueued to queue
30 enqueued to queue
Queue elements: 10 20 30 
10 dequeued from queue
Queue elements: 20 30 
40 enqueued to queue
50 enqueued to queue
Queue elements: 20 30 40 50`,
  },
  {
    id: 5,
    title: "Tower of Hanoi",
    description: "Write a program to implement Tower of Hanoi problem.",
    code: `#include <stdio.h>

void towerOfHanoi(int n, char from_rod, char to_rod, char aux_rod) {
    if (n == 1) {
        printf("Move disk 1 from rod %c to rod %c\\n", from_rod, to_rod);
        return;
    }
    towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
    printf("Move disk %d from rod %c to rod %c\\n", n, from_rod, to_rod);
    towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}

int main() {
    int n = 3; // Number of disks
    towerOfHanoi(n, 'A', 'C', 'B');
    return 0;
}`,
    explanation: "The Tower of Hanoi is a classic problem in computer science and mathematics. The objective is to move an entire stack of disks from one rod to another, with the constraint that only one disk can be moved at a time and no disk may be placed on top of a smaller disk. This problem demonstrates the power of recursion for solving complex problems.",
    output: `Move disk 1 from rod A to rod C
Move disk 2 from rod A to rod B
Move disk 1 from rod C to rod B
Move disk 3 from rod A to rod C
Move disk 1 from rod B to rod A
Move disk 2 from rod B to rod C
Move disk 1 from rod A to rod C`,
  },
  {
    id: 6,
    title: "Binary Search",
    description: "Write a program to search a particular data from given array of numbers using binary search method.",
    code: `#include <stdio.h>

// A recursive binary search function
int binarySearch(int arr[], int l, int r, int x) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        
        // If the element is present at the middle itself
        if (arr[mid] == x)
            return mid;
        
        // If element is smaller than mid, then it can only
        // be present in left subarray
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
        
        // Else the element can only be present in right subarray
        return binarySearch(arr, mid + 1, r, x);
    }
    
    // Element is not present in array
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 10;
    int result = binarySearch(arr, 0, n - 1, x);
    
    if (result == -1)
        printf("Element is not present in array\\n");
    else
        printf("Element is present at index %d\\n", result);
    
    x = 5;
    result = binarySearch(arr, 0, n - 1, x);
    
    if (result == -1)
        printf("Element is not present in array\\n");
    else
        printf("Element is present at index %d\\n", result);
        
    return 0;
}`,
    explanation: "Binary search is an efficient algorithm for finding an item from a sorted array. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, the search continues in the lower half; otherwise, in the upper half. This process continues until the value is found or the interval is empty.",
    output: `Element is present at index 3
Element is not present in array`,
  },
  {
    id: 7,
    title: "Multiplication Using Recursion",
    description: "Write a program to multiply two numbers using recursion.",
    code: `#include <stdio.h>

// Function to multiply two numbers using recursion
int multiply(int a, int b) {
    // Base case
    if (b == 0)
        return 0;
    
    // If b is positive, add a to the result of multiply(a, b-1)
    if (b > 0)
        return a + multiply(a, b - 1);
    
    // If b is negative, negate a and negate b
    return -multiply(a, -b);
}

int main() {
    int a = 5, b = 3;
    printf("%d * %d = %d\\n", a, b, multiply(a, b));
    
    a = 7;
    b = -2;
    printf("%d * %d = %d\\n", a, b, multiply(a, b));
    
    return 0;
}`,
    explanation: "This program demonstrates how to multiply two numbers using recursion instead of the multiplication operator (*). The idea is to add the first number to itself the second number of times. For example, 5 * 3 can be calculated as 5 + 5 + 5 = 15. The program handles negative numbers by using the property that a * (-b) = -(a * b).",
    output: `5 * 3 = 15
7 * -2 = -14`,
  },
  {
    id: 8,
    title: "Insertion Sort",
    description: "Write a program to sort an array of numbers using insertion sort method.",
    code: `#include <stdio.h>

// Function to implement insertion sort
void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        
        // Move elements of arr[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

// Function to print an array
void printArray(int arr[], int n) {
    int i;
    for (i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

// Main function to test insertion sort
int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    printArray(arr, n);
    
    insertionSort(arr, n);
    
    printf("Sorted array: ");
    printArray(arr, n);
    
    return 0;
}`,
    explanation: "Insertion sort is a simple sorting algorithm that works by building a sorted array one element at a time. It takes elements from the unsorted part of the array and inserts them at the correct position in the sorted part of the array. This algorithm is efficient for small data sets or nearly sorted arrays.",
    output: `Original array: 12 11 13 5 6 
Sorted array: 5 6 11 12 13`,
  }
];
