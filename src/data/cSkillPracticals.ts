export interface CSkillPractical {
    id: number;
    title: string;
    description: string;
    aim: string;
    facilities: string;
    scope?: string;
    theory?: string;
    code?: string; // This will now contain GitHub links instead of full code
    conclusion?: string;
    vivaQuestions?: {
      question: string;
      answer: string;
    }[];
  }
  
  export const cSkillPracticals: CSkillPractical[] = [
    {
      id: 1,
      title: "Basic Fundamentals of Web Development",
      description: "Learn the core concepts of web development including HTML, CSS, and JavaScript.",
      aim: "To study the basic fundamentals of web development and understand the structure of websites.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Understanding the building blocks of web development and their interaction.",
      theory: `Web development involves creating and maintaining websites. It encompasses several technologies:
  1. **HTML (HyperText Markup Language)**:
  - The standard markup language for creating web pages
  - Defines the structure of web content
  - Uses elements represented by tags to structure content
  2. **CSS (Cascading Style Sheets)**:
  - Style sheet language used for describing the presentation of a document
  - Controls layout, colors, fonts, and overall appearance
  - Separates content (HTML) from presentation
  3. **JavaScript**:
  - Programming language that enables interactive web pages
  - Client-side scripting language executed by the browser
  - Adds dynamic behavior to static HTML pages
  4. **Web Development Process**:
  - Planning: Define goals, target audience, and content requirements
  - Design: Create wireframes, mockups, and visual design
  - Development: Write code, integrate content, implement functionality
  - Testing: Debug, fix issues, ensure cross-browser compatibility
  - Deployment: Publish the website on a web server
  - Maintenance: Update content, fix bugs, add new features`,
      code: "GitHub: https://github.com/username/web-fundamentals",
      conclusion: "Web development is a multidisciplinary field that combines various technologies to create interactive and functional websites. Understanding the fundamentals of HTML, CSS, and JavaScript provides a solid foundation for building modern web applications."
    },
    {
      id: 2,
      title: "Text Level Tags and List Tags in HTML",
      description: "Learn how to use various text formatting tags and list tags in HTML.",
      aim: "To design a webpage using text level tags and list tags in HTML.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Creating web content with proper structure and formatting.",
      theory: `HTML provides various text-level tags for formatting and structuring content:
  
  1. **Basic Text Formatting Tags**:
     - \`<p>\`: Defines a paragraph
     - \`<h1>\` to \`<h6>\`: Headings of different importance
     - \`<br>\`: Line break
     - \`<hr>\`: Horizontal rule (line)
  
  2. **Text Emphasis and Formatting**:
     - \`<strong>\` or \`<b>\`: Bold text
     - \`<em>\` or \`<i>\`: Italic text
     - \`<mark>\`: Highlighted text
     - \`<u>\`: Underlined text
     - \`<s>\`: Strikethrough text
     - \`<small>\`: Smaller text
     - \`<sub>\`: Subscript
     - \`<sup>\`: Superscript
  
  3. **List Tags**:
     - **Unordered Lists**:
       - \`<ul>\`: Defines an unordered (bulleted) list
       - \`<li>\`: List item
     - **Ordered Lists**:
       - \`<ol>\`: Defines an ordered (numbered) list
       - \`<li>\`: List item
     - **Description Lists**:
       - \`<dl>\`: Description list
       - \`<dt>\`: Description term
       - \`<dd>\`: Description detail
  
  4. **Semantic Text Elements**:
     - \`<blockquote>\`: Block quotation
     - \`<q>\`: Inline quotation
     - \`<cite>\`: Citation
     - \`<code>\`: Computer code
     - \`<pre>\`: Preformatted text
     - \`<abbr>\`: Abbreviation
  
  Using these tags properly helps create semantically correct HTML documents that improve accessibility, SEO, and document structure.`,
      code: "GitHub: https://github.com/username/html-text-and-lists",
      conclusion: "Text level tags and list tags are fundamental HTML elements that provide structure and formatting to web content. Proper use of these tags improves readability and organization of information on web pages."
    },
    {
      id: 3,
      title: "Class Timetable Using Table Tag",
      description: "Create a class timetable using HTML table tags.",
      aim: "To create a class timetable using HTML table tags.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Understanding table structure and using HTML tables for data presentation.",
      theory: `HTML tables are used to organize data in rows and columns, making them perfect for displaying structured information like timetables.
  
  1. **Basic Table Structure**:
     - \`<table>\`: Defines a table
     - \`<tr>\`: Table row
     - \`<th>\`: Table header cell
     - \`<td>\`: Table data cell
  
  2. **Table Sections**:
     - \`<thead>\`: Groups header content
     - \`<tbody>\`: Groups body content
     - \`<tfoot>\`: Groups footer content
     - \`<caption>\`: Provides a title for the table
  
  3. **Table Attributes and Styling**:
     - \`colspan\`: Allows cells to span multiple columns
     - \`rowspan\`: Allows cells to span multiple rows
     - CSS properties: \`border-collapse\`, \`border-spacing\`, etc.
  
  4. **Accessibility Considerations**:
     - Use appropriate headers for data cells
     - Include a caption or summary
     - Avoid using tables for layout purposes
  
  5. **Responsive Tables**:
     - Challenges with tables on small screens
     - Techniques: horizontal scrolling, stacking, etc.
  
  Tables are particularly useful for displaying tabular data like timetables, schedules, comparison charts, and other structured information.`,
      code: "GitHub: https://github.com/username/html-timetable",
      conclusion: "HTML tables are effective for displaying structured data like timetables. Using CSS with tables enhances readability and visual appeal."
    },
    {
      id: 4,
      title: "Resume Using HTML and CSS",
      description: "Create a professional resume using HTML tags and CSS styling.",
      aim: "To create a resume using HTML tags and CSS, and experiment with colors, text, links, and sizes.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Applying HTML and CSS concepts to create structured and visually appealing documents.",
      theory: `Creating a resume with HTML and CSS involves combining document structure with visual styling:
  
  1. **HTML Structure for Resume**:
     - \`<header>\`: For name, title, and contact information
     - \`<section>\`: For different resume sections (education, experience, skills)
     - \`<h1>\`, \`<h2>\`, \`<h3>\`: For headings and sub-headings
     - \`<p>\`: For descriptive text
     - \`<ul>\` and \`<li>\`: For listing skills or achievements
     - \`<a>\`: For email, phone, or profile links
  
  2. **CSS Styling Elements**:
     - Typography: font-family, font-size, line-height, font-weight
     - Colors: background-color, color, border-color
     - Layout: display, position, margin, padding, width, height
     - Visual effects: box-shadow, border-radius
     - Print styling: @media print
  
  3. **Resume Design Principles**:
     - Hierarchy: Clearly differentiate sections and emphasize important information
     - Consistency: Maintain consistent styling for similar elements
     - Whitespace: Use appropriate spacing for readability
     - Responsive design: Ensure the resume looks good on different devices
     - Printability: Format for both screen viewing and printing
  
  4. **Organization Tips**:
     - Use CSS classes for repeated styling
     - Separate content from presentation
     - Consider using CSS flexbox or grid for layout
     - Use semantic HTML to improve document structure`,
      code: "GitHub: https://github.com/username/html-css-resume",
      conclusion: "Creating a resume with HTML and CSS demonstrates the practical application of web technologies for document formatting and styling. This exercise helps understand how to structure content with HTML and style it with CSS for professional presentation."
    },
    {
      id: 5,
      title: "Registration Form with Internal CSS",
      description: "Create a registration form using various HTML form elements and internal CSS.",
      aim: "To create a registration form using textboxes, textareas, checkboxes, radio buttons, select boxes, etc. with internal CSS.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Understanding HTML form elements and styling forms with CSS.",
      theory: `HTML forms are essential for collecting user input on websites. Combined with CSS styling, they can create effective and user-friendly registration interfaces:
  
  1. **Basic Form Structure**:
     - \`<form>\`: Container for form elements
     - \`action\` attribute: Specifies where to send form data
     - \`method\` attribute: Specifies HTTP method (GET or POST)
  
  2. **Form Controls**:
     - \`<input>\`: Creates various input fields based on the 'type' attribute
       - \`type="text"\`: Single-line text input
       - \`type="password"\`: Password field
       - \`type="email"\`: Email input
       - \`type="tel"\`: Telephone input
       - \`type="number"\`: Numeric input
       - \`type="checkbox"\`: Checkboxes
       - \`type="radio"\`: Radio buttons
       - \`type="date"\`: Date picker
       - \`type="file"\`: File upload
       - \`type="submit"\`: Submit button
       - \`type="reset"\`: Reset button
     - \`<textarea>\`: Multi-line text input
     - \`<select>\` and \`<option>\`: Dropdown lists
     - \`<button>\`: Clickable button
  
  3. **Form Organization**:
     - \`<label>\`: Associates text with form elements
     - \`<fieldset>\` and \`<legend>\`: Groups related form elements
     - \`placeholder\` attribute: Provides hints
     - \`required\` attribute: Makes fields mandatory
  
  4. **CSS Styling for Forms**:
     - Form layout: width, margin, padding
     - Input styling: border, border-radius, background
     - Focus states: :focus pseudo-class
     - Validation styling: :valid and :invalid pseudo-classes
     - Responsive design for different screen sizes
  
  5. **Accessibility Considerations**:
     - Proper labeling of form controls
     - Clear error messages
     - Logical tab order
     - Appropriate color contrast`,
      code: "GitHub: https://github.com/username/registration-form",
      conclusion: "Creating registration forms with HTML and CSS demonstrates the practical application of form elements and styling. This exercise helps understand form validation, user input collection, and creating user-friendly interfaces."
    },
    {
      id: 6,
      title: "College Website with Internal CSS",
      description: "Design a web page for a college with descriptions of courses, departments, faculties, and library.",
      aim: "To design a web page for a college containing descriptions of courses, departments, faculties, library, etc. using internal CSS.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Creating a multi-section webpage with consistent styling and navigation.",
      theory: `Designing a college website involves creating a structured, informative, and visually appealing platform:
  
  1. **Website Structure**:
     - Header: Logo, navigation menu, search functionality
     - Hero section: Featured image or slideshow with welcome message
     - Content sections: About, Courses, Departments, Faculty, Library
     - Footer: Contact information, quick links, social media
  
  2. **CSS Organization with Internal CSS**:
     - Internal CSS is defined within the \`<style>\` tag in the HTML document's \`<head>\`
     - Benefits: Self-contained HTML file, no external dependencies
     - Considerations: Not reusable across multiple pages, potential maintenance challenges for larger sites
  
  3. **Design Elements**:
     - Color scheme: Often reflects college branding
     - Typography: Clear hierarchy for headings and body text
     - Navigation: Intuitive menu structure
     - Consistency: Unified styling across all sections
     - Whitespace: Proper spacing for readability
  
  4. **Content Organization**:
     - Courses section: List of programs with brief descriptions
     - Departments section: Academic divisions with their specialties
     - Faculty section: Staff profiles with credentials
     - Library section: Resources and facilities available
  
  5. **Responsive Considerations**:
     - Flexible layouts: Adapt to different screen sizes
     - Media queries: Apply different styles based on device characteristics
     - Mobile navigation: Often simplified for smaller screens
  
  6. **Technical Implementation**:
     - Semantic HTML: Using appropriate tags for content structure
     - CSS selectors: Element, class, and ID selectors
     - Box model: Managing content dimensions and spacing
     - Layout techniques: Flexbox or Grid for complex arrangements`,
      code: "GitHub: https://github.com/username/college-website",
      conclusion: "This project demonstrates how to create a comprehensive college website with multiple sections using HTML and internal CSS. It showcases layout organization, navigation design, and responsive elements that adapt to different screen sizes."
    },
    {
      id: 7,
      title: "JavaScript Program to Display Today's Date",
      description: "Create a JavaScript program that displays the current date in various formats.",
      aim: "To develop a JavaScript program to display today's date in different formats.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Understanding JavaScript Date object and date formatting.",
      theory: `JavaScript provides a built-in Date object for working with dates and times:
  
  1. **Creating Date Objects**:
     - \`new Date()\`: Current date and time
     - \`new Date(year, month, day, hours, minutes, seconds, milliseconds)\`: Specific date and time
     - \`new Date(milliseconds)\`: Time elapsed since January 1, 1970
     - \`new Date(dateString)\`: From date string
  
  2. **Key Date Methods**:
     - **Getting Date Components**:
       - \`getFullYear()\`: Get the year (4 digits)
       - \`getMonth()\`: Get the month (0-11, where 0 is January)
       - \`getDate()\`: Get the day of month (1-31)
       - \`getDay()\`: Get the day of week (0-6, where 0 is Sunday)
       - \`getHours()\`, \`getMinutes()\`, \`getSeconds()\`, \`getMilliseconds()\`
     - **Setting Date Components**:
       - \`setFullYear()\`, \`setMonth()\`, \`setDate()\`, etc.
     - **Date String Representations**:
       - \`toString()\`: Standard string representation
       - \`toDateString()\`: Date portion only
       - \`toTimeString()\`: Time portion only
       - \`toLocaleString()\`: Locale-specific format
       - \`toLocaleDateString()\`: Locale-specific date
       - \`toLocaleTimeString()\`: Locale-specific time
  
  3. **Date Formatting Techniques**:
     - Using string concatenation or template literals
     - Custom formatting with individual components
     - Padding numbers with leading zeros
     - Creating arrays for month and day names
     - Using Intl.DateTimeFormat for locale-specific formatting
  
  4. **Working with Time Zones**:
     - \`getTimezoneOffset()\`: Minutes between local and UTC
     - UTC methods: \`getUTCHours()\`, \`getUTCMinutes()\`, etc.
  
  5. **Date Calculations**:
     - Adding or subtracting time using milliseconds
     - Calculating differences between dates
     - Determining elapsed time
  
  The Date object is essential for applications that need to display time information, schedule events, calculate durations, or track time-sensitive operations.`,
      code: "GitHub: https://github.com/username/js-date-display",
      conclusion: "This JavaScript program demonstrates how to use the Date object to obtain and display the current date and time in various formats. It shows different methods for formatting dates and times, which is essential for many web applications that need to present temporal data."
    },
    {
      id: 8,
      title: "JavaScript Simple Calculator",
      description: "Create a simple calculator using JavaScript to perform basic operations.",
      aim: "To develop a JavaScript program to design a simple calculator that performs addition, subtraction, multiplication, and division operations.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Understanding JavaScript event handling, DOM manipulation, and arithmetic operations.",
      theory: `Building a JavaScript calculator involves several key concepts in web development:
  
  1. **User Interface (HTML & CSS)**:
     - Calculator layout: Display area and buttons
     - Numeric keypad: 0-9 and decimal point
     - Operation buttons: +, -, *, /, etc.
     - Control buttons: Clear, equals, backspace
  
  2. **DOM Manipulation with JavaScript**:
     - Selecting elements: getElementById, querySelector
     - Updating the display: textContent, innerHTML
     - Event handling: Adding click listeners to buttons
     - Keyboard support: Capturing keydown events
  
  3. **Calculator Logic**:
     - Managing calculator state: Current input, previous input, operation
     - Parsing numeric input: Converting strings to numbers
     - Implementing arithmetic operations: +, -, *, /
     - Handling edge cases: Division by zero, overflow
  
  4. **Advanced Features**:
     - Memory functions: Store and recall values
     - History tracking: Record of calculations
     - Scientific functions: Square root, power, etc.
     - Expression evaluation: Parsing and evaluating expressions
  
  5. **Best Practices**:
     - Clear separation of concerns: UI, event handling, calculations
     - Error handling: Preventing crashes from invalid input
     - Input validation: Ensuring proper numeric format
     - Responsive design: Working on different screen sizes
  
  6. **Implementation Challenges**:
     - Handling decimal points correctly
     - Managing operator precedence
     - Displaying large numbers appropriately
     - Implementing continuous calculations (chaining operations)`,
      code: "GitHub: https://github.com/username/js-calculator",
      conclusion: "This JavaScript calculator demonstrates fundamental programming concepts like variables, functions, event handling, and conditional logic. It provides a practical example of how JavaScript can be used to create interactive web applications that process user input and perform calculations in real-time."
    },
    {
      id: 9,
      title: "Responsive Webpage with Local and Session Storage",
      description: "Develop a JavaScript program to create a responsive webpage that uses local and session storage.",
      aim: "To develop a JavaScript program to create a responsive webpage and use local and session storage for data persistence.",
      facilities: "Web browser, text editor, internet connection",
      scope: "Understanding responsive web design and browser storage APIs.",
      theory: `This project combines responsive design with browser storage APIs:
  
  1. **Web Storage APIs**:
     - **localStorage**:
       - Persistent storage that survives browser restarts
       - Stores data with no expiration date
       - Data is specific to the domain
       - Syntax: \`localStorage.setItem(key, value)\`, \`localStorage.getItem(key)\`
     - **sessionStorage**:
       - Temporary storage that lasts only for the session
       - Data is cleared when the browser/tab is closed
       - Data is specific to the domain and window/tab
       - Syntax: \`sessionStorage.setItem(key, value)\`, \`sessionStorage.getItem(key)\`
     - **Common Methods**:
       - \`setItem(key, value)\`: Store a key/value pair
       - \`getItem(key)\`: Retrieve a value by key
       - \`removeItem(key)\`: Remove a specific item
       - \`clear()\`: Remove all items
       - \`key(index)\`: Get the key at a specific index
  
  2. **Storage Limitations**:
     - Can only store strings (objects must be JSON-stringified)
     - Limited storage capacity (typically 5-10MB)
     - Not suitable for sensitive data (stored plaintext)
     - Synchronous API (can block the main thread)
  
  3. **Responsive Web Design**:
     - Fluid layouts: Using percentages instead of fixed widths
     - Flexible images: max-width property
     - Media queries: Different styles for different screen sizes
     - Mobile-first approach: Design for small screens first
     - CSS Grid and Flexbox for complex layouts
  
  4. **Combining Storage and Responsiveness**:
     - Storing user preferences for different device layouts
     - Remembering form data across sessions
     - Saving application state between visits
     - Managing theme preferences (e.g., dark/light mode)
     - Offline data access using storage APIs
  
  5. **Implementation Considerations**:
     - Checking for storage availability before use
     - Handling storage events for synchronization
     - Fallback mechanisms when storage is unavailable
     - Managing storage limits effectively`,
      code: "GitHub: https://github.com/username/local-session-storage-demo",
      conclusion: "This project demonstrates the use of local and session storage in JavaScript for data persistence. It highlights the differences between the two storage types: local storage persists data even after the browser is closed, while session storage clears data when the browser session ends. The responsive design also showcases modern CSS techniques for creating interfaces that work well across different screen sizes."
    }
  ];