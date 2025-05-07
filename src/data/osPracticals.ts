
export interface OSPractical {
  id: number;
  title: string;
  description: string;
  aim: string;
  facilities: string;
  theory: string;
  code?: string;
  output?: string;
  conclusion: string;
  vivaQuestions?: {
    question: string;
    answer: string;
  }[];
}

export const osPracticals: OSPractical[] = [
  {
    id: 1,
    title: "Study of Various Linux Distributions",
    description: "Learn about different Linux distributions and their characteristics.",
    aim: "To study and analyze different Linux distributions, their features, and differences.",
    facilities: "Different Linux distributions (Kali, Arch, Red Hat, Manjaro, Fedora, Black Arch)",
    theory: `Linux is an open-source operating system kernel that serves as the foundation for numerous operating systems, known as Linux distributions or "distros." Each distribution builds upon the Linux kernel, adding different software packages, default configurations, and management tools.

Key Linux distributions covered in this practical:

1. **Kali Linux**: Security-focused distribution designed for digital forensics and penetration testing. It comes with hundreds of pre-installed security tools.

2. **Arch Linux**: Lightweight, flexible distribution following a rolling-release model. Known for its simplicity, modularity, and up-to-date software repository.

3. **Red Hat Enterprise Linux (RHEL)**: Commercial distribution designed for enterprise environments, known for its stability, security, and long-term support.

4. **Manjaro**: User-friendly Arch-based distribution that combines Arch's power with ease of use. Features a simplified installation process and curated software updates.

5. **Fedora**: Community-driven distribution sponsored by Red Hat. Serves as a testing ground for technologies that may later appear in RHEL. Known for its cutting-edge features.

6. **Black Arch**: Security-focused distribution based on Arch Linux, similar to Kali but with over 2300 security tools available.

These distributions differ in package management systems, release cycles, default desktop environments, target audiences, and philosophies.`,
    conclusion: "Different Linux distributions serve different purposes and user needs. Kali and Black Arch are specialized for security professionals, Arch and Manjaro appeal to users who want customization and cutting-edge software, while Red Hat and Fedora focus on stability and enterprise features. Understanding these differences helps users choose the most appropriate distribution for their specific requirements.",
    vivaQuestions: [
      {
        question: "What is a Linux distribution?",
        answer: "A Linux distribution (or distro) is an operating system based on the Linux kernel and often includes a package management system. Different distributions include different software packages and configurations to serve various purposes and user preferences."
      },
      {
        question: "Compare Arch Linux and Fedora.",
        answer: "Arch Linux is a rolling-release distribution focused on simplicity, minimalism, and user control, requiring more technical knowledge. Fedora is a fixed-release distribution sponsored by Red Hat, focusing on the latest open-source technologies while being more user-friendly and comes with more pre-configured software."
      },
      {
        question: "Why would someone use Kali Linux over a general-purpose distribution?",
        answer: "Kali Linux is specialized for security tasks like penetration testing and digital forensics. It comes with hundreds of pre-installed security tools and configurations optimized for security professionals, making it more efficient for these specific use cases compared to configuring these tools on a general-purpose distribution."
      },
      {
        question: "What is a package manager and how do they differ between distributions?",
        answer: "A package manager is a tool that automates the process of installing, updating, and removing software. Different distributions use different package managers: Debian-based systems (like Kali) use APT, Red Hat-based systems use DNF/YUM, Arch-based systems use Pacman, etc. They differ in syntax, dependency resolution algorithms, and repository structures."
      },
      {
        question: "Explain the concept of a rolling release versus a fixed release model.",
        answer: "In a rolling release model (used by Arch and Manjaro), updates are continuously released as they become available, keeping the system always up-to-date with the latest software versions. In a fixed release model (used by Red Hat and traditional Ubuntu), major updates are bundled together and released periodically (e.g., every 6 months or 2 years), providing more stability but potentially older software."
      }
    ]
  },
  {
    id: 2,
    title: "Study of Basic Linux Commands",
    description: "Learn and practice essential Linux commands for system navigation and management.",
    aim: "To study and master basic Linux commands for effective system administration and usage.",
    facilities: "Linux terminal, command-line interface",
    theory: `Linux commands are text-based instructions used to interact with the operating system through a terminal or command-line interface. Understanding these commands is essential for effective system management and usage.

Key categories of Linux commands:

1. **File System Navigation**:
   - \`pwd\`: Print working directory
   - \`ls\`: List directory contents
   - \`cd\`: Change directory
   - \`mkdir\`: Make directory
   - \`rmdir\`: Remove directory
   
2. **File Operations**:
   - \`touch\`: Create empty file
   - \`cp\`: Copy files/directories
   - \`mv\`: Move/rename files/directories
   - \`rm\`: Remove files/directories
   
3. **File Content Operations**:
   - \`cat\`: Concatenate and display file content
   - \`head\`: Display beginning of file
   - \`tail\`: Display end of file
   - \`grep\`: Search text patterns in files
   
4. **User Management**:
   - \`whoami\`: Display current user
   - \`passwd\`: Change password
   - \`su\`: Switch user
   - \`sudo\`: Execute command as superuser
   
5. **System Information**:
   - \`uname\`: Display system information
   - \`df\`: Display disk space usage
   - \`free\`: Display memory usage
   - \`top\`: Display running processes
   
6. **Permission Management**:
   - \`chmod\`: Change file permissions
   - \`chown\`: Change file owner
   - \`chgrp\`: Change group ownership

These commands can be combined with various options (flags) to modify their behavior and used together with pipes (\`|\`) to create complex operations.`,
    conclusion: "Mastering basic Linux commands provides users with the ability to effectively navigate, manage, and control their Linux systems. These commands form the foundation of Linux system administration and are essential skills for any Linux user. Regular practice and exploration of command options enhance proficiency and enable more advanced system operations.",
    vivaQuestions: [
      {
        question: "What is the difference between absolute and relative paths in Linux?",
        answer: "An absolute path begins with a forward slash (/) and specifies the exact location of a file or directory from the root directory. A relative path specifies the location relative to the current working directory and does not begin with a forward slash."
      },
      {
        question: "Explain the purpose of the chmod command and its numerical notation.",
        answer: "The chmod command changes file permissions. Its numerical notation uses three digits to represent permissions for owner, group, and others respectively. Each digit is a sum of: 4 (read), 2 (write), and 1 (execute). For example, chmod 755 gives read-write-execute permissions to the owner and read-execute permissions to group and others."
      },
      {
        question: "What is piping in Linux and how is it used?",
        answer: "Piping (|) in Linux is used to send the output of one command as input to another command. For example, 'ls -l | grep \"file\"' lists all files and directories, then filters the results to only show lines containing the word 'file'."
      },
      {
        question: "Explain the difference between 'grep', 'find', and 'locate' commands.",
        answer: "grep is used to search for patterns within file contents; find searches for files and directories in a specified location based on various criteria like name, size, or modification time; locate searches for files by name using a pre-built database which makes it faster but potentially less up-to-date than find."
      },
      {
        question: "What are file redirections in Linux and how are they used?",
        answer: "File redirections control where input comes from and where output goes. The > operator redirects output to a file (overwriting it), >> appends output to a file, < redirects input from a file, and 2> redirects error messages. For example, 'command > output.txt' sends the command's output to the file output.txt instead of the terminal."
      }
    ]
  },
  {
    id: 3,
    title: "Shell Scripting in Linux",
    description: "Learn how to write and execute shell scripts for automating tasks.",
    aim: "To study shell scripting in Linux operating system and automate common tasks.",
    facilities: "Linux terminal, text editor, shell environment (Bash)",
    theory: `Shell scripting involves writing a series of commands for the shell to execute. Bash (Bourne Again SHell) is the most common shell used in Linux systems. Shell scripts are powerful tools for automating repetitive tasks and system administration.

Key concepts in shell scripting:

1. **Basic Structure**:
   - Script begins with shebang: \`#!/bin/bash\`
   - Commands are executed sequentially
   - Comments start with #
   
2. **Variables**:
   - Declaration: \`variable_name=value\` (no spaces around =)
   - Access: \`$variable_name\` or \
   - Special variables: \`$0\` (script name), \`$1, $2, ...\` (arguments), \`$#\` (number of arguments), \`$@\` (all arguments)
   
3. **Control Structures**:
   - Conditionals: \`if\`, \`elif\`, \`else\`, \`case\`
   - Loops: \`for\`, \`while\`, \`until\`
   - Example:
     \`\`\`bash
     if [ $a -eq $b ]; then
         echo "a equals b"
     else
         echo "a is not equal to b"
     fi
     \`\`\`
   
4. **Functions**:
   - Declaration: \`function_name() { commands; }\`
   - Calling: \`function_name arguments\`
   - Return values via exit status or echo
   
5. **Input/Output**:
   - User input: \`read variable_name\`
   - Output: \`echo\`, \`printf\`
   - File operations: redirection operators (\`>\`, \`>>\`, \`<\`)
   
6. **Error Handling**:
   - Exit codes: \`$?\` (0 means success, non-zero means error)
   - \`exit\` command to terminate script with specified status
   - \`trap\` command to catch signals

Common applications include file manipulation, system monitoring, automated backups, batch processing, and system initialization.`,
    code: `#!/bin/bash
# Simple shell script demonstration

# Variables
greeting="Hello"
user=$(whoami)

# Function definition
print_system_info() {
    echo "System Information:"
    echo "-------------------"
    echo "Hostname: $(hostname)"
    echo "Kernel: $(uname -r)"
    echo "Uptime: $(uptime -p)"
}

# Main script
echo "$greeting, $user! Today is $(date +%A), $(date +%B' '%d', '%Y)"
echo ""

# Conditional statement
hour=$(date +%H)
if [ $hour -lt 12 ]; then
    echo "Good morning!"
elif [ $hour -lt 18 ]; then
    echo "Good afternoon!"
else
    echo "Good evening!"
fi

echo ""
print_system_info

echo ""
echo "Directory listing of current location:"
ls -l

# Exit with success status
exit 0
`,
    output: `Hello, user! Today is Monday, May 06, 2025

Good morning!

System Information:
-------------------
Hostname: linux-workstation
Kernel: 5.15.0-generic
Uptime: up 3 days, 7 hours, 45 minutes

Directory listing of current location:
total 28
drwxr-xr-x 2 user user 4096 May 06 09:15 Documents
drwxr-xr-x 2 user user 4096 May 06 09:15 Downloads
drwxr-xr-x 2 user user 4096 May 06 09:15 Pictures
-rw-r--r-- 1 user user  512 May 06 09:15 script.sh
`,
    conclusion: "Shell scripting is a powerful tool for Linux users and system administrators. It allows automation of repetitive tasks, complex system administration, and creation of custom tools. Learning shell scripting enhances productivity and provides deeper understanding of the Linux operating system. With practice, users can develop increasingly sophisticated scripts to handle a wide range of tasks, from simple file operations to complex system management.",
    vivaQuestions: [
      {
        question: "What is the significance of the shebang line in a shell script?",
        answer: "The shebang line (#!/bin/bash) at the beginning of a script specifies the interpreter that should be used to execute the script. It tells the system which shell or program to use when running the script, ensuring it's interpreted correctly even if the user's default shell is different."
      },
      {
        question: "Explain the difference between single quotes (') and double quotes (\") in shell scripting.",
        answer: "Single quotes preserve the literal value of each character within them, preventing variable expansion or command substitution. Double quotes allow variable expansion, command substitution, and backslash escaping while preserving spaces. For example, '$var' prints the literal string '$var', while \"$var\" prints the value of the variable var."
      },
      {
        question: "How do you make a shell script executable?",
        answer: "To make a shell script executable, use the chmod command to add execute permission: chmod +x script.sh. This allows the script to be run directly using ./script.sh instead of having to explicitly invoke the interpreter like 'bash script.sh'."
      },
      {
        question: "What is the difference between environment variables and shell variables?",
        answer: "Shell variables are local to the current shell instance and are not passed to child processes. Environment variables are available to the current shell and all its child processes. To convert a shell variable to an environment variable, use the export command: 'export VAR_NAME'."
      },
      {
        question: "Explain the concept of exit status in shell scripting and its importance.",
        answer: "The exit status is a numerical value returned by a command or script indicating whether it succeeded (0) or failed (non-zero). It's stored in the $? special variable and is crucial for error handling and control flow in scripts. By checking the exit status, scripts can make decisions based on whether previous commands succeeded or failed."
      }
    ]
  },
  {
    id: 4,
    title: "Process Creation in Linux",
    description: "Learn how to create and manage processes in Linux using C programming.",
    aim: "To write a program demonstrating process creation in Linux using fork() system call.",
    facilities: "Linux system with GCC compiler, terminal",
    theory: `A process is an instance of a program in execution. Process creation in Linux is primarily done using the fork() system call, which creates a child process that is an exact copy of the parent process.

Key concepts in process creation:

1. **fork() System Call**:
   - Creates a new process by duplicating the calling process
   - Returns the child's PID to the parent
   - Returns 0 to the child process
   - Returns -1 if the creation fails
   
2. **Process Identifiers (PID)**:
   - Each process has a unique ID
   - getpid() returns the process ID of the calling process
   - getppid() returns the parent's process ID
   
3. **Process Relationship**:
   - After fork(), parent and child execute independently
   - They run the same program but can take different paths based on fork()'s return value
   - They share open files at the time of fork()
   
4. **Process Termination**:
   - Processes can terminate normally using exit()
   - Parent can wait for child's termination using wait() or waitpid()

5. **Orphan and Zombie Processes**:
   - Orphan: Parent terminates before child
   - Zombie: Child terminates but parent hasn't waited for it

Understanding process creation is fundamental to operating systems concepts and multi-process programming.`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t pid;
    int status;
    
    printf("Parent process started. PID: %d\\n", getpid());
    
    // Create a new process
    pid = fork();
    
    if (pid < 0) { // Error occurred
        fprintf(stderr, "Fork failed!\\n");
        return 1;
    } 
    else if (pid == 0) { // Child process
        printf("Child process running. PID: %d, Parent PID: %d\\n", 
               getpid(), getppid());
        
        // Child performs some work
        printf("Child is working...\\n");
        sleep(2); // Simulate work with sleep
        printf("Child process completed its task\\n");
        
        exit(0); // Child terminates
    } 
    else { // Parent process
        printf("Parent process continuing. Child PID: %d\\n", pid);
        
        // Parent waits for child to terminate
        printf("Parent is waiting for child to terminate...\\n");
        wait(&status); // Wait for child to terminate
        
        if (WIFEXITED(status)) {
            printf("Child exited with status: %d\\n", WEXITSTATUS(status));
        } else {
            printf("Child did not exit normally\\n");
        }
        
        printf("Parent process is terminating\\n");
    }
    
    return 0;
}`,
    output: `Parent process started. PID: 12345
Parent process continuing. Child PID: 12346
Parent is waiting for child to terminate...
Child process running. PID: 12346, Parent PID: 12345
Child is working...
Child process completed its task
Child exited with status: 0
Parent process is terminating`,
    conclusion: "Process creation using the fork() system call is fundamental to Unix/Linux operating systems. It allows for concurrent execution of tasks through multiple processes. This practical demonstrates how a parent process creates a child process, how they execute independently, and how the parent can wait for the child's termination. Understanding these concepts is crucial for system programming, especially for developing multi-process applications.",
    vivaQuestions: [
      {
        question: "What is the difference between a process and a thread?",
        answer: "A process is an independent program in execution with its own memory space, file descriptors, and process ID. Threads are lightweight processes that exist within a process, sharing the same memory space and resources. Processes are isolated from each other while threads within the same process can directly communicate through shared memory."
      },
      {
        question: "What happens when the fork() system call is executed?",
        answer: "When fork() is executed, it creates a new process by duplicating the calling process. The new child process is an exact copy of the parent process, including code, data, heap, and stack. After fork(), both processes execute the same code, but can be distinguished by the return value of fork(): the parent receives the child's PID while the child receives 0."
      },
      {
        question: "Explain what a zombie process is and how it can be prevented.",
        answer: "A zombie process is a process that has terminated but its parent hasn't read its exit status using wait() or waitpid(). It remains in the process table consuming minimal resources. Zombies can be prevented by having the parent process call wait() or waitpid() to collect the exit status of terminated children, or by using signal handlers with SIGCHLD to be notified when children terminate."
      },
      {
        question: "What is the purpose of the wait() system call?",
        answer: "The wait() system call suspends execution of the calling process until one of its child processes terminates. It allows the parent process to collect the exit status of the child, prevents zombie processes, and enables synchronization between parent and child processes. It's essential for proper resource cleanup and process management."
      },
      {
        question: "What is an orphan process and what happens to it in Linux?",
        answer: "An orphan process is a process whose parent process has terminated before it. In Linux, orphan processes are adopted by the init process (PID 1), which automatically reaps them when they terminate. This prevents orphans from becoming zombies permanently, as init periodically calls wait() for its adopted children."
      }
    ]
  },
  {
    id: 5,
    title: "Multithreading in Linux",
    description: "Learn to implement multithreading in C using POSIX threads.",
    aim: "To write a program that demonstrates multithreading using POSIX threads in Linux.",
    facilities: "Linux system with GCC compiler, POSIX thread library (pthread)",
    theory: `Multithreading allows a program to perform multiple operations concurrently within the same process. In Linux, POSIX threads (pthreads) provide a standardized interface for creating and managing threads.

Key concepts in multithreading:

1. **Thread Creation**:
   - pthread_create() creates a new thread
   - Each thread has its own stack but shares the global memory of the process
   
2. **Thread Synchronization**:
   - Ensures proper coordination between threads
   - Mechanisms include:
     - Mutexes: Control access to shared resources
     - Condition variables: Allow threads to wait for specific conditions
     - Semaphores: Control access to a fixed number of resources
   
3. **Thread Termination**:
   - pthread_exit() terminates the calling thread
   - pthread_join() waits for a specific thread to terminate
   
4. **Thread Attributes**:
   - Control thread behavior (stack size, scheduling, etc.)
   - Set using pthread_attr_init() and related functions

5. **Thread Safety**:
   - Ensures functions can be called simultaneously from multiple threads
   - Prevents race conditions and data corruption

Multithreading is commonly used for:
- Improving application performance on multi-core processors
- Handling multiple client connections in server applications
- Performing background operations without freezing the user interface
- Processing large data sets in parallel`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

#define NUM_THREADS 5

// Mutex for protecting shared data
pthread_mutex_t mutex;

// Shared counter
int shared_counter = 0;

// Thread function
void* thread_function(void* arg) {
    long thread_id = (long)arg;
    
    printf("Thread %ld starting...\\n", thread_id);
    
    // Simulate some work
    sleep(1);
    
    // Lock the mutex before accessing shared data
    pthread_mutex_lock(&mutex);
    
    // Critical section
    shared_counter++;
    printf("Thread %ld incrementing counter to %d\\n", thread_id, shared_counter);
    
    // Unlock the mutex
    pthread_mutex_unlock(&mutex);
    
    printf("Thread %ld finished\\n", thread_id);
    
    pthread_exit(NULL);
}

int main() {
    pthread_t threads[NUM_THREADS];
    int ret;
    long i;
    
    // Initialize mutex
    pthread_mutex_init(&mutex, NULL);
    
    printf("Main thread starting...\\n");
    
    // Create threads
    for(i = 0; i < NUM_THREADS; i++) {
        printf("Creating thread %ld\\n", i);
        ret = pthread_create(&threads[i], NULL, thread_function, (void*)i);
        
        if(ret) {
            printf("ERROR: pthread_create() returned %d\\n", ret);
            exit(EXIT_FAILURE);
        }
    }
    
    // Wait for all threads to complete
    for(i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
        printf("Thread %ld has been joined\\n", i);
    }
    
    // Clean up
    pthread_mutex_destroy(&mutex);
    
    printf("Final counter value: %d\\n", shared_counter);
    printf("Main thread exiting...\\n");
    
    return 0;
}`,
    output: `Main thread starting...
Creating thread 0
Creating thread 1
Creating thread 2
Creating thread 3
Creating thread 4
Thread 0 starting...
Thread 1 starting...
Thread 2 starting...
Thread 3 starting...
Thread 4 starting...
Thread 0 incrementing counter to 1
Thread 0 finished
Thread 0 has been joined
Thread 2 incrementing counter to 2
Thread 2 finished
Thread 1 incrementing counter to 3
Thread 1 finished
Thread 4 incrementing counter to 4
Thread 4 finished
Thread 3 incrementing counter to 5
Thread 3 finished
Thread 1 has been joined
Thread 2 has been joined
Thread 3 has been joined
Thread 4 has been joined
Final counter value: 5
Main thread exiting...`,
    conclusion: "Multithreading enables concurrent execution within a single process, allowing for improved performance and responsiveness. This practical demonstrates the creation and synchronization of threads using POSIX threads in Linux. The use of mutexes ensures that shared data is accessed safely without race conditions. Understanding multithreading concepts is essential for developing efficient applications that can leverage multi-core processors and handle concurrent operations effectively.",
    vivaQuestions: [
      {
        question: "What is the difference between multithreading and multiprocessing?",
        answer: "Multithreading involves multiple threads executing within the same process, sharing the same memory space and resources, with lower overhead for creation and context switching. Multiprocessing involves multiple processes executing independently with separate memory spaces and resources, providing better isolation but higher overhead. Threads communicate through shared memory while processes typically communicate through IPC mechanisms."
      },
      {
        question: "What are race conditions and how can they be prevented?",
        answer: "Race conditions occur when multiple threads access shared data simultaneously and at least one thread modifies the data, potentially causing unpredictable results. They can be prevented using synchronization mechanisms like mutexes, semaphores, or condition variables that ensure only one thread can access shared data at a time, ensuring data consistency."
      },
      {
        question: "Explain the purpose of pthread_join() function.",
        answer: "pthread_join() suspends execution of the calling thread until the target thread terminates. It serves three main purposes: synchronizing thread execution (ensuring a thread completes before proceeding), collecting the thread's return value, and releasing resources allocated for the thread (preventing memory leaks)."
      },
      {
        question: "What is a deadlock and how can it be avoided in multithreaded applications?",
        answer: "A deadlock occurs when two or more threads are blocked forever, each waiting for resources held by another. Deadlocks can be avoided by: (1) ordering mutex locks consistently, (2) using pthread_mutex_trylock() instead of pthread_mutex_lock(), (3) implementing timeouts on lock attempts, (4) detecting and recovering from deadlocks, or (5) designing the program to prevent circular wait conditions."
      },
      {
        question: "What is thread safety and why is it important?",
        answer: "Thread safety is the property of code that functions correctly during simultaneous execution by multiple threads. It's important because multithreaded programs with non-thread-safe code can experience data corruption, race conditions, and unpredictable behavior. Thread safety is achieved through techniques like using synchronization primitives, thread-local storage, atomic operations, or immutable objects."
      }
    ]
  },
  {
    id: 6,
    title: "FCFS CPU Scheduling Algorithm",
    description: "Implement First-Come, First-Served (FCFS) CPU scheduling algorithm.",
    aim: "To write a program implementing the First-Come, First-Served CPU scheduling algorithm.",
    facilities: "Linux system with GCC compiler",
    theory: `First-Come, First-Served (FCFS) is the simplest CPU scheduling algorithm. As the name suggests, processes are executed in the order they arrive in the ready queue.

Key characteristics of FCFS scheduling:

1. **Non-preemptive**: Once a process begins executing, it continues until it either completes or blocks for I/O.

2. **Implementation**: Typically implemented using a FIFO queue where new processes are added to the tail and the CPU takes processes from the head.

3. **Performance Metrics**:
   - **Waiting Time**: Time a process waits in the ready queue
   - **Turnaround Time**: Total time from submission to completion
   - **Response Time**: Time from submission to first response
   
4. **Advantages**:
   - Simple to understand and implement
   - Fair in the sense that processes are executed in the order they arrive
   
5. **Disadvantages**:
   - Can lead to the "convoy effect" where short processes wait behind long processes
   - Not optimal for interactive systems due to potentially long average waiting times
   - Favors CPU-bound processes over I/O-bound processes

6. **Analysis**:
   - Average waiting time depends on the arrival order and burst times
   - Performance is generally poor for workloads with varying burst times

FCFS is often used as a baseline for comparing other scheduling algorithms and may be combined with other techniques in practical systems.`,
    code: `#include <stdio.h>
#include <stdlib.h>

// Process structure
struct Process {
    int pid;          // Process ID
    int arrival_time; // Arrival time
    int burst_time;   // CPU burst time
    int waiting_time; // Waiting time
    int turnaround_time; // Turnaround time
    int completion_time; // Completion time
};

// Function to sort processes by arrival time
void sort_by_arrival_time(struct Process processes[], int n) {
    struct Process temp;
    int i, j;
    
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (processes[j].arrival_time > processes[j + 1].arrival_time) {
                temp = processes[j];
                processes[j] = processes[j + 1];
                processes[j + 1] = temp;
            }
        }
    }
}

// Function to calculate waiting time and turnaround time
void calculate_times(struct Process processes[], int n) {
    int i;
    int current_time = 0;
    
    for (i = 0; i < n; i++) {
        // If current time is less than arrival time, CPU remains idle
        if (current_time < processes[i].arrival_time) {
            current_time = processes[i].arrival_time;
        }
        
        // Calculate waiting time
        processes[i].waiting_time = current_time - processes[i].arrival_time;
        
        // Update current time after process execution
        current_time += processes[i].burst_time;
        
        // Calculate completion time
        processes[i].completion_time = current_time;
        
        // Calculate turnaround time
        processes[i].turnaround_time = processes[i].completion_time - processes[i].arrival_time;
    }
}

// Function to print results
void print_results(struct Process processes[], int n) {
    int i;
    float total_waiting_time = 0, total_turnaround_time = 0;
    
    printf("\\nProcess Execution Order:\\n");
    printf("+-------+--------------+------------+--------------+-----------------+----------------+\\n");
    printf("| PID   | Arrival Time | Burst Time | Waiting Time | Turnaround Time | Completion Time|\\n");
    printf("+-------+--------------+------------+--------------+-----------------+----------------+\\n");
    
    for (i = 0; i < n; i++) {
        printf("| %-5d | %-12d | %-10d | %-12d | %-15d | %-14d |\\n", 
               processes[i].pid,
               processes[i].arrival_time,
               processes[i].burst_time,
               processes[i].waiting_time,
               processes[i].turnaround_time,
               processes[i].completion_time);
               
        total_waiting_time += processes[i].waiting_time;
        total_turnaround_time += processes[i].turnaround_time;
    }
    
    printf("+-------+--------------+------------+--------------+-----------------+----------------+\\n");
    printf("\\nAverage Waiting Time: %.2f\\n", total_waiting_time / n);
    printf("Average Turnaround Time: %.2f\\n", total_turnaround_time / n);
}

int main() {
    int n, i;
    
    printf("Enter the number of processes: ");
    scanf("%d", &n);
    
    struct Process* processes = malloc(n * sizeof(struct Process));
    
    if (processes == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    printf("\\nEnter process details:\\n");
    for (i = 0; i < n; i++) {
        processes[i].pid = i + 1;
        
        printf("\\nFor Process P%d:\\n", i + 1);
        printf("Arrival Time: ");
        scanf("%d", &processes[i].arrival_time);
        printf("Burst Time: ");
        scanf("%d", &processes[i].burst_time);
    }
    
    // Sort processes based on arrival time
    sort_by_arrival_time(processes, n);
    
    // Calculate waiting time and turnaround time
    calculate_times(processes, n);
    
    // Print results
    print_results(processes, n);
    
    free(processes);
    return 0;
}`,
    output: `Enter the number of processes: 4

Enter process details:

For Process P1:
Arrival Time: 0
Burst Time: 5

For Process P2:
Arrival Time: 1
Burst Time: 3

For Process P3:
Arrival Time: 2
Burst Time: 8

For Process P4:
Arrival Time: 3
Burst Time: 2

Process Execution Order:
+-------+--------------+------------+--------------+-----------------+----------------+
| PID   | Arrival Time | Burst Time | Waiting Time | Turnaround Time | Completion Time|
+-------+--------------+------------+--------------+-----------------+----------------+
| 1     | 0            | 5          | 0            | 5               | 5              |
| 2     | 1            | 3          | 4            | 7               | 8              |
| 3     | 2            | 8          | 6            | 14              | 16             |
| 4     | 3            | 2          | 13           | 15              | 18             |
+-------+--------------+------------+--------------+-----------------+----------------+

Average Waiting Time: 5.75
Average Turnaround Time: 10.25`,
    conclusion: "The First-Come, First-Served (FCFS) CPU scheduling algorithm is straightforward to implement but may not always provide optimal performance. This practical demonstrates how FCFS works by processing tasks in order of arrival. The implementation calculates key performance metrics like waiting time, turnaround time, and completion time for each process. While FCFS ensures fairness in terms of arrival order, it often results in longer average waiting times compared to other scheduling algorithms, especially when processes with longer burst times arrive before shorter ones.",
    vivaQuestions: [
      {
        question: "What is the convoy effect in FCFS scheduling?",
        answer: "The convoy effect occurs when a long process blocks many short processes behind it in the queue. This happens because FCFS is non-preemptive, meaning a CPU-intensive process will make all other processes wait until it completes, resulting in poor average waiting and turnaround times. It's similar to being stuck behind a slow-moving vehicle on a single-lane road."
      },
      {
        question: "Compare FCFS with SJF (Shortest Job First) scheduling algorithm.",
        answer: "FCFS executes processes in arrival order without considering burst time, while SJF selects the process with the shortest burst time next. FCFS is simple and prevents starvation but may lead to poor average waiting times due to the convoy effect. SJF minimizes average waiting time and is optimal in this regard but may cause starvation of longer processes. FCFS is non-preemptive, while SJF can be either preemptive or non-preemptive."
      },
      {
        question: "How does the arrival pattern of processes affect FCFS performance?",
        answer: "In FCFS, the performance highly depends on the arrival pattern. If processes with shorter burst times arrive before longer ones, FCFS performs well. However, if processes with longer burst times arrive first, it leads to the convoy effect and poor performance. Random arrival patterns typically result in suboptimal performance compared to other scheduling algorithms like SJF or Round Robin."
      },
      {
        question: "What are the key performance metrics for CPU scheduling algorithms and why are they important?",
        answer: "Key metrics include: (1) CPU utilization - percentage of time CPU is busy; (2) Throughput - number of processes completed per time unit; (3) Turnaround time - total time from submission to completion; (4) Waiting time - time spent in ready queue; (5) Response time - time from submission to first response. These metrics help evaluate and compare scheduling algorithms based on system goals like maximizing throughput or minimizing response time for interactive systems."
      },
      {
        question: "Is FCFS a preemptive or non-preemptive scheduling algorithm, and what implications does this have?",
        answer: "FCFS is a non-preemptive scheduling algorithm, meaning once a process starts execution, it continues until it completes or blocks for I/O. This has several implications: (1) It's simpler to implement; (2) It provides predictable behavior; (3) It can lead to poor response times for short processes that arrive after long ones; (4) It's unsuitable for time-sharing systems where quick response times are important; (5) It can cause inefficient CPU utilization if processes block for I/O frequently."
      }
    ]
  },
  {
    id: 7,
    title: "SJF CPU Scheduling Algorithm",
    description: "Implement Shortest Job First (SJF) CPU scheduling algorithm.",
    aim: "To write a program implementing the Shortest Job First (SJF) CPU scheduling algorithm.",
    facilities: "Linux system with GCC compiler",
    theory: `Shortest Job First (SJF) is a CPU scheduling algorithm that selects the process with the smallest execution time next. It can be implemented in both preemptive and non-preemptive variants.

Key characteristics of SJF scheduling:

1. **Types**:
   - **Non-preemptive SJF**: Once a process begins executing, it continues until completion
   - **Preemptive SJF** (also known as Shortest Remaining Time First or SRTF): If a new process arrives with a shorter burst time than the remaining time of the current process, the current process is preempted

2. **Optimality**:
   - Provably optimal in terms of average waiting time when all processes are available simultaneously
   - Gives minimum average waiting time for a given set of processes
   
3. **Implementation Challenges**:
   - Requires knowledge of process burst times in advance, which is typically not available
   - Often estimated based on past behavior or heuristics
   
4. **Advantages**:
   - Minimizes average waiting time
   - Favors short processes, improving system throughput
   - Reduces average turnaround time
   
5. **Disadvantages**:
   - May lead to starvation of longer processes if shorter processes continually arrive
   - Requires prediction of CPU burst times
   - Not always practical due to the inability to know burst times in advance

6. **Analysis**:
   - Performance depends on the accuracy of burst time estimates
   - Generally outperforms FCFS in terms of average waiting time

In this practical, we'll implement the non-preemptive version of SJF.`,
    code: `#include <stdio.h>
#include <stdlib.h>

// Process structure
struct Process {
    int pid;          // Process ID
    int arrival_time; // Arrival time
    int burst_time;   // CPU burst time
    int waiting_time; // Waiting time
    int turnaround_time; // Turnaround time
    int completion_time; // Completion time
    int remaining_time; // Remaining burst time
    int is_completed;   // Flag for process completion
};

// Function to find the process with shortest burst time among available processes
int find_shortest_job(struct Process processes[], int n, int current_time) {
    int shortest_job_index = -1;
    int min_burst_time = 9999; // A large value
    
    for (int i = 0; i < n; i++) {
        if (processes[i].arrival_time <= current_time && !processes[i].is_completed) {
            if (processes[i].burst_time < min_burst_time) {
                min_burst_time = processes[i].burst_time;
                shortest_job_index = i;
            }
            // If burst times are equal, choose the process with earlier arrival
            else if (processes[i].burst_time == min_burst_time && 
                     processes[i].arrival_time < processes[shortest_job_index].arrival_time) {
                shortest_job_index = i;
            }
        }
    }
    
    return shortest_job_index;
}

// Function to calculate times using non-preemptive SJF
void calculate_times_sjf(struct Process processes[], int n) {
    int completed = 0;
    int current_time = 0;
    int i;
    
    // Initialize remaining time and completion flag
    for (i = 0; i < n; i++) {
        processes[i].remaining_time = processes[i].burst_time;
        processes[i].is_completed = 0;
    }
    
    // Continue until all processes are completed
    while (completed < n) {
        // Find the process with shortest burst time that has arrived
        int shortest_job_index = find_shortest_job(processes, n, current_time);
        
        // If no process is available at current time, advance time
        if (shortest_job_index == -1) {
            current_time++;
            continue;
        }
        
        // Process the selected job
        struct Process* p = &processes[shortest_job_index];
        
        // Update current time and process status
        p->waiting_time = current_time - p->arrival_time;
        current_time += p->burst_time;
        p->completion_time = current_time;
        p->turnaround_time = p->completion_time - p->arrival_time;
        p->is_completed = 1;
        completed++;
    }
}

// Function to print results
void print_results(struct Process processes[], int n) {
    int i;
    float total_waiting_time = 0, total_turnaround_time = 0;
    
    // Sort processes by PID for display
    struct Process temp;
    for (i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (processes[j].pid > processes[j + 1].pid) {
                temp = processes[j];
                processes[j] = processes[j + 1];
                processes[j + 1] = temp;
            }
        }
    }
    
    printf("\\nProcess Details with SJF Scheduling:\\n");
    printf("+-------+--------------+------------+--------------+-----------------+----------------+\\n");
    printf("| PID   | Arrival Time | Burst Time | Waiting Time | Turnaround Time | Completion Time|\\n");
    printf("+-------+--------------+------------+--------------+-----------------+----------------+\\n");
    
    for (i = 0; i < n; i++) {
        printf("| %-5d | %-12d | %-10d | %-12d | %-15d | %-14d |\\n", 
               processes[i].pid,
               processes[i].arrival_time,
               processes[i].burst_time,
               processes[i].waiting_time,
               processes[i].turnaround_time,
               processes[i].completion_time);
               
        total_waiting_time += processes[i].waiting_time;
        total_turnaround_time += processes[i].turnaround_time;
    }
    
    printf("+-------+--------------+------------+--------------+-----------------+----------------+\\n");
    printf("\\nAverage Waiting Time: %.2f\\n", total_waiting_time / n);
    printf("Average Turnaround Time: %.2f\\n", total_turnaround_time / n);
}

// Function to print the execution order
void print_execution_order(struct Process processes[], int n) {
    // Create a copy of processes and sort by completion time
    struct Process* sorted_processes = malloc(n * sizeof(struct Process));
    for (int i = 0; i < n; i++) {
        sorted_processes[i] = processes[i];
    }
    
    // Sort by completion time (which represents execution order)
    struct Process temp;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (sorted_processes[j].completion_time - sorted_processes[j].burst_time > 
                sorted_processes[j + 1].completion_time - sorted_processes[j + 1].burst_time) {
                temp = sorted_processes[j];
                sorted_processes[j] = sorted_processes[j + 1];
                sorted_processes[j + 1] = temp;
            }
        }
    }
    
    printf("\\nExecution Order: ");
    for (int i = 0; i < n; i++) {
        printf("P%d ", sorted_processes[i].pid);
        if (i < n - 1) printf("→ ");
    }
    printf("\\n");
    
    free(sorted_processes);
}

int main() {
    int n, i;
    
    printf("Enter the number of processes: ");
    scanf("%d", &n);
    
    struct Process* processes = malloc(n * sizeof(struct Process));
    
    if (processes == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    printf("\\nEnter process details:\\n");
    for (i = 0; i < n; i++) {
        processes[i].pid = i + 1;
        
        printf("\\nFor Process P%d:\\n", i + 1);
        printf("Arrival Time: ");
        scanf("%d", &processes[i].arrival_time);
        printf("Burst Time: ");
        scanf("%d", &processes[i].burst_time);
    }
    
    // Calculate waiting time and turnaround time using SJF
    calculate_times_sjf(processes, n);
    
    // Print results
    print_results(processes, n);
    
    // Print execution order
    print_execution_order(processes, n);
    
    free(processes);
    return 0;
}`,
    output: `Enter the number of processes: 4

Enter process details:

For Process P1:
Arrival Time: 0
Burst Time: 6

For Process P2:
Arrival Time: 1
Burst Time: 3

For Process P3:
Arrival Time: 2
Burst Time: 8

For Process P4:
Arrival Time: 3
Burst Time: 2

Process Details with SJF Scheduling:
+-------+--------------+------------+--------------+-----------------+----------------+
| PID   | Arrival Time | Burst Time | Waiting Time | Turnaround Time | Completion Time|
+-------+--------------+------------+--------------+-----------------+----------------+
| 1     | 0            | 6          | 0            | 6               | 6              |
| 2     | 1            | 3          | 8            | 11              | 12             |
| 3     | 2            | 8          | 12           | 20              | 22             |
| 4     | 3            | 2          | 6            | 8               | 11             |
+-------+--------------+------------+--------------+-----------------+----------------+

Average Waiting Time: 6.50
Average Turnaround Time: 11.25

Execution Order: P1 → P4 → P2 → P3`,
    conclusion: "The Shortest Job First (SJF) scheduling algorithm prioritizes processes with the shortest burst times, which leads to lower average waiting time compared to FCFS. This implementation demonstrates the non-preemptive version of SJF, where once a process begins execution, it continues until completion. While SJF is theoretically optimal for minimizing average waiting time, it requires knowledge of process burst times in advance, which is typically not available in real systems. In practice, SJF is often approximated using historical data or predictions. The algorithm can also lead to starvation of longer processes if shorter processes continuously arrive.",
    vivaQuestions: [
      {
        question: "What is the difference between preemptive and non-preemptive SJF?",
        answer: "In non-preemptive SJF, once a process begins execution, it continues until completion without interruption. In preemptive SJF (also called Shortest Remaining Time First or SRTF), if a new process arrives with a burst time shorter than the remaining time of the current process, the current process is preempted and the new process is scheduled. Preemptive SJF can achieve lower average waiting times but introduces more context switching overhead."
      },
      {
        question: "Why is SJF considered optimal for minimizing average waiting time?",
        answer: "SJF minimizes average waiting time because it prioritizes shorter jobs, which reduces the waiting time for multiple processes. Mathematically, it can be proven that for a given set of processes with known burst times, no other scheduling algorithm can achieve a lower average waiting time than SJF. This is because when shorter jobs execute first, they contribute less to the total waiting time of all processes in the system."
      },
      {
        question: "What is the main practical limitation of implementing SJF in real operating systems?",
        answer: "The main practical limitation is that SJF requires advance knowledge of each process's burst time, which is typically not available. Operating systems don't know how long a process will run before it completes. In practice, systems implementing SJF-like scheduling use predictive techniques based on past behavior (exponential averaging) to estimate future burst times, leading to approximations rather than true SJF."
      },
      {
        question: "How does SJF handle the starvation problem and what solutions exist for this issue?",
        answer: "SJF can cause starvation of processes with longer burst times if shorter processes continuously arrive. This happens because SJF always prioritizes shorter jobs regardless of how long other processes have been waiting. Solutions include: (1) Aging - gradually increasing priority of waiting processes; (2) Hybrid approaches like Round Robin with priorities; (3) Combined algorithms like High-Response-Ratio-Next (HRRN) that consider both service time and waiting time when scheduling."
      },
      {
        question: "Compare the performance of FCFS and SJF in terms of average waiting time and explain when FCFS might perform better than SJF.",
        answer: "SJF generally provides lower average waiting time than FCFS because it minimizes the waiting time by executing shorter jobs first. However, FCFS might perform better in specific scenarios: (1) When processes arrive in order of increasing burst time (shortest first); (2) When all processes have similar burst times, making the scheduling decision less consequential; (3) In systems where fairness based on arrival order is more important than minimizing waiting time; (4) When the overhead of estimating burst times for SJF exceeds the benefits."
      }
    ]
  },
  {
    id: 8,
    title: "First Fit Memory Allocation Algorithm",
    description: "Implement First Fit continuous memory allocation algorithm.",
    aim: "To write a program implementing the First Fit memory allocation algorithm.",
    facilities: "Linux system with GCC compiler",
    theory: `Memory allocation is a crucial aspect of operating systems, determining how memory is assigned to processes. The First Fit algorithm is one of the simplest memory allocation techniques.

Key concepts in First Fit memory allocation:

1. **Algorithm Approach**:
   - Allocates the first available memory block that is large enough to accommodate the requested memory size
   - Searches memory blocks from the beginning of the memory space
   - Does not attempt to find a better fit even if one exists later in memory
   
2. **Memory Management**:
   - Memory is divided into blocks of varying sizes
   - Free blocks are tracked in a list or table
   - When memory is allocated, blocks may be split
   - When memory is deallocated, adjacent free blocks may be merged (coalescing)
   
3. **Advantages**:
   - Simple to implement
   - Fast allocation time since it allocates the first suitable block
   - Reasonable performance for many applications
   
4. **Disadvantages**:
   - Can lead to external fragmentation
   - May not utilize memory space efficiently
   - Tends to fill up the beginning of memory with small blocks (creating a "splinter region")

5. **External Fragmentation**:
   - Occurs when free memory exists but is divided into small, non-contiguous blocks
   - Total free memory may be sufficient but not contiguous for large allocations
   
6. **Comparison**:
   - First Fit: Fastest allocation, moderate fragmentation
   - Best Fit: Better space utilization but slower allocation
   - Worst Fit: Attempts to leave largest possible leftover fragments but higher search time

The First Fit algorithm is commonly used in memory management systems due to its simplicity and reasonable efficiency.`,
    code: `#include <stdio.h>
#include <stdlib.h>

#define MEMORY_SIZE 1000 // Total memory size

// Structure to represent memory blocks
struct MemoryBlock {
    int id;          // Process ID (0 means free block)
    int size;        // Size of the block
    int start_addr;  // Starting address
    int allocated;   // 0 for free, 1 for allocated
};

// Function to initialize memory with one big free block
void initialize_memory(struct MemoryBlock memory[], int *count) {
    memory[0].id = 0;
    memory[0].size = MEMORY_SIZE;
    memory[0].start_addr = 0;
    memory[0].allocated = 0;
    *count = 1;
}

// Function to display the current state of memory
void display_memory(struct MemoryBlock memory[], int count) {
    printf("\\nCurrent Memory State:\\n");
    printf("+-------+--------+---------------+--------+------------+\\n");
    printf("| Block | Status | Starting Addr | Size   | Ending Addr|\\n");
    printf("+-------+--------+---------------+--------+------------+\\n");
    
    for (int i = 0; i < count; i++) {
        printf("| %-5d | %-6s | %-13d | %-6d | %-10d |\\n", 
               i+1,
               memory[i].allocated ? "Used" : "Free",
               memory[i].start_addr,
               memory[i].size,
               memory[i].start_addr + memory[i].size - 1);
    }
    printf("+-------+--------+---------------+--------+------------+\\n");
    
    // Calculate and display fragmentation
    int total_free = 0, free_blocks = 0;
    for (int i = 0; i < count; i++) {
        if (!memory[i].allocated) {
            total_free += memory[i].size;
            free_blocks++;
        }
    }
    
    printf("Total Free Memory: %d units\\n", total_free);
    printf("Number of Free Blocks: %d\\n", free_blocks);
    if (free_blocks > 1) {
        printf("External Fragmentation: Yes (memory split across %d blocks)\\n", free_blocks);
    } else {
        printf("External Fragmentation: No\\n");
    }
}

// First Fit memory allocation algorithm
int first_fit_allocate(struct MemoryBlock memory[], int *count, int process_id, int requested_size) {
    int i, j;
    
    // Search for the first free block that is big enough
    for (i = 0; i < *count; i++) {
        if (!memory[i].allocated && memory[i].size >= requested_size) {
            // If the block is exactly the size we need
            if (memory[i].size == requested_size) {
                memory[i].allocated = 1;
                memory[i].id = process_id;
                return memory[i].start_addr;
            } 
            // If the block is larger than we need, split it
            else {
                // Make space for the new block by shifting elements
                for (j = *count; j > i + 1; j--) {
                    memory[j] = memory[j - 1];
                }
                
                // Create a new free block with remaining space
                memory[i + 1].id = 0;
                memory[i + 1].size = memory[i].size - requested_size;
                memory[i + 1].start_addr = memory[i].start_addr + requested_size;
                memory[i + 1].allocated = 0;
                
                // Update the original block
                memory[i].id = process_id;
                memory[i].size = requested_size;
                memory[i].allocated = 1;
                
                (*count)++;
                return memory[i].start_addr;
            }
        }
    }
    
    // No suitable block found
    return -1;
}

// Function to deallocate memory
void deallocate(struct MemoryBlock memory[], int *count, int process_id) {
    int i;
    
    // Find the block with the given process ID
    for (i = 0; i < *count; i++) {
        if (memory[i].allocated && memory[i].id == process_id) {
            // Mark the block as free
            memory[i].allocated = 0;
            memory[i].id = 0;
            
            // Merge with the next block if it's free
            if (i < *count - 1 && !memory[i + 1].allocated) {
                memory[i].size += memory[i + 1].size;
                
                // Remove the next block by shifting elements
                for (int j = i + 1; j < *count - 1; j++) {
                    memory[j] = memory[j + 1];
                }
                (*count)--;
            }
            
            // Merge with the previous block if it's free
            if (i > 0 && !memory[i - 1].allocated) {
                memory[i - 1].size += memory[i].size;
                
                // Remove this block by shifting elements
                for (int j = i; j < *count - 1; j++) {
                    memory[j] = memory[j + 1];
                }
                (*count)--;
            }
            
            printf("Process P%d memory deallocated successfully.\\n", process_id);
            return;
        }
    }
    
    printf("Error: Process P%d not found in memory.\\n", process_id);
}

int main() {
    struct MemoryBlock memory[100]; // Array to represent memory blocks
    int count = 0; // Number of memory blocks
    int choice, process_id, size, result;
    
    // Initialize memory
    initialize_memory(memory, &count);
    printf("Memory initialized with size %d units.\\n", MEMORY_SIZE);
    
    while (1) {
        printf("\\nMemory Allocation Menu:\\n");
        printf("1. Allocate memory (First Fit)\\n");
        printf("2. Deallocate memory\\n");
        printf("3. Display memory state\\n");
        printf("4. Exit\\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter process ID: ");
                scanf("%d", &process_id);
                printf("Enter memory size required: ");
                scanf("%d", &size);
                
                result = first_fit_allocate(memory, &count, process_id, size);
                if (result != -1) {
                    printf("Memory allocated for Process P%d at address %d\\n", process_id, result);
                } else {
                    printf("Memory allocation failed for Process P%d! No suitable block found.\\n", process_id);
                }
                break;
                
            case 2:
                printf("Enter process ID to deallocate: ");
                scanf("%d", &process_id);
                deallocate(memory, &count, process_id);
                break;
                
            case 3:
                display_memory(memory, count);
                break;
                
            case 4:
                printf("Exiting program.\\n");
                exit(0);
                
            default:
                printf("Invalid choice! Please try again.\\n");
        }
    }
    
    return 0;
}`,
    output: `Memory initialized with size 1000 units.

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 3

Current Memory State:
+-------+--------+---------------+--------+------------+
| Block | Status | Starting Addr | Size   | Ending Addr|
+-------+--------+---------------+--------+------------+
| 1     | Free   | 0             | 1000   | 999        |
+-------+--------+---------------+--------+------------+
Total Free Memory: 1000 units
Number of Free Blocks: 1
External Fragmentation: No

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 1
Enter process ID: 1
Enter memory size required: 200
Memory allocated for Process P1 at address 0

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 1
Enter process ID: 2
Enter memory size required: 300
Memory allocated for Process P2 at address 200

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 1
Enter process ID: 3
Enter memory size required: 150
Memory allocated for Process P3 at address 500

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 3

Current Memory State:
+-------+--------+---------------+--------+------------+
| Block | Status | Starting Addr | Size   | Ending Addr|
+-------+--------+---------------+--------+------------+
| 1     | Used   | 0             | 200    | 199        |
| 2     | Used   | 200           | 300    | 499        |
| 3     | Used   | 500           | 150    | 649        |
| 4     | Free   | 650           | 350    | 999        |
+-------+--------+---------------+--------+------------+
Total Free Memory: 350 units
Number of Free Blocks: 1
External Fragmentation: No

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 2
Enter process ID to deallocate: 2
Process P2 memory deallocated successfully.

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 3

Current Memory State:
+-------+--------+---------------+--------+------------+
| Block | Status | Starting Addr | Size   | Ending Addr|
+-------+--------+---------------+--------+------------+
| 1     | Used   | 0             | 200    | 199        |
| 2     | Free   | 200           | 300    | 499        |
| 3     | Used   | 500           | 150    | 649        |
| 4     | Free   | 650           | 350    | 999        |
+-------+--------+---------------+--------+------------+
Total Free Memory: 650 units
Number of Free Blocks: 2
External Fragmentation: Yes (memory split across 2 blocks)

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 1
Enter process ID: 4
Enter memory size required: 200
Memory allocated for Process P4 at address 200

Memory Allocation Menu:
1. Allocate memory (First Fit)
2. Deallocate memory
3. Display memory state
4. Exit
Enter your choice: 4
Exiting program.`,
    conclusion: "The First Fit memory allocation algorithm provides a simple and efficient method for allocating memory blocks to processes. It allocates the first available block that is large enough to satisfy the request, splitting blocks when necessary. While it offers fast allocation times and is easy to implement, it can lead to external fragmentation over time as memory becomes divided into smaller, non-contiguous blocks. This practical demonstrates the implementation of First Fit, showing how memory blocks are allocated, deallocated, and potentially merged when adjacent blocks become free. Understanding memory allocation algorithms is essential for operating system design and efficient resource management.",
    vivaQuestions: [
      {
        question: "What is external fragmentation and how does First Fit contribute to it?",
        answer: "External fragmentation occurs when free memory exists in small, scattered blocks throughout the memory space, making it difficult to allocate large contiguous chunks despite having enough total free memory. First Fit contributes to this by allocating the first suitable block it finds, which tends to fragment the beginning of memory with small allocations, leaving larger free blocks toward the end. Over time, as processes are allocated and deallocated, the memory becomes increasingly fragmented."
      },
      {
        question: "Compare First Fit, Best Fit, and Worst Fit memory allocation algorithms.",
        answer: "First Fit allocates the first block that's large enough, offering faster allocation but moderate fragmentation. Best Fit allocates the smallest block that fits the request, minimizing wasted space but potentially creating many tiny unusable fragments and requiring a full search of memory. Worst Fit allocates the largest available block, trying to leave fragments large enough to be useful but often leading to a lack of large blocks over time. First Fit typically offers the best balance of performance and fragmentation management."
      },
      {
        question: "What is memory coalescing and why is it important?",
        answer: "Memory coalescing (or compaction) is the process of merging adjacent free memory blocks into a single larger block when memory is deallocated. It's important because it combats fragmentation by creating larger contiguous memory areas that can accommodate future allocations, especially larger ones. Without coalescing, memory would become increasingly fragmented over time, leading to allocation failures even when the total free memory is sufficient."
      },
      {
        question: "How can the performance of First Fit algorithm be improved?",
        answer: "First Fit performance can be improved by: (1) Maintaining separate lists for free and allocated blocks to avoid scanning allocated blocks; (2) Using a circular search, starting each new search where the previous one ended; (3) Implementing a binary search tree or other data structure for faster block location; (4) Periodically defragmenting memory by relocating allocated blocks; (5) Using size classes or buddy systems for common allocation sizes; (6) Implementing a cache of recently freed blocks for quick reallocation."
      },
      {
        question: "What are the limitations of continuous memory allocation and how do modern operating systems address them?",
        answer: "Limitations include: external fragmentation, required contiguity for allocations, inefficient memory utilization, and complex memory management. Modern operating systems address these by using virtual memory with paging/segmentation, which divides physical memory into fixed-size frames and logical memory into pages. This allows non-contiguous physical allocation while presenting contiguous logical address spaces to processes, eliminating external fragmentation and simplifying memory management through page tables and translation lookaside buffers (TLBs)."
      }
    ]
  }
];
