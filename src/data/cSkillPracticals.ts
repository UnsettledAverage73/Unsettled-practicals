
export interface CSkillPractical {
  id: number;
  title: string;
  description: string;
  aim: string;
  facilities: string;
  scope?: string;
  theory?: string;
  code?: string;
  output?: string;
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
    conclusion: "Web development is a multidisciplinary field that combines various technologies to create interactive and functional websites. Understanding the fundamentals of HTML, CSS, and JavaScript provides a solid foundation for building modern web applications."
  },
  {
    id: 2,
    title: "Text Level Tags and List Tags in HTML",
    description: "Learn how to use various text formatting tags and list tags in HTML.",
    aim: "To design a webpage using text level tags and list tags in HTML.",
    facilities: "Web browser, text editor, internet connection",
    scope: "Creating web content with proper structure and formatting.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text and List Tags Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            max-width: 800px;
        }
        h1 {
            color: #4a5568;
            text-align: center;
        }
        h2 {
            color: #2d3748;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
        }
        .text-section {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .list-section {
            background-color: #f0f4f8;
            padding: 15px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>HTML Text Formatting and Lists</h1>
    
    <div class="text-section">
        <h2>Text Level Tags</h2>
        
        <p>This is a <strong>bold text</strong> using the strong tag.</p>
        <p>This is an <em>italicized text</em> using the em tag.</p>
        <p>This is <mark>highlighted text</mark> using the mark tag.</p>
        <p>This is <u>underlined text</u> using the u tag.</p>
        <p>This is <s>strikethrough text</s> using the s tag.</p>
        <p>This is <small>smaller text</small> using the small tag.</p>
        <p>This is <sub>subscript</sub> and <sup>superscript</sup> text.</p>
        
        <h3>Heading Level 3</h3>
        <h4>Heading Level 4</h4>
        <h5>Heading Level 5</h5>
        <h6>Heading Level 6</h6>
        
        <blockquote>
            This is a blockquote. It is often used to quote content from another source.
            <cite>- Source Citation</cite>
        </blockquote>
    </div>
    
    <div class="list-section">
        <h2>List Tags</h2>
        
        <h3>Unordered List</h3>
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript
                <ul>
                    <li>React</li>
                    <li>Angular</li>
                    <li>Vue</li>
                </ul>
            </li>
            <li>PHP</li>
        </ul>
        
        <h3>Ordered List</h3>
        <ol>
            <li>Create HTML structure</li>
            <li>Add CSS styling</li>
            <li>Implement JavaScript functionality</li>
            <li>Test the website</li>
        </ol>
        
        <h3>Definition List</h3>
        <dl>
            <dt>HTML</dt>
            <dd>HyperText Markup Language - the standard markup language for documents designed to be displayed in a web browser.</dd>
            
            <dt>CSS</dt>
            <dd>Cascading Style Sheets - a style sheet language used for describing the presentation of a document written in HTML.</dd>
        </dl>
    </div>
</body>
</html>`,
    conclusion: "Text level tags and list tags are fundamental HTML elements that provide structure and formatting to web content. Proper use of these tags improves readability and organization of information on web pages."
  },
  {
    id: 3,
    title: "Class Timetable Using Table Tag",
    description: "Create a class timetable using HTML table tags.",
    aim: "To create a class timetable using HTML table tags.",
    facilities: "Web browser, text editor, internet connection",
    scope: "Understanding table structure and using HTML tables for data presentation.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class Timetable</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
            color: #2c3e50;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: center;
        }
        th {
            background-color: #3498db;
            color: white;
        }
        .time-col {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .lunch {
            background-color: #f8f9fa;
            font-style: italic;
        }
        .cs101 {
            background-color: #d4efdf;
        }
        .math201 {
            background-color: #ebdef0;
        }
        .phys101 {
            background-color: #fdebd0;
        }
    </style>
</head>
<body>
    <h1>Computer Science Class Timetable</h1>
    <table>
        <caption>Semester 4 - 2025</caption>
        <thead>
            <tr>
                <th>Time</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="time-col">9:00-10:00</td>
                <td class="cs101">Data Structures</td>
                <td class="math201">Discrete Math</td>
                <td class="cs101">Data Structures</td>
                <td class="phys101">Physics</td>
                <td class="math201">Discrete Math</td>
            </tr>
            <tr>
                <td class="time-col">10:00-11:00</td>
                <td class="math201">Discrete Math</td>
                <td class="cs101">Algorithm Design</td>
                <td class="phys101">Physics</td>
                <td class="math201">Discrete Math</td>
                <td class="cs101">Data Structures</td>
            </tr>
            <tr>
                <td class="time-col">11:00-12:00</td>
                <td class="phys101">Physics Lab</td>
                <td class="phys101">Physics Lab</td>
                <td class="cs101">Programming Lab</td>
                <td class="cs101">Programming Lab</td>
                <td class="phys101">Physics</td>
            </tr>
            <tr>
                <td class="time-col">12:00-1:00</td>
                <td colspan="5" class="lunch">Lunch Break</td>
            </tr>
            <tr>
                <td class="time-col">1:00-2:00</td>
                <td class="cs101">Operating Systems</td>
                <td class="math201">Statistics</td>
                <td class="math201">Statistics</td>
                <td class="cs101">Operating Systems</td>
                <td>Free Period</td>
            </tr>
            <tr>
                <td class="time-col">2:00-3:00</td>
                <td class="cs101">Database Systems</td>
                <td class="cs101">Database Systems</td>
                <td>Project Work</td>
                <td>Project Work</td>
                <td class="cs101">Database Systems</td>
            </tr>
        </tbody>
    </table>
</body>
</html>`,
    conclusion: "HTML tables are effective for displaying structured data like timetables. Using CSS with tables enhances readability and visual appeal."
  },
  {
    id: 4,
    title: "Resume Using HTML and CSS",
    description: "Create a professional resume using HTML tags and CSS styling.",
    aim: "To create a resume using HTML tags and CSS, and experiment with colors, text, links, and sizes.",
    facilities: "Web browser, text editor, internet connection",
    scope: "Applying HTML and CSS concepts to create structured and visually appealing documents.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Resume</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            padding: 20px;
        }
        
        .resume-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 5px;
            overflow: hidden;
        }
        
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 36px;
            margin-bottom: 10px;
        }
        
        .header h2 {
            font-size: 20px;
            font-weight: normal;
            color: #ecf0f1;
        }
        
        .contact-info {
            background-color: #34495e;
            color: white;
            padding: 15px;
            text-align: center;
        }
        
        .contact-info a {
            color: #3498db;
            text-decoration: none;
        }
        
        .contact-info a:hover {
            text-decoration: underline;
        }
        
        .section {
            padding: 20px 30px;
            border-bottom: 1px solid #eee;
        }
        
        .section:last-child {
            border-bottom: none;
        }
        
        .section-title {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 15px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
        }
        
        .education-item, .experience-item {
            margin-bottom: 20px;
        }
        
        .item-title {
            font-weight: bold;
            color: #2c3e50;
        }
        
        .item-subtitle {
            font-style: italic;
            color: #7f8c8d;
        }
        
        .item-date {
            color: #7f8c8d;
            font-size: 0.9em;
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .skill-tag {
            background-color: #3498db;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <div class="header">
            <h1>John Doe</h1>
            <h2>Web Developer</h2>
        </div>
        
        <div class="contact-info">
            <p>
                <a href="mailto:john.doe@example.com">john.doe@example.com</a> | 
                <a href="tel:+1234567890">(123) 456-7890</a> | 
                <a href="https://linkedin.com/in/johndoe" target="_blank">LinkedIn</a> | 
                <a href="https://github.com/johndoe" target="_blank">GitHub</a>
            </p>
        </div>
        
        <div class="section">
            <h2 class="section-title">Summary</h2>
            <p>Motivated web developer with 5+ years of experience in designing and developing user interfaces, testing, debugging, and training staff within eCommerce technologies. Proven ability to create efficient, scalable, and maintainable code.</p>
        </div>
        
        <div class="section">
            <h2 class="section-title">Education</h2>
            
            <div class="education-item">
                <div class="item-title">Bachelor of Science in Computer Science</div>
                <div class="item-subtitle">University of Technology</div>
                <div class="item-date">2015 - 2019</div>
                <p>GPA: 3.8/4.0</p>
            </div>
            
            <div class="education-item">
                <div class="item-title">Web Development Bootcamp</div>
                <div class="item-subtitle">CodeCamp Academy</div>
                <div class="item-date">Summer 2019</div>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Experience</h2>
            
            <div class="experience-item">
                <div class="item-title">Senior Web Developer</div>
                <div class="item-subtitle">Tech Solutions Inc.</div>
                <div class="item-date">2021 - Present</div>
                <ul>
                    <li>Develop and maintain client websites using HTML, CSS, JavaScript, and React</li>
                    <li>Lead a team of 4 junior developers and provide technical guidance</li>
                    <li>Improved website load time by 40% through code optimization</li>
                </ul>
            </div>
            
            <div class="experience-item">
                <div class="item-title">Web Developer</div>
                <div class="item-subtitle">Digital Creations Agency</div>
                <div class="item-date">2019 - 2021</div>
                <ul>
                    <li>Created responsive websites for various clients across industries</li>
                    <li>Implemented e-commerce functionality using Shopify and WooCommerce</li>
                    <li>Collaborated with designers to ensure visual consistency</li>
                </ul>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-list">
                <span class="skill-tag">HTML5</span>
                <span class="skill-tag">CSS3</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">React</span>
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Git</span>
                <span class="skill-tag">Responsive Design</span>
                <span class="skill-tag">RESTful APIs</span>
                <span class="skill-tag">SQL</span>
                <span class="skill-tag">MongoDB</span>
                <span class="skill-tag">AWS</span>
            </div>
        </div>
    </div>
</body>
</html>`,
    conclusion: "Creating a resume with HTML and CSS demonstrates the practical application of web technologies for document formatting and styling. This exercise helps understand how to structure content with HTML and style it with CSS for professional presentation."
  },
  {
    id: 5,
    title: "Registration Form with Internal CSS",
    description: "Create a registration form using various HTML form elements and internal CSS.",
    aim: "To create a registration form using textboxes, textareas, checkboxes, radio buttons, select boxes, etc. with internal CSS.",
    facilities: "Web browser, text editor, internet connection",
    scope: "Understanding HTML form elements and styling forms with CSS.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <style>
        /* Internal CSS */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 700px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #2c3e50;
        }
        
        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="tel"],
        input[type="date"],
        textarea,
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus,
        input[type="tel"]:focus,
        input[type="date"]:focus,
        textarea:focus,
        select:focus {
            border-color: #3498db;
            outline: none;
            box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }
        
        textarea {
            resize: vertical;
            min-height: 100px;
        }
        
        .checkbox-group,
        .radio-group {
            margin-bottom: 5px;
        }
        
        .inline-label {
            display: inline;
            font-weight: normal;
            margin-left: 5px;
        }
        
        .btn {
            background-color: #3498db;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: background-color 0.3s;
            display: block;
            width: 100%;
            margin-top: 20px;
        }
        
        .btn:hover {
            background-color: #2980b9;
        }
        
        .btn-reset {
            background-color: #e74c3c;
            margin-top: 10px;
        }
        
        .btn-reset:hover {
            background-color: #c0392b;
        }
        
        .form-row {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .form-col {
            flex: 1;
        }
        
        @media (max-width: 600px) {
            .form-row {
                flex-direction: column;
                gap: 0;
            }
        }
        
        .required::after {
            content: "*";
            color: #e74c3c;
            margin-left: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Registration Form</h1>
        <form action="#" method="post">
            <div class="form-row">
                <div class="form-col">
                    <div class="form-group">
                        <label for="firstName" class="required">First Name</label>
                        <input type="text" id="firstName" name="firstName" required>
                    </div>
                </div>
                <div class="form-col">
                    <div class="form-group">
                        <label for="lastName" class="required">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="email" class="required">Email Address</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="password" class="required">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <div class="form-group">
                <label for="confirmPassword" class="required">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            
            <div class="form-row">
                <div class="form-col">
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                </div>
                <div class="form-col">
                    <div class="form-group">
                        <label for="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="address">Address</label>
                <textarea id="address" name="address"></textarea>
            </div>
            
            <div class="form-row">
                <div class="form-col">
                    <div class="form-group">
                        <label for="country">Country</label>
                        <select id="country" name="country">
                            <option value="">Select Country</option>
                            <option value="us">United States</option>
                            <option value="ca">Canada</option>
                            <option value="uk">United Kingdom</option>
                            <option value="au">Australia</option>
                            <option value="in">India</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="form-col">
                    <div class="form-group">
                        <label for="zipCode">Zip Code</label>
                        <input type="text" id="zipCode" name="zipCode">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label>Gender</label>
                <div class="radio-group">
                    <input type="radio" id="male" name="gender" value="male">
                    <label for="male" class="inline-label">Male</label>
                </div>
                <div class="radio-group">
                    <input type="radio" id="female" name="gender" value="female">
                    <label for="female" class="inline-label">Female</label>
                </div>
                <div class="radio-group">
                    <input type="radio" id="other" name="gender" value="other">
                    <label for="other" class="inline-label">Other</label>
                </div>
            </div>
            
            <div class="form-group">
                <label>Interests</label>
                <div class="checkbox-group">
                    <input type="checkbox" id="technology" name="interests" value="technology">
                    <label for="technology" class="inline-label">Technology</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="sports" name="interests" value="sports">
                    <label for="sports" class="inline-label">Sports</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="music" name="interests" value="music">
                    <label for="music" class="inline-label">Music</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="reading" name="interests" value="reading">
                    <label for="reading" class="inline-label">Reading</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="travel" name="interests" value="travel">
                    <label for="travel" class="inline-label">Travel</label>
                </div>
            </div>
            
            <div class="form-group">
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms" class="inline-label required">I agree to the terms and conditions</label>
            </div>
            
            <button type="submit" class="btn">Register</button>
            <button type="reset" class="btn btn-reset">Reset Form</button>
        </form>
    </div>
</body>
</html>`,
    conclusion: "Creating registration forms with HTML and CSS demonstrates the practical application of form elements and styling. This exercise helps understand form validation, user input collection, and creating user-friendly interfaces."
  },
  {
    id: 6,
    title: "College Website with Internal CSS",
    description: "Design a web page for a college with descriptions of courses, departments, faculties, and library.",
    aim: "To design a web page for a college containing descriptions of courses, departments, faculties, library, etc. using internal CSS.",
    facilities: "Web browser, text editor, internet connection",
    scope: "Creating a multi-section webpage with consistent styling and navigation.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Technica College of Engineering</title>
    <style>
        /* Internal CSS */
        :root {
            --primary-color: #3498db;
            --secondary-color: #2c3e50;
            --accent-color: #e74c3c;
            --light-color: #ecf0f1;
            --dark-color: #34495e;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
        }
        
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header */
        header {
            background-color: var(--primary-color);
            color: white;
            padding: 1rem 0;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: bold;
        }
        
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .nav-menu {
            list-style: none;
            display: flex;
        }
        
        .nav-menu li {
            margin-left: 20px;
        }
        
        .nav-menu a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-menu a:hover {
            color: var(--light-color);
        }
        
        /* Hero Section */
        .hero {
            background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://source.unsplash.com/random/1200x600/?university');
            background-size: cover;
            background-position: center;
            height: 500px;
            display: flex;
            align-items: center;
            text-align: center;
            color: white;
        }
        
        .hero-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
        
        .btn {
            display: inline-block;
            background-color: var(--primary-color);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        
        .btn:hover {
            background-color: #2980b9;
        }
        
        /* Sections */
        section {
            padding: 4rem 0;
        }
        
        .section-title {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 2.5rem;
            color: var(--secondary-color);
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background-color: var(--primary-color);
        }
        
        /* About */
        .about {
            background-color: white;
        }
        
        /* Courses */
        .courses {
            background-color: var(--light-color);
        }
        
        .courses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .course-card {
            background-color: white;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .course-card:hover {
            transform: translateY(-10px);
        }
        
        .course-content {
            padding: 20px;
        }
        
        .course-card h3 {
            color: var(--secondary-color);
            margin-bottom: 10px;
        }
        
        /* Departments */
        .departments {
            background-color: white;
        }
        
        .dept-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .dept-box {
            flex: 1;
            min-width: 250px;
            padding: 20px;
            background-color: var(--light-color);
            border-radius: 5px;
            margin-bottom: 20px;
        }
        
        .dept-box h3 {
            color: var(--secondary-color);
            margin-bottom: 10px;
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 5px;
        }
        
        /* Faculty */
        .faculty {
            background-color: var(--light-color);
        }
        
        .faculty-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        
        .faculty-card {
            background-color: white;
            text-align: center;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        
        .faculty-img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 15px;
            object-fit: cover;
            border: 4px solid var(--primary-color);
        }
        
        /* Library */
        .library {
            background-color: white;
        }
        
        .features-list {
            list-style: none;
            margin: 20px 0;
        }
        
        .features-list li {
            margin-bottom: 10px;
            padding-left: 30px;
            position: relative;
        }
        
        .features-list li::before {
            content: '✓';
            color: var(--primary-color);
            position: absolute;
            left: 0;
        }
        
        /* Footer */
        footer {
            background-color: var(--secondary-color);
            color: white;
            padding: 2rem 0;
            text-align: center;
        }
        
        .footer-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .footer-col {
            flex: 1;
            min-width: 200px;
            margin-bottom: 20px;
        }
        
        .footer-col h3 {
            margin-bottom: 15px;
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 5px;
            display: inline-block;
        }
        
        .footer-col ul {
            list-style: none;
        }
        
        .footer-col li {
            margin-bottom: 8px;
        }
        
        .footer-col a {
            color: var(--light-color);
            text-decoration: none;
        }
        
        .footer-col a:hover {
            color: var(--primary-color);
        }
        
        .copyright {
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 20px;
            font-size: 0.9rem;
        }
        
        /* Media Queries */
        @media screen and (max-width: 768px) {
            .navbar {
                flex-direction: column;
            }
            
            .nav-menu {
                margin-top: 15px;
            }
            
            .nav-menu li {
                margin: 0 10px;
            }
            
            .hero {
                height: 400px;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo">Technica College</div>
                <ul class="nav-menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#courses">Courses</a></li>
                    <li><a href="#departments">Departments</a></li>
                    <li><a href="#faculty">Faculty</a></li>
                    <li><a href="#library">Library</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-content">
            <h1>Welcome to Technica College of Engineering</h1>
            <p>Excellence in education and innovation since 1985</p>
            <a href="#courses" class="btn">Explore Programs</a>
        </div>
    </section>
    
    <!-- About Section -->
    <section class="about" id="about">
        <div class="container">
            <h2 class="section-title">About Us</h2>
            <p>Technica College of Engineering is a premier educational institution dedicated to academic excellence and innovation in engineering and technology. Established in 1985, we have consistently maintained high standards of education, research, and professional training.</p>
            <p>Our mission is to develop skilled professionals who contribute meaningfully to technological advancement and societal development. With state-of-the-art facilities, experienced faculty, and industry partnerships, we provide a conducive environment for learning and growth.</p>
        </div>
    </section>
    
    <!-- Courses Section -->
    <section class="courses" id="courses">
        <div class="container">
            <h2 class="section-title">Our Programs</h2>
            <div class="courses-grid">
                <div class="course-card">
                    <div class="course-content">
                        <h3>Computer Science Engineering</h3>
                        <p>A 4-year undergraduate program covering algorithms, programming, data structures, software engineering, and computer architecture.</p>
                        <p><strong>Duration:</strong> 4 years</p>
                        <p><strong>Degree:</strong> B.Tech</p>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-content">
                        <h3>Electrical Engineering</h3>
                        <p>Study of electrical systems, power generation, transmission, motors, and electrical devices with hands-on laboratory experience.</p>
                        <p><strong>Duration:</strong> 4 years</p>
                        <p><strong>Degree:</strong> B.Tech</p>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-content">
                        <h3>Mechanical Engineering</h3>
                        <p>Focuses on design, analysis, and manufacturing of mechanical systems, thermodynamics, fluid mechanics, and material science.</p>
                        <p><strong>Duration:</strong> 4 years</p>
                        <p><strong>Degree:</strong> B.Tech</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Departments Section -->
    <section class="departments" id="departments">
        <div class="container">
            <h2 class="section-title">Departments</h2>
            <div class="dept-container">
                <div class="dept-box">
                    <h3>Computer Science</h3>
                    <p>Our Computer Science department offers cutting-edge education in artificial intelligence, data science, cybersecurity, and software development. The department has 15 faculty members and state-of-the-art computing laboratories.</p>
                </div>
                <div class="dept-box">
                    <h3>Electrical Engineering</h3>
                    <p>The Electrical Engineering department specializes in power systems, control systems, and electronics. It features advanced laboratories for circuit design, power electronics, and embedded systems.</p>
                </div>
                <div class="dept-box">
                    <h3>Mechanical Engineering</h3>
                    <p>Our Mechanical Engineering department focuses on thermal engineering, design, and manufacturing processes. It houses workshops for fabrication, material testing, and fluid mechanics experiments.</p>
                </div>
                <div class="dept-box">
                    <h3>Civil Engineering</h3>
                    <p>The Civil Engineering department offers expertise in structural engineering, transportation, environmental engineering, and geotechnical engineering with specialized laboratories for material testing.</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Faculty Section -->
    <section class="faculty" id="faculty">
        <div class="container">
            <h2 class="section-title">Our Faculty</h2>
            <div class="faculty-grid">
                <div class="faculty-card">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Professor" class="faculty-img">
                    <h3>Dr. Robert Smith</h3>
                    <p>Professor, Computer Science</p>
                    <p>Ph.D. in Artificial Intelligence</p>
                </div>
                <div class="faculty-card">
                    <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Professor" class="faculty-img">
                    <h3>Dr. Emily Johnson</h3>
                    <p>Professor, Electrical Engineering</p>
                    <p>Ph.D. in Power Systems</p>
                </div>
                <div class="faculty-card">
                    <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Professor" class="faculty-img">
                    <h3>Dr. Michael Chen</h3>
                    <p>Associate Professor, Mechanical Engineering</p>
                    <p>Ph.D. in Thermodynamics</p>
                </div>
                <div class="faculty-card">
                    <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Professor" class="faculty-img">
                    <h3>Dr. Sarah Williams</h3>
                    <p>Assistant Professor, Civil Engineering</p>
                    <p>Ph.D. in Structural Engineering</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Library Section -->
    <section class="library" id="library">
        <div class="container">
            <h2 class="section-title">Our Library</h2>
            <p>The Technica College Library is a hub of knowledge and resources designed to support academic excellence and research activities. Spanning over 10,000 square feet, our library provides a conducive environment for study and intellectual growth.</p>
            <ul class="features-list">
                <li>Over 50,000 books covering all engineering disciplines</li>
                <li>Subscription to more than 100 international journals</li>
                <li>Digital repository with e-books and research papers</li>
                <li>Quiet study areas and collaborative spaces</li>
                <li>24/7 online access to digital resources</li>
                <li>Inter-library loan services</li>
                <li>Trained library staff for research assistance</li>
            </ul>
            <p>Our library also hosts regular workshops on research methodologies, citation practices, and digital resource utilization to enhance the research capabilities of students and faculty.</p>
        </div>
    </section>
    
    <!-- Footer -->
    <footer id="contact">
        <div class="container">
            <div class="footer-content">
                <div class="footer-col">
                    <h3>Contact Us</h3>
                    <p>123 College Road</p>
                    <p>Technica City, TC 12345</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Email: info@technica.edu</p>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#courses">Courses</a></li>
                        <li><a href="#faculty">Faculty</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="#">Student Portal</a></li>
                        <li><a href="#">Faculty Portal</a></li>
                        <li><a href="#">E-Learning</a></li>
                        <li><a href="#">Career Services</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Connect With Us</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2025 Technica College of Engineering. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`,
    conclusion: "This project demonstrates how to create a comprehensive college website with multiple sections using HTML and internal CSS. It showcases layout organization, navigation design, and responsive elements that adapt to different screen sizes."
  },
  {
    id: 7,
    title: "JavaScript Program to Display Today's Date",
    description: "Create a JavaScript program that displays the current date in various formats.",
    aim: "To develop a JavaScript program to display today's date in different formats.",
    facilities: "Web browser, text editor, internet connection",
    scope: "Understanding JavaScript Date object and date formatting.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Date Display</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f7f9fc;
        }
        
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        
        .date-container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        
        .date-display {
            font-size: 1.2em;
            margin-bottom: 15px;
            padding: 10px;
            border-left: 4px solid #3498db;
            background-color: #ecf0f1;
        }
        
        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #2980b9;
        }
        
        .btn-container {
            text-align: center;
            margin-top: 20px;
        }
        
        .explanation {
            margin-top: 30px;
            background-color: #edf7ff;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }
        
        .code-display {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            margin: 15px 0;
        }
        
        pre {
            margin: 0;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <h1>JavaScript Date Display</h1>
    
    <div class="date-container">
        <div class="date-display" id="current-date">Loading...</div>
        <div class="date-display" id="formatted-date">Loading...</div>
        <div class="date-display" id="date-components">Loading...</div>
        <div class="date-display" id="time">Loading...</div>
        <div class="date-display" id="custom-format">Loading...</div>
        <div class="btn-container">
            <button id="refresh-btn">Refresh Date & Time</button>
        </div>
    </div>
    
    <div class="explanation">
        <h2>How it Works</h2>
        <p>This program uses JavaScript's Date object to get and display the current date and time in various formats:</p>
        <div class="code-display">
            <pre>
// Creating a new Date object
const currentDate = new Date();

// Getting various date components
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Note: months are zero-indexed (0-11)
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
            </pre>
        </div>
        <p>We can then format the date in different ways using these components, or use built-in methods like <code>toLocaleString()</code> for locale-specific formatting.</p>
    </div>
    
    <script>
        // Function to update all date displays
        function updateDateDisplays() {
            // Create a new Date object (current date and time)
            const currentDate = new Date();
            
            // Display the default date format
            document.getElementById('current-date').textContent = `Default Date Format: ${currentDate.toString()}`;
            
            // Display formatted date using locale
            document.getElementById('formatted-date').textContent = `Locale Date Format: ${currentDate.toLocaleString()}`;
            
            // Display individual date components
            document.getElementById('date-components').textContent = `Date Components: 
                Year: ${currentDate.getFullYear()}, 
                Month: ${currentDate.getMonth() + 1}, 
                Day: ${currentDate.getDate()}, 
                Day of week: ${getDayName(currentDate.getDay())}`;
            
            // Display current time
            document.getElementById('time').textContent = `Current Time: 
                ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;
            
            // Display custom formatted date
            const customFormat = formatDate(currentDate);
            document.getElementById('custom-format').textContent = `Custom Format: ${customFormat}`;
        }
        
        // Helper function to pad single digits with leading zero
        function padZero(num) {
            return num < 10 ? '0' + num : num;
        }
        
        // Helper function to get day name
        function getDayName(dayIndex) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[dayIndex];
        }
        
        // Custom date formatter
        function formatDate(date) {
            const day = padZero(date.getDate());
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                               'July', 'August', 'September', 'October', 'November', 'December'];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            const hours = padZero(date.getHours());
            const minutes = padZero(date.getMinutes());
            
            return `${getDayName(date.getDay())}, ${month} ${day}, ${year} at ${hours}:${minutes}`;
        }
        
        // Initial call to display dates
        updateDateDisplays();
        
        // Add event listener to refresh button
        document.getElementById('refresh-btn').addEventListener('click', updateDateDisplays);
    </script>
</body>
</html>`,
    conclusion: "This JavaScript program demonstrates how to use the Date object to obtain and display the current date and time in various formats. It shows different methods for formatting dates and times, which is essential for many web applications that need to present temporal data."
  },
  {
    id: 8,
    title: "JavaScript Simple Calculator",
    description: "Create a simple calculator using JavaScript to perform basic operations.",
    aim: "To develop a JavaScript program to design a simple calculator that performs addition, subtraction, multiplication, and division operations.",
    facilities: "Web browser, text editor, internet connection",
    scope: "Understanding JavaScript event handling, DOM manipulation, and arithmetic operations.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Calculator</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        
        .calculator {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            width: 320px;
            overflow: hidden;
        }
        
        .calc-header {
            background-color: #2c3e50;
            color: white;
            padding: 15px;
            text-align: center;
        }
        
        .calc-display {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: right;
            font-size: 2rem;
            font-weight: 300;
            border-bottom: 1px solid #dee2e6;
            min-height: 60px;
            word-break: break-all;
        }
        
        .calc-history {
            font-size: 1rem;
            color: #6c757d;
            height: 24px;
            overflow: hidden;
            margin-bottom: 8px;
        }
        
        .calc-current {
            color: #212529;
        }
        
        .calc-buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1px;
            background-color: #dee2e6;
        }
        
        .calc-button {
            border: none;
            background-color: white;
            font-size: 1.25rem;
            padding: 20px;
            cursor: pointer;
            transition: background-color 0.2s;
            outline: none;
        }
        
        .calc-button:hover {
            background-color: #f1f3f5;
        }
        
        .calc-button:active {
            background-color: #e9ecef;
        }
        
        .operator {
            background-color: #f8f9fa;
            color: #2c3e50;
        }
        
        .equals {
            background-color: #3498db;
            color: white;
        }
        
        .equals:hover {
            background-color: #2980b9;
        }
        
        .clear, .backspace {
            background-color: #e74c3c;
            color: white;
        }
        
        .clear:hover, .backspace:hover {
            background-color: #c0392b;
        }
        
        .explanation {
            margin-top: 30px;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 600px;
        }
        
        .explanation h2 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-top: 0;
        }
        
        @media (max-width: 480px) {
            .calculator {
                width: 280px;
            }
            
            .calc-button {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="calculator">
        <div class="calc-header">
            <h2>Simple Calculator</h2>
        </div>
        <div class="calc-display">
            <div class="calc-history" id="history"></div>
            <div class="calc-current" id="display">0</div>
        </div>
        <div class="calc-buttons">
            <button class="calc-button clear" onclick="clearCalculator()">C</button>
            <button class="calc-button backspace" onclick="backspace()">⌫</button>
            <button class="calc-button operator" onclick="appendOperator('%')">%</button>
            <button class="calc-button operator" onclick="appendOperator('/')">÷</button>
            
            <button class="calc-button" onclick="appendNumber('7')">7</button>
            <button class="calc-button" onclick="appendNumber('8')">8</button>
            <button class="calc-button" onclick="appendNumber('9')">9</button>
            <button class="calc-button operator" onclick="appendOperator('*')">×</button>
            
            <button class="calc-button" onclick="appendNumber('4')">4</button>
            <button class="calc-button" onclick="appendNumber('5')">5</button>
            <button class="calc-button" onclick="appendNumber('6')">6</button>
            <button class="calc-button operator" onclick="appendOperator('-')">−</button>
            
            <button class="calc-button" onclick="appendNumber('1')">1</button>
            <button class="calc-button" onclick="appendNumber('2')">2</button>
            <button class="calc-button" onclick="appendNumber('3')">3</button>
            <button class="calc-button operator" onclick="appendOperator('+')">+</button>
            
            <button class="calc-button" onclick="appendNumber('0')">0</button>
            <button class="calc-button" onclick="appendDecimal()">.</button>
            <button class="calc-button operator" onclick="toggleNegative()">±</button>
            <button class="calc-button equals" onclick="calculate()">=</button>
        </div>
    </div>

    <script>
        // Calculator state
        let currentInput = '0';
        let previousInput = '';
        let operation = null;
        let shouldResetScreen = false;
        
        // DOM elements
        const display = document.getElementById('display');
        const history = document.getElementById('history');
        
        // Function to update the display
        function updateDisplay() {
            display.textContent = currentInput;
            
            if (operation != null) {
                history.textContent = previousInput + ' ' + getOperationSymbol(operation);
            } else {
                history.textContent = '';
            }
        }
        
        // Function to get the symbol for the operation
        function getOperationSymbol(op) {
            switch(op) {
                case '+': return '+';
                case '-': return '−';
                case '*': return '×';
                case '/': return '÷';
                case '%': return '%';
                default: return '';
            }
        }
        
        // Function to append a number to the display
        function appendNumber(number) {
            if (currentInput === '0' || shouldResetScreen) {
                currentInput = number;
                shouldResetScreen = false;
            } else {
                currentInput += number;
            }
            updateDisplay();
        }
        
        // Function to append a decimal point
        function appendDecimal() {
            if (shouldResetScreen) {
                currentInput = '0';
                shouldResetScreen = false;
            }
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            updateDisplay();
        }
        
        // Function to toggle between positive and negative
        function toggleNegative() {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();
        }
        
        // Function to handle operations
        function appendOperator(op) {
            if (operation !== null) {
                calculate();
            }
            previousInput = currentInput;
            operation = op;
            shouldResetScreen = true;
            updateDisplay();
        }
        
        // Function to calculate the result
        function calculate() {
            if (operation === null) return;
            
            let computation;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        alert("Cannot divide by zero!");
                        clearCalculator();
                        return;
                    }
                    computation = prev / current;
                    break;
                case '%':
                    computation = prev % current;
                    break;
                default:
                    return;
            }
            
            // Format the result to avoid extremely long decimals
            if (computation.toString().includes('.')) {
                const decimalPlaces = Math.min(10, (computation.toString().split('.')[1] || '').length);
                computation = computation.toFixed(decimalPlaces);
                // Remove trailing zeros after decimal
                computation = parseFloat(computation);
            }
            
            currentInput = computation.toString();
            operation = null;
            previousInput = '';
            updateDisplay();
        }
        
        // Function to clear the calculator
        function clearCalculator() {
            currentInput = '0';
            previousInput = '';
            operation = null;
            shouldResetScreen = false;
            updateDisplay();
        }
        
        // Function to remove the last digit (backspace)
        function backspace() {
            if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
                currentInput = '0';
            } else {
                currentInput = currentInput.slice(0, -1);
            }
            updateDisplay();
        }
        
        // Initialize the calculator
        updateDisplay();
        
        // Add keyboard support
        document.addEventListener('keydown', function(event) {
            if (event.key >= '0' && event.key <= '9') {
                appendNumber(event.key);
            } else if (event.key === '.') {
                appendDecimal();
            } else if (event.key === '=' || event.key === 'Enter') {
                calculate();
            } else if (event.key === 'Escape') {
                clearCalculator();
            } else if (event.key === 'Backspace') {
                backspace();
            } else if (['+', '-', '*', '/', '%'].includes(event.key)) {
                appendOperator(event.key);
            }
        });
    </script>
</body>
</html>`,
    conclusion: "This JavaScript calculator demonstrates fundamental programming concepts like variables, functions, event handling, and conditional logic. It provides a practical example of how JavaScript can be used to create interactive web applications that process user input and perform calculations in real-time."
  },
  {
    id: 9,
    title: "Responsive Webpage with Local and Session Storage",
    description: "Develop a JavaScript program to create a responsive webpage that uses local and session storage.",
    aim: "To develop a JavaScript program to create a responsive webpage and use local and session storage for data persistence.",
    facilities: "Web browser, text editor, internet connection",
    scope: "Understanding responsive web design and browser storage APIs.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager with Storage</title>
    <style>
        :root {
            --primary-color: #3498db;
            --secondary-color: #2c3e50;
            --accent-color: #e74c3c;
            --light-color: #ecf0f1;
            --success-color: #2ecc71;
            --warning-color: #f39c12;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f7fa;
        }
        
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            background-color: var(--secondary-color);
            color: white;
            padding: 1rem;
            text-align: center;
        }
        
        h1 {
            margin-bottom: 0.5rem;
        }
        
        .theme-switcher {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            align-items: center;
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 30px;
            margin-left: 10px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 30px;
        }
        
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .toggle-slider {
            background-color: var(--primary-color);
        }
        
        input:checked + .toggle-slider:before {
            transform: translateX(30px);
        }
        
        .content-wrapper {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        
        .column {
            flex: 1;
            min-width: 300px;
            margin: 10px;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px;
        }
        
        .task-form {
            margin-bottom: 20px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: var(--secondary-color);
        }
        
        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        
        .form-control:focus {
            border-color: var(--primary-color);
            outline: none;
            box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }
        
        select.form-control {
            height: 42px;
        }
        
        .btn {
            display: inline-block;
            padding: 10px 15px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
            text-align: center;
            text-decoration: none;
        }
        
        .btn:hover {
            background-color: #2980b9;
        }
        
        .btn-block {
            display: block;
            width: 100%;
        }
        
        .btn-danger {
            background-color: var(--accent-color);
        }
        
        .btn-danger:hover {
            background-color: #c0392b;
        }
        
        .btn-warning {
            background-color: var(--warning-color);
        }
        
        .btn-warning:hover {
            background-color: #e67e22;
        }
        
        .btn-success {
            background-color: var(--success-color);
        }
        
        .btn-success:hover {
            background-color: #27ae60;
        }
        
        .task-list {
            list-style: none;
        }
        
        .task-item {
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 10px;
            background-color: var(--light-color);
            position: relative;
            transition: transform 0.2s;
        }
        
        .task-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .task-title {
            font-weight: bold;
            font-size: 18px;
            color: var(--secondary-color);
            margin-bottom: 5px;
        }
        
        .task-details {
            margin-bottom: 10px;
            color: #555;
        }
        
        .task-priority {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            margin-top: 5px;
            color: white;
        }
        
        .priority-high {
            background-color: var(--accent-color);
        }
        
        .priority-medium {
            background-color: var(--warning-color);
        }
        
        .priority-low {
            background-color: var(--success-color);
        }
        
        .task-actions {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        
        .task-actions button {
            padding: 5px 10px;
            font-size: 14px;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background-color: var(--success-color);
            color: white;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: opacity 0.5s;
            opacity: 0;
            z-index: 1000;
        }
        
        .notification.show {
            opacity: 1;
        }
        
        .storage-section {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
        
        .storage-info {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            margin-top: 10px;
            font-size: 14px;
        }
        
        .tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
        
        .tab {
            padding: 10px 20px;
            cursor: pointer;
            border: 1px solid transparent;
            border-bottom: none;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            margin-right: 5px;
            background-color: #f1f1f1;
        }
        
        .tab.active {
            background-color: var(--primary-color);
            color: white;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        /* Dark theme */
        .dark-theme {
            background-color: #1a1a2e;
            color: #f1f1f1;
        }
        
        .dark-theme .column {
            background-color: #16213e;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .dark-theme header {
            background-color: #0f3460;
        }
        
        .dark-theme .task-item {
            background-color: #1a1a2e;
            border-color: #0f3460;
            color: #f1f1f1;
        }
        
        .dark-theme .task-title {
            color: #e94560;
        }
        
        .dark-theme .task-details {
            color: #c0c0c0;
        }
        
        .dark-theme .form-control {
            background-color: #16213e;
            color: #f1f1f1;
            border-color: #0f3460;
        }
        
        .dark-theme .storage-info {
            background-color: #16213e;
            color: #c0c0c0;
        }
        
        .dark-theme .tab {
            background-color: #0f3460;
            color: #f1f1f1;
        }
        
        .dark-theme .tab.active {
            background-color: #e94560;
        }
        
        @media (max-width: 768px) {
            .content-wrapper {
                flex-direction: column;
            }
            
            .column {
                min-width: 100%;
                margin: 10px 0;
            }
            
            .theme-switcher {
                position: relative;
                top: auto;
                right: auto;
                margin-top: 10px;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>Task Manager</h1>
        <p>Manage your tasks with local & session storage</p>
        <div class="theme-switcher">
            <span>Dark Mode</span>
            <label class="toggle-switch">
                <input type="checkbox" id="theme-toggle">
                <span class="toggle-slider"></span>
            </label>
        </div>
    </header>
    
    <div class="container">
        <div class="content-wrapper">
            <div class="column">
                <h2>Add New Task</h2>
                <div class="task-form">
                    <div class="form-group">
                        <label for="task-title">Task Title</label>
                        <input type="text" id="task-title" class="form-control" placeholder="Enter task title">
                    </div>
                    <div class="form-group">
                        <label for="task-details">Task Details</label>
                        <textarea id="task-details" class="form-control" placeholder="Enter task details" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="task-priority">Priority</label>
                        <select id="task-priority" class="form-control">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="storage-type">Storage Type</label>
                        <select id="storage-type" class="form-control">
                            <option value="local">Local Storage (Persistent)</option>
                            <option value="session">Session Storage (Temporary)</option>
                        </select>
                    </div>
                    <button id="add-task" class="btn btn-block">Add Task</button>
                </div>
                
                <div class="storage-section">
                    <h3>Storage Information</h3>
                    <div class="storage-info">
                        <p><strong>Local Storage:</strong> Persists even after browser is closed</p>
                        <p><strong>Session Storage:</strong> Cleared when the browser session ends</p>
                        <p><strong>Local Tasks:</strong> <span id="local-count">0</span></p>
                        <p><strong>Session Tasks:</strong> <span id="session-count">0</span></p>
                    </div>
                    <div style="margin-top: 15px;">
                        <button id="clear-local" class="btn btn-danger">Clear Local Storage</button>
                        <button id="clear-session" class="btn btn-danger" style="margin-left: 10px;">Clear Session Storage</button>
                    </div>
                </div>
            </div>
            
            <div class="column">
                <h2>Your Tasks</h2>
                <div class="tabs">
                    <div class="tab active" data-tab="all">All Tasks</div>
                    <div class="tab" data-tab="local">Local Storage</div>
                    <div class="tab" data-tab="session">Session Storage</div>
                </div>
                
                <div id="all-tasks" class="tab-content active">
                    <ul class="task-list" id="all-tasks-list">
                        <!-- Tasks will be inserted here -->
                    </ul>
                    <div id="all-empty-message">No tasks found.</div>
                </div>
                
                <div id="local-tasks" class="tab-content">
                    <ul class="task-list" id="local-tasks-list">
                        <!-- Local storage tasks will be inserted here -->
                    </ul>
                    <div id="local-empty-message">No local storage tasks found.</div>
                </div>
                
                <div id="session-tasks" class="tab-content">
                    <ul class="task-list" id="session-tasks-list">
                        <!-- Session storage tasks will be inserted here -->
                    </ul>
                    <div id="session-empty-message">No session storage tasks found.</div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="notification" id="notification"></div>
    
    <script>
        // DOM Elements
        const taskTitleInput = document.getElementById('task-title');
        const taskDetailsInput = document.getElementById('task-details');
        const taskPrioritySelect = document.getElementById('task-priority');
        const storageTypeSelect = document.getElementById('storage-type');
        const addTaskButton = document.getElementById('add-task');
        const allTasksList = document.getElementById('all-tasks-list');
        const localTasksList = document.getElementById('local-tasks-list');
        const sessionTasksList = document.getElementById('session-tasks-list');
        const allEmptyMessage = document.getElementById('all-empty-message');
        const localEmptyMessage = document.getElementById('local-empty-message');
        const sessionEmptyMessage = document.getElementById('session-empty-message');
        const localCountSpan = document.getElementById('local-count');
        const sessionCountSpan = document.getElementById('session-count');
        const clearLocalButton = document.getElementById('clear-local');
        const clearSessionButton = document.getElementById('clear-session');
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        const themeToggle = document.getElementById('theme-toggle');
        const notification = document.getElementById('notification');

        // Load tasks from storage on page load
        document.addEventListener('DOMContentLoaded', () => {
            loadLocalTasks();
            loadSessionTasks();
            updateAllTasks();
            loadThemePreference();
        });

        // Event Listeners
        addTaskButton.addEventListener('click', addTask);
        clearLocalButton.addEventListener('click', clearLocalStorage);
        clearSessionButton.addEventListener('click', clearSessionStorage);
        themeToggle.addEventListener('click', toggleTheme);

        // Tab navigation
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabId = tab.getAttribute('data-tab');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                document.getElementById(`${tabId}-tasks`).classList.add('active');
            });
        });

        // Functions
        function addTask() {
            const title = taskTitleInput.value.trim();
            const details = taskDetailsInput.value.trim();
            const priority = taskPrioritySelect.value;
            const storageType = storageTypeSelect.value;
            
            if (title === '') {
                showNotification('Please enter a task title', 'error');
                return;
            }
            
            const task = {
                id: Date.now().toString(),
                title,
                details,
                priority,
                date: new Date().toISOString(),
                completed: false
            };
            
            if (storageType === 'local') {
                saveToLocalStorage(task);
                showNotification('Task saved to Local Storage');
            } else {
                saveToSessionStorage(task);
                showNotification('Task saved to Session Storage');
            }
            
            taskTitleInput.value = '';
            taskDetailsInput.value = '';
            taskPrioritySelect.value = 'low';
        }
        
        function saveToLocalStorage(task) {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadLocalTasks();
            updateAllTasks();
        }
        
        function saveToSessionStorage(task) {
            let tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
            tasks.push(task);
            sessionStorage.setItem('tasks', JSON.stringify(tasks));
            loadSessionTasks();
            updateAllTasks();
        }
        
        function loadLocalTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            localCountSpan.textContent = tasks.length;
            
            if (tasks.length === 0) {
                localTasksList.innerHTML = '';
                localEmptyMessage.style.display = 'block';
            } else {
                localEmptyMessage.style.display = 'none';
                renderTaskList(tasks, localTasksList, 'local');
            }
        }
        
        function loadSessionTasks() {
            const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
            sessionCountSpan.textContent = tasks.length;
            
            if (tasks.length === 0) {
                sessionTasksList.innerHTML = '';
                sessionEmptyMessage.style.display = 'block';
            } else {
                sessionEmptyMessage.style.display = 'none';
                renderTaskList(tasks, sessionTasksList, 'session');
            }
        }
        
        function updateAllTasks() {
            const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const sessionTasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
            const allTasks = [...localTasks, ...sessionTasks];
            
            if (allTasks.length === 0) {
                allTasksList.innerHTML = '';
                allEmptyMessage.style.display = 'block';
            } else {
                allEmptyMessage.style.display = 'none';
                renderTaskList(allTasks, allTasksList, 'all');
            }
        }
        
        function renderTaskList(tasks, listElement, storageType) {
            listElement.innerHTML = '';
            
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                li.dataset.id = task.id;
                li.dataset.storage = storageType === 'all' ? 
                    (JSON.parse(localStorage.getItem('tasks')) || []).find(t => t.id === task.id) ? 'local' : 'session' :
                    storageType;
                
                const dateObj = new Date(task.date);
                const formattedDate = `${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString()}`;
                
                li.innerHTML = `
                    <div class="task-title">${task.title}</div>
                    <div class="task-details">${task.details || 'No details provided'}</div>
                    <div>
                        <span class="task-priority priority-${task.priority}">${task.priority.toUpperCase()}</span>
                        <span style="font-size: 12px; color: #777; margin-left: 10px;">Created: ${formattedDate}</span>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-success toggle-complete">${task.completed ? 'Reopen' : 'Complete'}</button>
                        <button class="btn btn-danger delete-task">Delete</button>
                    </div>
                `;
                
                if (task.completed) {
                    li.style.opacity = '0.7';
                    li.style.textDecoration = 'line-through';
                }
                
                listElement.appendChild(li);
                
                // Add event listeners to buttons
                li.querySelector('.toggle-complete').addEventListener('click', () => toggleTaskComplete(task.id, li.dataset.storage));
                li.querySelector('.delete-task').addEventListener('click', () => deleteTask(task.id, li.dataset.storage));
            });
        }
        
        function toggleTaskComplete(taskId, storageType) {
            if (storageType === 'local') {
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const taskIndex = tasks.findIndex(task => task.id === taskId);
                
                if (taskIndex !== -1) {
                    tasks[taskIndex].completed = !tasks[taskIndex].completed;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    loadLocalTasks();
                    showNotification(`Task marked as ${tasks[taskIndex].completed ? 'completed' : 'reopened'}`);
                }
            } else if (storageType === 'session') {
                let tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
                const taskIndex = tasks.findIndex(task => task.id === taskId);
                
                if (taskIndex !== -1) {
                    tasks[taskIndex].completed = !tasks[taskIndex].completed;
                    sessionStorage.setItem('tasks', JSON.stringify(tasks));
                    loadSessionTasks();
                    showNotification(`Task marked as ${tasks[taskIndex].completed ? 'completed' : 'reopened'}`);
                }
            }
            
            updateAllTasks();
        }
        
        function deleteTask(taskId, storageType) {
            if (storageType === 'local') {
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks = tasks.filter(task => task.id !== taskId);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                loadLocalTasks();
                showNotification('Task deleted from Local Storage');
            } else if (storageType === 'session') {
                let tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
                tasks = tasks.filter(task => task.id !== taskId);
                sessionStorage.setItem('tasks', JSON.stringify(tasks));
                loadSessionTasks();
                showNotification('Task deleted from Session Storage');
            }
            
            updateAllTasks();
        }
        
        function clearLocalStorage() {
            if (confirm('Are you sure you want to clear all tasks from Local Storage?')) {
                localStorage.removeItem('tasks');
                loadLocalTasks();
                updateAllTasks();
                showNotification('All Local Storage tasks cleared');
            }
        }
        
        function clearSessionStorage() {
            if (confirm('Are you sure you want to clear all tasks from Session Storage?')) {
                sessionStorage.removeItem('tasks');
                loadSessionTasks();
                updateAllTasks();
                showNotification('All Session Storage tasks cleared');
            }
        }
        
        function showNotification(message, type = 'success') {
            notification.textContent = message;
            notification.style.backgroundColor = type === 'success' ? 'var(--success-color)' : 'var(--accent-color)';
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
        
        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference to local storage
            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDarkTheme);
        }
        
        function loadThemePreference() {
            const darkTheme = localStorage.getItem('darkTheme') === 'true';
            if (darkTheme) {
                document.body.classList.add('dark-theme');
                themeToggle.checked = true;
            }
        }
    </script>
</body>
</html>`,
    conclusion: "This project demonstrates the use of local and session storage in JavaScript for data persistence. It highlights the differences between the two storage types: local storage persists data even after the browser is closed, while session storage clears data when the browser session ends. The responsive design also showcases modern CSS techniques for creating interfaces that work well across different screen sizes."
  }
];

